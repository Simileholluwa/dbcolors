"use client";

import React, { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { Loader2, Calendar, Mail, User, Package, ExternalLink, Trash2, Clock, LogOut, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AdminBookingsPage = () => {
  const { user, loading, logout } = useAdminAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  useEffect(() => {
    if (!loading && user) {
      fetchBookings();
    }
  }, [loading, user]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const getAllBookingsFn = httpsCallable(functions, "getAllBookings");
      const result: any = await getAllBookingsFn();
      if (result.data.success) {
        setBookings(result.data.bookings);
      } else {
        throw new Error(result.data.error || "Failed to fetch bookings");
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this booking? This will also remove the calendar event.")) return;
    try {
      const deleteFn = httpsCallable(functions, "deleteBooking");
      const result: any = await deleteFn({ docId });
      if (result.data.success) {
        setBookings(bookings.filter(b => b.id !== docId));
        if (selectedBooking?.id === docId) setSelectedBooking(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete booking");
    }
  };

  return (
    <div className="p-6 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
            Booking <span className="text-primary italic">Management</span>
          </h1>
          <p className="text-white/40 font-medium tracking-wide">Overview of all consultation sessions</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button
            onClick={fetchBookings}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs md:text-sm font-bold text-white/80"
          >
            {isLoading ? <Loader2 className="animate-spin w-4 h-4 md:w-[18px] md:h-[18px]" /> : "Refresh List"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl mb-8 font-medium text-xs text-red-400">
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">Loading sessions...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-24 border border-white/5 bg-white/[0.02] rounded-3xl">
            <p className="text-white/20 font-medium">No bookings found.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedBooking(booking)}
              className="group relative border bg-white/[0.02] border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`flex items-stretch justify-between h-[72px] md:h-[84px]`}>
                {/* Time Block */}
                <div className="bg-primary w-[72px] md:w-[120px] h-full flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] md:text-xs font-black text-secondary/60 uppercase tracking-widest leading-none mb-1">Time</span>
                  <span className="text-lg md:text-2xl font-black text-secondary tracking-tighter leading-none">{booking.time}</span>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex items-center p-4 md:px-8">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-black tracking-tight text-white/90 truncate mr-4">
                      {booking.name}
                    </h3>
                    <div className="hidden md:flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="text-white/20" size={12} />
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Package className="text-white/20" size={12} />
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest truncate max-w-[150px]">{booking.package}</span>
                      </div>
                    </div>
                    <span className="md:hidden text-[8px] font-black text-primary uppercase tracking-[0.2em]">{booking.package}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[8px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">Confirmed</span>
                    </div>
                    <ChevronDown size={20} className="text-white/20 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <BookingDetailsDialog
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onDelete={(e) => handleDelete(e, selectedBooking.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const BookingDetailsDialog = ({ booking, onClose, onDelete }: { booking: any, onClose: () => void, onDelete: (e: any) => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl bg-secondary rounded-t-[1.5rem] md:rounded-[1.5rem] border-t md:border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] md:max-h-[85vh] flex flex-col"
      >
        <div className="md:hidden flex justify-center p-4">
          <div className="w-12 h-1.5 bg-white/10 rounded-full" />
        </div>

        <div className="relative p-6 md:p-10 border-b border-white/5">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-white/40 hover:text-white transition-colors z-20"
          >
            <X size={24} />
          </button>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-4 py-1.5 bg-primary text-secondary text-[10px] font-black uppercase tracking-[0.2em] rounded-lg">
                  {booking.package}
                </span>
              </div>

              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none">
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

            <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 flex items-center gap-8 px-8">
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

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                  <User className="text-primary/60" size={16} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Technical Scope</span>
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
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Verified Assets</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border transition-all ${booking.assets?.photos?.length > 0
                  ? "bg-primary/5 border-primary/20"
                  : "bg-white/5 border-white/5 opacity-40"
                  }`}>
                  <p className={`text-2xl font-black tracking-tighter mb-1 ${booking.assets?.photos?.length > 0 ? "text-primary" : "text-white"}`}>
                    {booking.assets?.photos?.length || 0}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Scanning Images</p>
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
      </motion.div>
    </div>
  );
};

export default AdminBookingsPage;
