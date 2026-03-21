const admin = require("firebase-admin");
const { google } = require("googleapis");
require("dotenv").config();

// 1. Initialize Firebase Admin
const serviceAccount = require("../service-account-key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "dbcolors-ng.firebasestorage.app"
  });
}

// 2. Constants
const TIMEZONE = "Africa/Lagos";
const WORKING_HOURS = {
  start: 9,
  end: 17
};
const CALENDAR_ID = process.env.CALENDAR_ID || "primary";
const EMAIL_USER = process.env.EMAIL_USER;

// 3. Google Workspace Auth with Impersonation
const auth = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/gmail.send"
  ],
  EMAIL_USER
);

const calendar = google.calendar({ version: "v3", auth });
const gmail = google.gmail({ version: "v1", auth });

module.exports = {
  admin,
  google,
  calendar,
  gmail,
  TIMEZONE,
  WORKING_HOURS,
  CALENDAR_ID,
  EMAIL_USER,
  auth
};
