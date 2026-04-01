import React from "react";
import Link from "next/link";

interface ExistingBookingModalProps {
  existingBooking: {
    name: string;
    date: string;
    time: string;
  } | null;
  email: string;
  isVisible: boolean;
}

const ExistingBookingModal: React.FC<ExistingBookingModalProps> = ({
  existingBooking,
  email,
  isVisible,
}) => {
  if (!isVisible || !existingBooking) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-6 backdrop-blur-md"
    >
      <div className="bg-secondary/90 border border-white/10 p-8 rounded-[2rem] max-w-lg w-full shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <h3 className="text-3xl font-black text-white tracking-tighter mb-6 text-center">
          Existing Booking Found
        </h3>

        <p className="text-white/60 text-sm mb-8 leading-relaxed italic text-center">
          Hi {existingBooking.name}, it looks like you already have a future booking scheduled for <span className="text-primary font-bold">{existingBooking.date}</span> at <span className="text-primary font-bold">{existingBooking.time}</span>.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href={`/consultation/manage?email=${encodeURIComponent(email)}`}
            className="w-full py-4 bg-primary text-secondary rounded-xl font-black text-[12px] uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(153,255,0,0.2)] text-center flex items-center justify-center gap-2"
          >
            Manage My Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExistingBookingModal;
