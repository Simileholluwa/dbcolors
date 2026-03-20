import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

interface SuccessStepProps {
  bookingData: {
    date: string;
    isoDate: string;
    time: string;
    hangoutLink: string;
    email: string;
    packageName: string;
  };
}

const SuccessStep: React.FC<SuccessStepProps> = ({
  bookingData,
}) => {
  // Helper to generate Google Calendar URL
  const getGoogleCalendarUrl = () => {
    try {
      // Use isoDate (YYYY-MM-DD) and time (HH:mm)
      const [year, month, day] = bookingData.isoDate.split("-").map(Number);
      const [hours, minutes] = bookingData.time.split(":").map(Number);

      const startTime = new Date(year, month - 1, day, hours, minutes);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

      const formatGCalDate = (date: Date) =>
        date.toISOString().replace(/-|:|\.\d+/g, "");

      const details = `Consultation for ${bookingData.email}\n\nMeeting Link: ${bookingData.hangoutLink}`;

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Dignified Brand Colors: ${bookingData.packageName}`)}&dates=${formatGCalDate(startTime)}/${formatGCalDate(endTime)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(bookingData.hangoutLink)}`;
    } catch (e) {
      return "#";
    }
  };

  return (
    <div
      key="step5"
      className="max-w-xl mx-auto text-center"
    >
      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_50px_rgba(153,255,0,0.3)]">
        <Check size={48} className="text-secondary" strokeWidth={4} />
      </div>

      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
        Booking <br />
        <span className="text-primary italic">Confirmed</span>
      </h2>
      <p className="text-white/60 text-lg font-medium leading-relaxed mb-6 max-w-md mx-auto italic">
        Thank you! Your {bookingData.packageName} consultation is scheduled for{" "}
        <span className="text-white font-bold">{bookingData.date}</span> at{" "}
        <span className="text-white font-bold">{bookingData.time}</span>.
      </p>

      {bookingData.hangoutLink && (
        <div className="mb-12 bg-primary/10 border border-primary/20 p-8 rounded-3xl backdrop-blur-xl">
          <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-4">
            Your Meeting Link
          </p>
          <a
            href={bookingData.hangoutLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-black text-xl hover:text-primary transition-colors block break-all mb-6"
          >
            {bookingData.hangoutLink}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-secondary rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_50px_rgba(153,255,0,0.2)]"
            >
              Add to Calendar
            </a>
          </div>
        </div>
      )}
      <p className="text-primary text-sm font-bold mb-12 max-w-md mx-auto tracking-widest">
        A confirmation email has been sent to <br />
        <span className="text-white underline underline-offset-4 decoration-primary/30 break-all px-4">{bookingData.email}</span>
      </p>
    </div>
  );
};

export default SuccessStep;
