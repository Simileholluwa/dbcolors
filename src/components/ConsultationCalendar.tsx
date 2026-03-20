import React from "react";
import { CalendarCheck } from "lucide-react";
import { useAvailability } from "@/hooks/useAvailability";
import CalendarGrid from "./consultation/calendar/CalendarGrid";
import TimeSlotPicker from "./consultation/calendar/TimeSlotPicker";

interface ConsultationCalendarProps {
  onSelected: (isoDate: string, timeStr: string, displayDate: string) => void;
}

const ConsultationCalendar = ({ onSelected }: ConsultationCalendarProps) => {
  const now = new Date();
  const {
    isLoading,
    isLoadingTimes,
    availableDays,
    availableTimes,
    monthData,
    fetchDaySlots,
    setAvailableTimes
  } = useAvailability(now.getMonth() + 1, now.getFullYear().toString());

  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setSelectedTime(null);
    fetchDaySlots(day);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDay && selectedTime) {
      const displayDate = `${monthData.name} ${selectedDay}, ${monthData.year}`;
      const isoDate = `${monthData.year}-${String(monthData.monthNum).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      onSelected(isoDate, selectedTime, displayDate);
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-4xl bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] overflow-hidden shadow-2xl relative group min-h-[500px] flex flex-col">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="p-6 md:p-8 lg:p-10 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
        {/* Left Column: Calendar Selection */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase block mb-1">Schedule</span>
              <h3 className="text-2xl font-black text-white tracking-tighter">Consultation</h3>
            </div>
          </div>

          <CalendarGrid
            monthData={monthData}
            availableDays={availableDays}
            selectedDay={selectedDay}
            onSelectDay={handleDaySelect}
            isLoading={isLoading}
          />
        </div>

        {/* Vertical Divider for desktop */}
        <div className="hidden lg:block w-[1px] bg-white/5" />

        {/* Right Column: Time Selection & Confirmation */}
        <div className="flex-1 flex flex-col">
          <TimeSlotPicker
            selectedDay={selectedDay}
            availableTimes={availableTimes}
            selectedTime={selectedTime}
            onSelectTime={handleTimeSelect}
            isLoadingTimes={isLoadingTimes}
          />

          <div className="mt-auto">
            <button
              onClick={handleConfirm}
              disabled={!selectedTime}
              className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3
                ${selectedTime
                  ? "bg-primary text-secondary shadow-[0_0_30px_rgba(153,255,0,0.2)] hover:brightness-110"
                  : "bg-white/5 text-white/20 pointer-events-none"
                }
              `}
            >
              <CalendarCheck size={18} strokeWidth={3} />
              {selectedTime
                ? `Confirm ${monthData.name} ${selectedDay} @ ${selectedTime}`
                : selectedDay
                  ? 'Choose a Time'
                  : 'Select a Date'
              }
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default ConsultationCalendar;
