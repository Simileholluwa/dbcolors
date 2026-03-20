import React from "react";
import { motion } from "framer-motion";

interface CalendarGridProps {
  monthData: {
    name: string;
    year: string;
    days: number[];
  };
  availableDays: number[];
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
  isLoading: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  monthData,
  availableDays,
  selectedDay,
  onSelectDay,
  isLoading,
}) => {
  const today = new Date().getDate();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-6 px-2">
        <motion.span
          key={monthData.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white font-black tracking-widest text-sm"
        >
          {monthData.name} <span className="text-white/20">{monthData.year}</span>
        </motion.span>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-white/20 animate-pulse' : 'bg-primary shadow-[0_0_10px_rgba(153,255,0,0.5)]'}`} />
          <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
            {isLoading ? 'Updating...' : 'Available Spots'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <div key={i} className="text-[10px] font-black text-white/20 text-center py-2 uppercase tracking-widest">{day}</div>
        ))}
        {monthData.days.map((day) => {
          const isAvailable = availableDays.includes(day) && day >= today;
          const isSelected = selectedDay === day;
          return (
            <motion.button
              key={day}
              whileHover={isAvailable && !isLoading ? { scale: 1.1 } : {}}
              whileTap={isAvailable && !isLoading ? { scale: 0.95 } : {}}
              onClick={() => isAvailable && !isLoading && onSelectDay(day)}
              disabled={!isAvailable || isLoading}
              className={`
                h-10 rounded-md flex items-center justify-center text-xs font-bold transition-all duration-300 relative
                ${isAvailable && !isLoading ? "cursor-pointer" : "opacity-20 cursor-default"}
                ${isSelected
                  ? "bg-primary text-secondary shadow-[0_0_20px_rgba(153,255,0,0.3)]"
                  : (isAvailable && !isLoading)
                    ? "bg-white/5 text-white hover:bg-white/10"
                    : "text-white/40"
                }
              `}
            >
              {day}
              {isAvailable && !isSelected && (
                <div className="absolute top-1 right-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
