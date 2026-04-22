"use client";

import React, { useState } from "react";
import { Loader2, Calendar, Package, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminBookings } from "@/hooks/useAdminBookings";
import { BookingDetailsDialog } from "@/components/admin/BookingDetailsDialog";
import { AlertDialog } from "@/components/ui/AlertDialog";

const AdminBookingsPage = () => {
  const {
    bookings,
    isLoading,
    error,
    selectedBooking,
    fetchBookings,
    deleteBooking,
    openDetails,
    closeDetails,
  } = useAdminBookings();

  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  return (
    <div className="p-6 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 text-white">
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
              onClick={() => openDetails(booking)}
              className="group relative border bg-white/[0.02] border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`flex items-stretch justify-between h-[72px] md:h-[84px]`}>
                {/* Time Block */}
                <div className="bg-primary w-[72px] md:w-[90px] lg:w-[120px] h-full flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] md:text-xs font-black text-secondary/60 uppercase tracking-widest leading-none mb-1">Time</span>
                  <span className="text-lg md:text-2xl font-black text-secondary tracking-tighter leading-none">{booking.time}</span>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex items-center p-4 lg:px-8">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-black tracking-tight text-white/90 truncate mr-4">
                      {booking.name}
                    </h3>
                    <div className="hidden md:flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="text-white/20" size={12} />
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{booking.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
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
            onClose={closeDetails}
            onDelete={(e) => {
              e.stopPropagation();
              setBookingToDelete(selectedBooking.id);
            }}
          />
        )}
      </AnimatePresence>

      <AlertDialog
        isOpen={!!bookingToDelete}
        onClose={() => setBookingToDelete(null)}
        onConfirm={() => bookingToDelete && deleteBooking(bookingToDelete)}
        title="Delete Booking"
        description="Are you sure you want to delete this booking? This action cannot be undone and will also remove the associated calendar event."
        confirmText="Delete Session"
        variant="danger"
      />
    </div>
  );
};

export default AdminBookingsPage;
