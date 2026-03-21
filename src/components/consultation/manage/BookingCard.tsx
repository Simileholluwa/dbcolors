import React from "react";
import { Calendar, Clock, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface BookingCardProps {
  booking: {
    id: string;
    package: string;
    date: string;
    time: string;
  };
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onUpdate,
  onDelete,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/5 border border-white/10 p-4 md:p-8 rounded-[1.5rem] transition-all group shadow-xl backdrop-blur-md"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
        <div className="space-y-4 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="bg-primary/20 text-primary text-[9px] md:text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
              {booking.package}
            </span>
            <span className="hidden md:inline text-white/20 text-[10px] uppercase font-black tracking-widest">•</span>
            <span className="text-white/40 text-[9px] md:text-[10px] uppercase font-black tracking-widest">
              ID: {booking.id.split('_').slice(0, 2).join(' ')}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white">
              <Calendar size={18} className="text-primary shrink-0" />
              <span className="text-xl md:text-2xl font-black tracking-tight">{booking.date}</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Clock size={18} className="text-white/20 shrink-0" />
              <span className="text-base md:text-lg font-bold">{booking.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => onUpdate(booking.id)}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[11px] md:text-[12px] uppercase tracking-widest transition-all"
          >
            <Edit2 size={16} />
            Update
          </button>
          <button
            onClick={() => onDelete(booking.id)}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-black text-[11px] md:text-[12px] uppercase tracking-widest transition-all border border-red-500/20"
          >
            <Trash2 size={16} />
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
