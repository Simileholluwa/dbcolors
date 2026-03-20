import React from "react";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  step: number;
  selectedPackage: any;
  isStepSelectable: (s: number) => boolean;
  setStep: (s: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  step,
  selectedPackage,
  isStepSelectable,
  setStep,
}) => {
  return (
    <div className="sticky top-20 md:top-24 z-30 flex justify-center w-full px-4">
      <div className="bg-secondary/50 backdrop-blur-xl border border-white/10 rounded-2xl px-4 pt-4 pb-8 md:px-6 md:pt-6 md:pb-12 shadow-[0_20px_40px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-x-auto no-scrollbar">
        <div className="flex justify-between items-center relative gap-6 md:gap-8 min-w-max md:min-w-[600px] px-2">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
          {[1, 2, 3, 4, 5].map((s) => {
            const isActive = step === s;
            const isSelectable = isStepSelectable(s);

            const isCompleted =
              step > s ||
              (s === 2 && selectedPackage?.price === "Free" && step >= 3);

            return (
              <button
                key={s}
                disabled={!isSelectable}
                onClick={() => isSelectable && setStep(s)}
                className="relative z-10 flex flex-col items-center group disabled:cursor-not-allowed"
              >
                <div
                  className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center font-black text-[10px] md:text-sm transition-all duration-500
                    ${isActive || isCompleted
                      ? "bg-primary text-secondary shadow-[0_0_20px_rgba(153,255,0,0.3)]"
                      : "bg-white/5 text-white/20 border border-white/10"
                    }
                    ${isSelectable && !isActive
                      ? "hover:scale-110 hover:shadow-[0_0_30px_rgba(153,255,0,0.5)] cursor-pointer"
                      : ""
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={12} className="md:w-4 md:h-4" strokeWidth={4} />
                  ) : (
                    s
                  )}
                </div>
                <span
                  className={`absolute -bottom-5 md:-bottom-7 left-1/2 -translate-x-1/2 text-[6px] md:text-[8px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-black whitespace-nowrap transition-colors duration-300
                    ${isActive
                      ? "text-primary"
                      : isSelectable || isCompleted
                        ? "text-white/60"
                        : "text-white/20"
                    }
                  `}
                >
                  {s === 1
                    ? "Package"
                    : s === 2
                      ? "Payment"
                      : s === 3
                        ? "Assets"
                        : s === 4
                          ? "Schedule"
                          : "Success"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
