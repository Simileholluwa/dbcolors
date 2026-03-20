"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  whiteText: string;
  highlightText: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  whiteText,
  highlightText,
  className = "",
}) => {
  return (
    <div className={`mb-8 flex flex-col items-center text-center ${className}`}>
      <div className="mx-auto">
        <h2
          className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight"
        >
          {whiteText} <span className="text-primary italic">{highlightText}</span>
        </h2>
        <div
          className="flex items-center justify-center gap-4 mt-4 mx-auto"
        >
          <div
            className="h-[1px] w-[150px] bg-gradient-to-r from-transparent to-white/20"
          />
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-2 h-2 bg-primary shadow-[0_0_15px_rgba(153,255,0,0.5)]"
          />
          <div
            className="h-[1px] w-[150px] bg-gradient-to-l from-transparent to-white/20"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
