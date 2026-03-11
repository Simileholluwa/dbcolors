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
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Frequently Asked <span className="text-secondary italic">Questions</span>
          </motion.h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-zinc-100 rounded-3xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
              >
                <span className="text-lg md:text-xl font-bold text-secondary">
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all ${activeIndex === index ? "bg-primary text-secondary" : "bg-white text-secondary/40"}`}>
                  {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 md:p-8 pt-0 text-secondary/60 leading-relaxed border-t border-zinc-100/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
