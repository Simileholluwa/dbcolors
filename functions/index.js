const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { toDate } = require("date-fns-tz");
const {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  addMinutes,
  format,
} = require("date-fns");

// Import modular libraries
const {
  admin,
  calendar,
  TIMEZONE,
  WORKING_HOURS,
  CALENDAR_ID
} = require("./lib/config");

const {
  sendConfirmationEmail,
  sendAdminNotificationEmail
} = require("./lib/email");

const {
  checkAvailabilityForDay
} = require("./lib/calendar");

/**
 * createBooking
 */
exports.createBooking = onCall(async (request) => {
  let calendarEventId = null;
  let firestoreDocPath = null;

  try {
    const { email, name, selectedPackage, date, time, assets, preferences } = request.data;
    if (!email || !selectedPackage || !date || !time) {
      throw new HttpsError("invalid-argument", "Missing required booking details");
    }

    const startDateTime = toDate(`${date}T${time}:00`, { timeZone: TIMEZONE });
    const endDateTime = addMinutes(startDateTime, 30);

    const event = {
      summary: `Consultation: ${selectedPackage.name} (via Dignified Brand Colors)`,
      description: `Appointment for ${name} (${email}).${preferences ? `\n\nNotes: ${preferences}` : ""}`,
      location: "Google Meet",
      start: { dateTime: startDateTime.toISOString() },
      end: { dateTime: endDateTime.toISOString() },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      attendees: [
        {
          email: email,
          displayName: name || "Valued Client",
          responseStatus: 'needsAction'
        }
      ],
      guestsCanModify: false,
      guestsCanInviteOthers: false,
    };

    // 1. Google Calendar event creation
    const calendarResponse = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    calendarEventId = calendarResponse.data.id;

    const hangoutLink = calendarResponse.data.hangoutLink ||
      calendarResponse.data.conferenceData?.entryPoints?.[0]?.uri ||
      "";

    const timestamp = new Date().toISOString();
    const bucket = admin.storage().bucket();
    const expires = "01-01-2099";

    const getUrl = async (path) => {
      if (!path) return null;
      const file = bucket.file(path);
      const [url] = await file.getSignedUrl({ action: "read", expires });
      return url;
    };

    const assetUrls = {
      photos: await Promise.all((assets?.photos || []).map(getUrl)),
      drawing: await getUrl(assets?.drawing),
      layout: await getUrl(assets?.layout),
    };

    const bookingData = {
      email,
      name,
      package: selectedPackage.name,
      price: selectedPackage.price,
      date,
      time,
      hangoutLink,
      preferences: preferences || "",
      assets: assetUrls,
      timestamp,
      status: "confirmed",
    };

    // 2. Firestore write
    const docId = `${date}_${time.replace(":", "")}_${email}`;
    firestoreDocPath = `consultations/${docId}`;

    await admin
      .firestore()
      .doc(firestoreDocPath)
      .set(bookingData);

    // 3. Email notifications
    await sendConfirmationEmail(email, {
      package: selectedPackage.name,
      date,
      time,
      hangoutLink,
      name,
    });

    await sendAdminNotificationEmail(process.env.EMAIL_USER, {
      package: selectedPackage.name,
      email,
      date,
      time,
      hangoutLink,
      preferences,
      assets: assetUrls,
      name,
    });

    return { success: true, hangoutLink };
  } catch (error) {
    console.error("Error in createBooking (rolling back if necessary):", error);

    // ROLLBACK: Delete successfully created resources if an error occurred subsequently
    if (calendarEventId) {
      try {
        await calendar.events.delete({ calendarId: "primary", eventId: calendarEventId });
        console.log(`Rolled back Google Calendar event: ${calendarEventId}`);
      } catch (rollbackError) {
        console.error("Failed to rollback Google Calendar event:", rollbackError);
      }
    }

    if (firestoreDocPath) {
      try {
        await admin.firestore().doc(firestoreDocPath).delete();
        console.log(`Rolled back Firestore document: ${firestoreDocPath}`);
      } catch (rollbackError) {
        console.error("Failed to rollback Firestore document:", rollbackError);
      }
    }

    // ROLLBACK: Delete uploaded assets from Storage
    const { assets } = request.data;
    if (assets) {
      try {
        const bucket = admin.storage().bucket();
        const allPaths = [
          ...(assets.photos || []),
          assets.drawing,
          assets.layout,
        ].filter(Boolean);

        for (const path of allPaths) {
          await bucket.file(path).delete().catch((e) => {
            if (e.code !== 404) {
              console.error(`Failed to delete asset ${path} during rollback:`, e);
            }
          });
        }
        console.log(`Rolled back ${allPaths.length} assets from Storage`);
      } catch (rollbackError) {
        console.error("Failed to rollback assets from Storage:", rollbackError);
      }
    }

    if (error instanceof HttpsError) throw error;
    throw new HttpsError("internal", error.message || "Failed to create booking");
  }
});

/**
 * getSignedUploadUrls
 */
exports.getSignedUploadUrls = onCall(async (request) => {
  try {
    const { email, files } = request.data;
    if (!email || !files || !Array.isArray(files)) {
      throw new HttpsError("invalid-argument", "Email and files array are required");
    }

    const bucket = admin.storage().bucket();
    const uploads = await Promise.all(
      files.map(async (file) => {
        const { id, name, type, category } = file;
        const sanitizedEmail = email.replace(/[@.]/g, "_");
        const storagePath = `consultations/${sanitizedEmail}/${category}/${Date.now()}_${name}`;

        const [url] = await bucket.file(storagePath).getSignedUrl({
          version: "v4",
          action: "write",
          expires: Date.now() + 15 * 60 * 1000,
          contentType: type,
        });

        return { id, url, storagePath };
      })
    );

    return { success: true, uploads };
  } catch (error) {
    console.error("Error in getSignedUploadUrls:", error);
    throw new HttpsError("internal", error.message);
  }
});

/**
 * getMonthlyAvailability
 */
exports.getMonthlyAvailability = onCall(async (request) => {
  try {
    const data = request.data || {};
    const now = new Date();
    const year = parseInt(data.year) || now.getFullYear();
    const month = parseInt(data.month) || (now.getMonth() + 1);
    const calendarId = data.calendarId || CALENDAR_ID;

    const monthDate = new Date(year, month - 1, 1);
    const timeMin = startOfMonth(monthDate).toISOString();
    const timeMax = endOfMonth(monthDate).toISOString();

    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: { timeMin, timeMax, timeZone: TIMEZONE, items: [{ id: calendarId }] },
    });

    const busyPeriods = freeBusyResponse.data.calendars[calendarId]?.busy || [];
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(monthDate), end: endOfMonth(monthDate) });

    const availableDays = [];
    for (const day of daysInMonth) {
      if (isWeekend(day)) continue;
      const nowInTz = toDate(new Date(), { timeZone: TIMEZONE });
      const today = startOfDay(nowInTz);
      if (isBefore(day, today)) continue;

      if (format(day, 'yyyy-MM-dd') === format(nowInTz, 'yyyy-MM-dd')) {
        if (nowInTz.getHours() >= 16) continue;
      }

      let workStart = toDate(day, { timeZone: TIMEZONE });
      workStart = setHours(workStart, WORKING_HOURS.start);
      workStart = setMinutes(workStart, 0);
      workStart = setSeconds(workStart, 0);

      let workEnd = toDate(day, { timeZone: TIMEZONE });
      workEnd = setHours(workEnd, WORKING_HOURS.end);
      workEnd = setMinutes(workEnd, 0);
      workEnd = setSeconds(workEnd, 0);

      if (checkAvailabilityForDay(workStart, workEnd, busyPeriods)) {
        availableDays.push(day.getDate());
      }
    }
    return { month, year, availableDays };
  } catch (error) {
    console.error("Error in getMonthlyAvailability:", error);
    throw new HttpsError("internal", error.message);
  }
});

/**
 * getAvailableSlots
 */
exports.getAvailableSlots = onCall(async (request) => {
  try {
    let { date, year, month, day, calendarId = CALENDAR_ID } = request.data;

    if (!date && year && month && day) {
      date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    if (!date) throw new HttpsError("invalid-argument", "Date is required");

    const selectedDay = new Date(date);
    const timeMin = startOfDay(selectedDay).toISOString();
    const timeMax = endOfDay(selectedDay).toISOString();

    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: { timeMin, timeMax, timeZone: TIMEZONE, items: [{ id: calendarId }] },
    });

    const busyPeriods = freeBusyResponse.data.calendars[calendarId]?.busy || [];
    let workStart = toDate(selectedDay, { timeZone: TIMEZONE });
    workStart = setHours(workStart, WORKING_HOURS.start);
    workStart = setMinutes(workStart, 0);
    workStart = setSeconds(workStart, 0);

    let workEnd = toDate(selectedDay, { timeZone: TIMEZONE });
    workEnd = setHours(workEnd, WORKING_HOURS.end);
    workEnd = setMinutes(workEnd, 0);
    workEnd = setSeconds(workEnd, 0);

    const slots = [];
    let currentSlot = workStart;

    while (currentSlot < workEnd) {
      const slotEnd = addMinutes(currentSlot, 30);
      const isBusy = busyPeriods.some((busy) => {
        const busyS = new Date(busy.start);
        const busyE = new Date(busy.end);
        return (
          (currentSlot >= busyS && currentSlot < busyE) ||
          (slotEnd > busyS && slotEnd <= busyE)
        );
      });

      if (!isBusy) {
        const nowInTz = toDate(new Date(), { timeZone: TIMEZONE });
        if (currentSlot > nowInTz) {
          slots.push(format(currentSlot, "HH:mm"));
        }
      }
      currentSlot = slotEnd;
    }

    return { availableSlots: slots };
  } catch (error) {
    console.error("Error in getAvailableSlots:", error);
    throw new HttpsError("internal", error.message);
  }
});

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};
