import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";

interface TimeSlotPickerProps {
  selectedDay: number | null;
  availableTimes: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  isLoadingTimes: boolean;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDay,
  availableTimes,
  selectedTime,
  onSelectTime,
  isLoadingTimes,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <AnimatePresence mode="wait">
        {selectedDay ? (
          <motion.div
            key="time-selection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Select Time</span>
              {isLoadingTimes && <span className="text-[10px] text-primary animate-pulse font-black uppercase tracking-widest">Loading...</span>}
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => onSelectTime(time)}
                    className={`
                      py-2 rounded-lg text-[13px] font-black tracking-tighter transition-all duration-300
                      ${selectedTime === time
                        ? "bg-primary text-secondary shadow-[0_0_15px_rgba(153,255,0,0.3)]"
                        : "bg-white/5 text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {time}
                  </button>
                ))
              ) : !isLoadingTimes && (
                <div className="col-span-4 text-center py-4 text-[10px] text-white/20 font-black uppercase tracking-widest bg-white/5 rounded-xl border border-dashed border-white/5">
                  No slots available
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="hidden lg:flex flex-1 flex-col items-center justify-center text-center p-8 bg-white/5 rounded-2xl border border-dashed border-white/10 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <CalendarCheck className="text-white/20" size={24} strokeWidth={1} />
            </div>
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest leading-loose">
              Select a date from the calendar<br/>to view available times
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeSlotPicker;
