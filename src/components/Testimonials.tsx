"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner, Lagos",
    text: "Working with dbcolors.ng was a dream. They transformed my outdated living room into a modern sanctuary that I proud to call home.",
    rating: 5,
  },
  {
    name: "Michael Chen",
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
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-zinc-50 overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Client <span className="text-secondary italic">Feedback</span>
          </motion.h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 text-zinc-200 z-0">
            <Quote size={120} />
          </div>

          <div className="relative z-10 bg-white border border-zinc-100 p-10 md:p-16 rounded-[3rem] shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex gap-1 mb-6 text-primary">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-secondary/80 leading-relaxed italic mb-10">
                  "{testimonials[currentIndex].text}"
                </p>

                <div>
                  <h4 className="text-xl font-bold text-secondary">{testimonials[currentIndex].name}</h4>
                  <p className="text-secondary/40 font-medium">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-12">
              <button 
                onClick={prev}
                className="p-4 rounded-full border border-zinc-200 hover:bg-secondary hover:text-primary transition-all active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={next}
                className="p-4 rounded-full border border-zinc-200 hover:bg-secondary hover:text-primary transition-all active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
