import React from "react";
import { X, Mail, Calendar, Clock, User, Package, ExternalLink, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Booking } from "@/hooks/useAdminBookings";

interface BookingDetailsDialogProps {
  booking: Booking;
  onClose: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const BookingDetailsDialog = ({ booking, onClose, onDelete }: BookingDetailsDialogProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-secondary/80"
      />

      <div
        className="relative w-full max-w-4xl bg-secondary rounded-t-[1.5rem] md:rounded-[1.5rem] border-t md:border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] md:max-h-[85vh] flex flex-col"
      >
        <div className="relative p-6 md:p-8 lg:p-10 border-b border-white/10">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-6 md:top-0 md:right-0 p-2 rounded-xl md:rounded-none md:rounded-tr-xl md:rounded-bl-xl bg-white/10 text-red/40 hover:text-red z-20"
          >
            <X size={24} />
          </button>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white mb-2 leading-none">
                  {booking.name}
                </h2>
                <div className="flex items-center gap-4 text-white/40">
                  <p className="text-xs font-medium tracking-wide flex items-center gap-2">
                    <Mail size={14} className="text-primary/40" />
                    {booking.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 md:p-5 rounded-2xl border border-white/5 flex items-center gap-4 md:gap-8 px-6 md:px-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Session Date</span>
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary" size={16} />
                  <p className="text-sm md:text-base font-black text-white uppercase">{booking.date}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Launch Time</span>
                <div className="flex items-center gap-2">
                  <Clock className="text-primary" size={16} />
                  <p className="text-xl md:text-2xl font-black text-primary tracking-tighter">{booking.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                  <User className="text-primary/60" size={16} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Design preferences</span>
              </div>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium">
                {booking.preferences || "No additional technical constraints provided for this briefing session."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                  <Package className="text-primary/60" size={16} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Assets</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border transition-all ${(booking.assets?.photos?.length ?? 0) > 0
                  ? "bg-primary/5 border-primary/20"
                  : "bg-white/5 border-white/5 opacity-40"
                  }`}>
                  <p className={`text-2xl font-black tracking-tighter mb-1 ${(booking.assets?.photos?.length ?? 0) > 0 ? "text-primary" : "text-white"}`}>
                    {booking.assets?.photos?.length || 0}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Images/Videos</p>
                </div>
                <div className={`p-4 rounded-2xl border transition-all ${booking.assets?.drawing
                  ? "bg-primary/5 border-primary/20"
                  : "bg-white/5 border-white/5 opacity-40"
                  }`}>
                  <p className={`text-[11px] font-black uppercase tracking-widest py-2.5 ${booking.assets?.drawing ? "text-primary italic" : "text-white/40"}`}>
                    {booking.assets?.drawing ? "Vectorized" : "N/A"}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Technical Drawings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <a
              href={booking.hangoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 py-5 bg-primary text-secondary rounded-2xl font-black text-xs uppercase tracking-[0.2em] transform active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(153,255,0,0.2)]"
            >
              <ExternalLink size={18} />
              Start Meeting Session
            </a>
            <button
              onClick={onDelete}
              className="flex items-center justify-center gap-4 py-5 bg-white/5 text-red-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all border border-white/5"
            >
              <Trash2 size={18} />
              Delete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
