"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is your typical design process?",
    answer: "Our process begins with an initial consultation where we discuss your vision, budget, and timeline. This is followed by a conceptual design phase, 3D visualizations, and finally, the implementation and project management of the design.",
  },
  {
    question: "Do you offer both residential and commercial services?",
    answer: "Yes, we specialize in both home and office interiors. Our expertise allows us to create warm, personal residential spaces as well as professional, high-impact corporate environments.",
  },
  {
    question: "How long does a typical project take to complete?",
    answer: "Project timelines vary significantly based on scope. A single room transformation may take 4-6 weeks, while a full commercial or residential project can range from 3 to 6 months.",
  },
  {
    question: "Can I customize the design packages listed on your site?",
    answer: "Absolutely! The packages listed are curated starting points. We can customize any package to meet your specific needs, site requirements, and personal preferences.",
  },
  {
    question: "Do you provide overseas or remote consultations?",
    answer: "Yes, we offer virtual design consultations and can provide digital design packages (mood boards, 2D/3D plans) for clients regardless of their location.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-transparent relative z-10" id="faq">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-8">
          {/* ... existing header logic ... */}
          <div className="mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight"
            >
              Frequently Asked <span className="text-primary italic">Questions</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mt-4 mx-auto"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "150px" }}
                transition={{ duration: 1, ease: "circOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent to-white/20"
              />
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-2 h-2 bg-primary shadow-[0_0_15px_rgba(153,255,0,0.5)]"
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "150px" }}
                transition={{ duration: 1, ease: "circOut" }}
                className="h-[1px] bg-gradient-to-l from-transparent to-white/20"
              />
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div
                className={`h-full border transition-all duration-500 rounded-[1.5rem] overflow-hidden flex flex-col
                  ${activeIndex === index
                    ? "bg-secondary/40 border-primary/30 shadow-[0_0_30px_rgba(153,255,0,0.1)]"
                    : "bg-white/[0.03] border-white/10 backdrop-blur-sm hover:border-white/20"
                  }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full h-full flex flex-col p-8 text-left transition-colors relative z-10"
                >
                  <div className="flex items-start justify-between w-full gap-4">
                    <span className={`text-xl md:text-2xl font-black tracking-tight leading-tight transition-colors duration-300
                      ${activeIndex === index ? "text-primary" : "text-white group-hover:text-primary"}`}
                    >
                      {faq.question}
                    </span>
                    <div className={`shrink-0 p-3 rounded-2xl transition-all duration-500 
                      ${activeIndex === index ? "bg-primary text-secondary rotate-180" : "bg-white/5 text-white/40 group-hover:text-white"}`}>
                      {activeIndex === index ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      >
                        <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Decorative architectural grid element for hover */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
