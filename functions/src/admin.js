const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { admin } = require("../lib/config");

const ALLOWED_ORIGINS = [
  "https://dbcolors.ng",
  "https://admin.dbcolors.ng",
  "https://dbcolorsng.com",
  "https://admin.dbcolorsng.com",
  "http://localhost:3000",
  "https://dbcolors.netlify.app"
];

/**
 * getAllBookings
 */
exports.getAllBookings = onCall({ cors: ALLOWED_ORIGINS }, async (request) => {
  try {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Administrator authentication required");
    }

    const snapshot = await admin.firestore()
      .collection("consultations")
      .orderBy("startDateTime", "desc")
      .limit(100)
      .get();

    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDateTime: doc.data().startDateTime.toDate().toISOString()
    }));

    return { success: true, bookings };
  } catch (error) {
    console.error("Error in getAllBookings:", error);
    throw new HttpsError("internal", error.message);
  }
});
