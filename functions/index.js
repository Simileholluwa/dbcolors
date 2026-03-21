/**
 * Cloud Functions Entry Point
 */

const booking = require("./src/booking");
const availability = require("./src/availability");
const storage = require("./src/storage");

// Booking Functions
exports.createBooking = booking.createBooking;
exports.checkExistingBooking = booking.checkExistingBooking;
exports.deleteBooking = booking.deleteBooking;
exports.updateBooking = booking.updateBooking;
exports.getBooking = booking.getBooking;

// Availability Functions
exports.getMonthlyAvailability = availability.getMonthlyAvailability;
exports.getAvailableSlots = availability.getAvailableSlots;

// Storage Functions
exports.getSignedUploadUrls = storage.getSignedUploadUrls;
