const { isWithinInterval, addMinutes } = require("date-fns");

/**
 * Checks if a day has at least one 30-min slot available
 */
const checkAvailabilityForDay = (workStart, workEnd, busyPeriods) => {
  let currentSlot = workStart;
  while (isBeforeOrEqual(addMinutes(currentSlot, 30), workEnd)) {
    const slotStart = currentSlot;
    const slotEnd = addMinutes(currentSlot, 30);

    const isBusy = busyPeriods.some((busy) => {
      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);
      return (
        isWithinInterval(slotStart, { start: busyStart, end: addMinutes(busyEnd, -1) }) ||
        isWithinInterval(addMinutes(slotEnd, -1), { start: busyStart, end: busyEnd })
      );
    });

    if (!isBusy) return true;
    currentSlot = addMinutes(currentSlot, 30);
  }
  return false;
};

const isBeforeOrEqual = (date1, date2) => date1 <= date2;

module.exports = {
  checkAvailabilityForDay
};
