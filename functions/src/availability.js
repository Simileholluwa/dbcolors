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
  startOfDay,
  endOfDay
} = require("date-fns");

const {
  calendar,
  TIMEZONE,
  WORKING_HOURS,
  CALENDAR_ID
} = require("../lib/config");

const {
  checkAvailabilityForDay
} = require("../lib/calendar");

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
