"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeader from "./SectionHeader";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner, Lagos",
    text: "Working with dbcolors.ng was a dream. They transformed my outdated living room into a modern sanctuary that I'm proud to call home.",
    rating: 5,
  },
  {
    name: "Michael Adewale",
    role: "CEO, Tech Hub",
    text: "The office design they provided perfectly balances professionalism with creative energy. Our team loves the new workspace!",
    rating: 5,
  },
  {
    name: "Aisha Bello",
    role: "Interior Enthusiast",
    text: "Attention to detail and excellence in execution. They really listened to our needs and delivered beyond our expectations.",
    rating: 5,
  },
  {
    name: "David Okoro",
    role: "Real Estate Developer",
    text: "Their ability to translate complex architectural requirements into stunning interior realities is unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Chidinma Blessing",
    role: "House Agent",
    text: "dbcolors understands the relationship between light, space, and texture. A true partner for high-end residential projects.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-switch testimonials with interaction reset
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex, isHovered]); // Reset interval whenever index changes or hover state changes

  const handleManualSwitch = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Standardized Header */}
          <SectionHeader
            whiteText="Client"
            highlightText="Testimonials"
          />

          <div className="relative">
            {/* Massive Static Quote Marker */}
            <div className="absolute -top-20 -left-10 text-white/5 pointer-events-none">
              <Quote size={280} />
            </div>

            <div
              className="relative z-10 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[1.5rem] shadow-2xl overflow-hidden min-h-[420px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ x: "100%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ x: "-100%", opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center"
                >
                  {/* Internal Decorative Gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                  <div className="relative z-10">
                    <div className="flex gap-1 mb-8">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" className="text-primary" />
                      ))}
                    </div>

                    <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight tracking-tight mb-12 max-w-4xl">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    <div className="flex items-center gap-6 mt-auto">
                      <div className="w-12 h-1 bg-primary/40 rounded-full" />
                      <div>
                        <h4 className="text-xl font-bold text-white tracking-tight">{testimonials[currentIndex].name}</h4>
                        <p className="text-white/40 font-mono text-xs uppercase tracking-widest">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Architectural Footer Accent & Progress */}
            <div className="absolute -bottom-16 right-0 left-0 flex flex-col items-center gap-6">
              <div className="flex gap-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleManualSwitch(i)}
                    className={`h-1 transition-all duration-700 rounded-full ${i === currentIndex ? "w-16 bg-primary" : "w-3 bg-white/10 hover:bg-white/20"}`}
                  />
                ))}
              </div>
              <div className="flex gap-1 items-center opacity-20">
                <div className="w-12 h-px bg-white" />
                <span className="text-[10px] text-white font-mono tracking-widest uppercase italic font-bold">The Collective</span>
                <div className="w-12 h-px bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
