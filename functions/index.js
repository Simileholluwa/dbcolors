const booking = require("./src/booking");
const availability = require("./src/availability");
const storage = require("./src/storage");
const reminders = require("./src/reminders");
const adminFunctions = require("./src/admin");

// Booking Functions
exports.createBooking = booking.createBooking;
exports.checkExistingBooking = booking.checkExistingBooking;
exports.deleteBooking = booking.deleteBooking;
exports.updateBooking = booking.updateBooking;
exports.getBooking = booking.getBooking;

// Admin Functions
exports.getAllBookings = adminFunctions.getAllBookings;

// Availability Functions
exports.getMonthlyAvailability = availability.getMonthlyAvailability;
exports.getAvailableSlots = availability.getAvailableSlots;

// Storage Functions
exports.getSignedUploadUrls = storage.getSignedUploadUrls;

// Scheduled Functions
exports.sendConsultationReminders = reminders.sendConsultationReminders;
