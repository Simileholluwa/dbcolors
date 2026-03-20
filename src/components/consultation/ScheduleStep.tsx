import React from "react";
import { ArrowRight } from "lucide-react";
import ConsultationCalendar from "@/components/ConsultationCalendar";

interface ScheduleStepProps {
  handleTimeSelected: (isoDate: string, timeStr: string, displayDate: string) => void;
  setStep: (s: number) => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({
  handleTimeSelected,
  setStep,
}) => {
  return (
    <div
      key="step4"
      className="flex flex-col items-center"
    >
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase block mb-4">
          Calendar
        </span>
        <h2 className="text-4xl font-black text-white tracking-tighter mb-4">
          Pick a Time
        </h2>
        <p className="text-white/40 text-sm font-medium italic">
          Select a date and time that works best for your schedule.
        </p>
      </div>

      <ConsultationCalendar onSelected={handleTimeSelected} />

      <button
        onClick={() => setStep(3)}
        className="mt-12 text-white/20 hover:text-white/40 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
      >
        <ArrowRight size={12} className="rotate-180" />
        Go Back
      </button>
    </div>
  );
};

export default ScheduleStep;
