"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden" id="cta">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-[1.5rem] p-8 md:p-20 relative overflow-hidden group">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
              Ready to <span className="text-primary italic">Transform</span> Your Space?
            </h2>
            <p className="text-lg md:text-2xl text-white/50 mb-10 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Join our elite clientele and experience the perfect blend of architectural precision and bespoke luxury.
            </p>

            <Link href="/consultation">
              <motion.button
                className="group relative px-6 py-3 md:px-12 md:py-6 rounded-full bg-primary text-secondary font-black text-sm md:text-xl tracking-wide transition-all duration-300 flex items-center gap-2 md:gap-4 mx-auto"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} strokeWidth={3} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Architectural datum line - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-px bg-white/20" />
        </div>
      </div>
    </section>
  );
};

export default CTA;
