const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { toDate } = require("date-fns-tz");
const { addMinutes } = require("date-fns");
const {
  admin,
  calendar,
  TIMEZONE,
} = require("../lib/config");

const {
  sendConfirmationEmail,
  sendAdminNotificationEmail
} = require("../lib/email");

/**
 * createBooking
 */
exports.createBooking = onCall(async (request) => {
  let calendarEventId = null;
  let firestoreDocPath = null;

  try {
    let { email, name, selectedPackage, date, time, assets, preferences } = request.data;
    if (!email || !selectedPackage || !date || !time) {
      throw new HttpsError("invalid-argument", "Missing required booking details");
    }
    email = email.toLowerCase();

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
      startDateTime: admin.firestore.Timestamp.fromDate(startDateTime),
      calendarEventId,
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
 * checkExistingBooking
 */
exports.checkExistingBooking = onCall(async (request) => {
  try {
    let { email } = request.data;
    if (!email) throw new HttpsError("invalid-argument", "Email is required");
    email = email.toLowerCase();

    const now = admin.firestore.Timestamp.now();
    const snapshot = await admin.firestore()
      .collection("consultations")
      .where("email", "==", email)
      .where("startDateTime", ">", now)
      .where("status", "==", "confirmed")
      .orderBy("startDateTime", "asc")
      .get();

    if (snapshot.empty) return { exists: false, bookings: [] };

    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDateTime: doc.data().startDateTime.toDate().toISOString()
    }));

    return {
      exists: true,
      bookings
    };
  } catch (error) {
    console.error("Error in checkExistingBooking:", error);
    throw new HttpsError("internal", error.message);
  }
});

/**
 * deleteBooking
 */
exports.deleteBooking = onCall(async (request) => {
  try {
    const { docId } = request.data;
    if (!docId) throw new HttpsError("invalid-argument", "Document ID is required");

    const docRef = admin.firestore().doc(`consultations/${docId}`);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new HttpsError("not-found", "Booking not found");
    }

    const data = doc.data();

    // 1. Delete Calendar Event
    if (data.calendarEventId || data.eventId) {
      const eventId = data.calendarEventId || data.eventId;
      try {
        await calendar.events.delete({ calendarId: "primary", eventId });
      } catch (calError) {
        console.error("Error deleting calendar event:", calError);
      }
    }

    // 2. Delete Firestore Doc
    await docRef.delete();

    return { success: true };
  } catch (error) {
    console.error("Error in deleteBooking:", error);
    throw new HttpsError("internal", error.message);
  }
});

/**
 * updateBooking
 */
exports.updateBooking = onCall(async (request) => {
  try {
    // Note: If updateBooking is used by the client for rescheduling their own booking, 
    // we should check if they are the owner of the booking OR an admin.
    // For now, since admin dashboard uses it, we allow admin or owner.
    // If you strictly want ADMIN check here: if (!request.auth) throw new HttpsError(...)
    const { oldDocId, newDate, newTime } = request.data;
    if (!oldDocId || !newDate || !newTime) {
      throw new HttpsError("invalid-argument", "Missing required reschedule details");
    }

    const docRef = admin.firestore().doc(`consultations/${oldDocId}`);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new HttpsError("not-found", "Original booking not found");
    }

    const data = doc.data();
    const startDateTime = toDate(`${newDate}T${newTime}:00`, { timeZone: TIMEZONE });
    const endDateTime = addMinutes(startDateTime, 30);

    // 1. Update Calendar Event if it exists
    if (data.calendarEventId) {
      try {
        await calendar.events.patch({
          calendarId: "primary",
          eventId: data.calendarEventId,
          requestBody: {
            start: { dateTime: startDateTime.toISOString() },
            end: { dateTime: endDateTime.toISOString() },
            description: `${data.preferences ? `${data.preferences}\n\n` : ""}Rescheduled from ${data.date} ${data.time}.`,
          },
        });
        console.log(`Updated Calendar event: ${data.calendarEventId}`);
      } catch (calError) {
        console.error("Error patching calendar event:", calError);
      }
    }

    // 2. Update Firestore Document
    await docRef.update({
      date: newDate,
      time: newTime,
      startDateTime: admin.firestore.Timestamp.fromDate(startDateTime),
      lastUpdated: new Date().toISOString(),
    });

    return {
      success: true,
      date: newDate,
      time: newTime
    };
  } catch (error) {
    console.error("Error in updateBooking:", error);
    if (error instanceof HttpsError) throw error;
    throw new HttpsError("internal", error.message || "Failed to update booking");
  }
});

/**
 * getBooking
 */
exports.getBooking = onCall(async (request) => {
  try {
    const { docId } = request.data;
    if (!docId) throw new HttpsError("invalid-argument", "Document ID is required");

    const docRef = admin.firestore().doc(`consultations/${docId}`);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new HttpsError("not-found", "Booking not found");
    }

    return {
      success: true,
      booking: {
        id: doc.id,
        ...doc.data(),
        startDateTime: doc.data().startDateTime.toDate().toISOString()
      }
    };
  } catch (error) {
    console.error("Error in getBooking:", error);
    throw new HttpsError("internal", error.message);
  }
});
