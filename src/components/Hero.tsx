"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";

const Hero = () => {
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = React.useState(0);

  const monthData = [
    {
      name: "MARCH",
      year: "2026",
      days: Array.from({ length: 31 }, (_, i) => i + 1),
      availableDays: [12, 14, 15, 19, 21, 22, 26, 28]
    },
    {
      name: "APRIL",
      year: "2026",
      days: Array.from({ length: 30 }, (_, i) => i + 1),
      availableDays: [2, 5, 8, 12, 18, 20, 25, 29]
    },
    {
      name: "MAY",
      year: "2026",
      days: Array.from({ length: 31 }, (_, i) => i + 1),
      availableDays: [1, 4, 10, 15, 22, 24, 27, 30]
    }
  ];

  const currentMonth = monthData[currentMonthIndex];

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % monthData.length);
    setSelectedDay(null);
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + monthData.length) % monthData.length);
    setSelectedDay(null);
  };

  return (
    <section className="relative lg:min-h-screen w-full flex flex-col lg:flex-row overflow-hidden lg:items-center bg-transparent pt-32 pb-16 md:pt-40 md:pb-24" id="hero">
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-8 md:gap-12 items-center">
          {/* Left Segment: Headline & Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center lg:h-auto mb-8 lg:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-4 md:mb-8"
            >
              Transform Your <br />
              <span className="text-primary italic text-primary">Space</span>, Transform
              <br />
              Your Life
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-md md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-4 md:mb-8 lg:mb-12 leading-relaxed font-medium"
            >
              Elevate your living and working environments with bespoke interior designs
              that combine luxury, functionality, and timeless elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 lg:mb-0 items-center justify-center lg:items-start lg:justify-start"
            >
              <motion.button
                onClick={() => {
                  const el = document.getElementById('packages');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover="hover"
                whileTap="tap"
                className="group relative px-6 py-2 md:px-10 md:py-4 rounded-full border border-primary/50 backdrop-blur-md overflow-hidden flex items-center gap-3 md:gap-4 transition-all duration-500"
              >
                <motion.div
                  variants={{
                    hover: { scale: 1.5, opacity: 1 }
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 bg-primary z-0 pointer-events-none rounded-full"
                />
                <span className="relative z-10 text-white group-hover:text-secondary font-bold text-base md:text-lg tracking-wide transition-colors duration-300">
                  View Packages
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Segment: Interactive Consultation Calendar */}
          <div className="relative w-full lg:h-full flex flex-col justify-center items-center lg:items-end lg:pb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-full max-w-md bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] overflow-hidden shadow-2xl relative group"
            >
              {/* Internal Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

              <div className="px-4 py-8 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase block mb-1">Schedule</span>
                    <h3 className="text-2xl font-black text-white tracking-tighter">Consultation</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-secondary transition-all"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-secondary transition-all"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 px-2">
                  <motion.span
                    key={currentMonth.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-white font-black tracking-widest text-sm"
                  >
                    {currentMonth.name} <span className="text-white/20">{currentMonth.year}</span>
                  </motion.span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(153,255,0,0.5)]" />
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Available Spots</span>
                  </div>
                </div>

                {/* Calendar Grid */}
                <motion.div
                  key={currentMonthIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-7 gap-2 mb-8"
                >
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="text-[10px] font-black text-white/20 text-center py-2 uppercase tracking-widest">{day}</div>
                  ))}
                  {currentMonth.days.map((day) => {
                    const isAvailable = currentMonth.availableDays.includes(day);
                    const isSelected = selectedDay === day;
                    return (
                      <motion.button
                        key={`${currentMonth.name}-${day}`}
                        whileHover={isAvailable ? { scale: 1.1 } : {}}
                        whileTap={isAvailable ? { scale: 0.95 } : {}}
                        onClick={() => isAvailable && setSelectedDay(day)}
                        className={`
                          h-10 rounded-md flex items-center justify-center text-xs font-bold transition-all duration-300 relative
                          ${isAvailable ? "cursor-pointer" : "opacity-20 cursor-default"}
                          ${isSelected
                            ? "bg-primary text-secondary shadow-[0_0_20px_rgba(153,255,0,0.3)]"
                            : isAvailable
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
                </motion.div>

                {/* Selection Footer */}
                <motion.button
                  animate={selectedDay ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.5 }}
                  className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3
                    ${selectedDay
                      ? "bg-primary text-secondary shadow-[0_0_30px_rgba(153,255,0,0.2)] hover:brightness-110"
                      : "bg-white/5 text-white/20 pointer-events-none"
                    }
                  `}
                >
                  <CalendarCheck size={18} strokeWidth={3} />
                  {selectedDay ? `Book ${currentMonth.name} ${selectedDay}` : 'Select a Date'}
                </motion.button>
              </div>

              {/* Decorative Scan Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
