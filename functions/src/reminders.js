const { onSchedule } = require("firebase-functions/v2/scheduler");
const { admin, TIMEZONE } = require("../lib/config");
const { sendReminderEmail } = require("../lib/email");
const { addHours, addDays } = require("date-fns");

exports.sendConsultationReminders = onSchedule("every 1 hours", async (event) => {
  const now = new Date();
  const db = admin.firestore();

  // 1. Check for 24-hour reminders
  const tomorrowStart = addHours(now, 23);
  const tomorrowEnd = addHours(now, 25);

  const snapshot24h = await db.collection("consultations")
    .where("status", "==", "confirmed")
    .where("startDateTime", ">=", admin.firestore.Timestamp.fromDate(tomorrowStart))
    .where("startDateTime", "<=", admin.firestore.Timestamp.fromDate(tomorrowEnd))
    .get();

  for (const doc of snapshot24h.docs) {
    const data = doc.data();
    if (!data.reminderSent24h) {
      try {
        await sendReminderEmail(data.email, {
          package: data.package,
          date: data.date,
          time: data.time,
          hangoutLink: data.hangoutLink,
          name: data.name
        }, "24h");
        await doc.ref.update({ reminderSent24h: true });
        console.log(`Sent 24h reminder to ${data.email}`);
      } catch (err) {
        console.error(`Failed to send 24h reminder to ${data.email}:`, err);
      }
    }
  }

  // 2. Check for 1-hour reminders
  const soonStart = now;
  const soonEnd = addHours(now, 1.5);

  const snapshot1h = await db.collection("consultations")
    .where("status", "==", "confirmed")
    .where("startDateTime", ">=", admin.firestore.Timestamp.fromDate(soonStart))
    .where("startDateTime", "<=", admin.firestore.Timestamp.fromDate(soonEnd))
    .get();

  for (const doc of snapshot1h.docs) {
    const data = doc.data();
    if (!data.reminderSent1h) {
      try {
        await sendReminderEmail(data.email, {
          package: data.package,
          date: data.date,
          time: data.time,
          hangoutLink: data.hangoutLink,
          name: data.name
        }, "1h");
        await doc.ref.update({ reminderSent1h: true });
        console.log(`Sent 1h reminder to ${data.email}`);
      } catch (err) {
        console.error(`Failed to send 1h reminder to ${data.email}:`, err);
      }
    }
  }
});
