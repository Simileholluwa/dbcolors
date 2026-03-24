"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none">
      {/* Background track (optional, very subtle) */}
      <div className="absolute inset-0 bg-primary/10" />
      
      {/* Animated Progress Bar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ 
          x: ["-100%", "-30%", "-10%", "0%"],
          opacity: [1, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          times: [0, 0.6, 0.9, 1],
          ease: "circOut",
        }}
        className="h-full bg-primary shadow-[0_0_10px_rgba(153,255,0,0.5)]"
      />
      
      {/* Scanning Gloss Effect */}
      <motion.div
        animate={{ x: "100%" }}
        initial={{ x: "-100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
      />
    </div>
  );
}
