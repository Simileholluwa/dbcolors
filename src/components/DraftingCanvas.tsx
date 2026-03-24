"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DraftingCanvas = () => {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Diverse parallax layers
  const ySlow = useTransform(scrollY, [0, 5000], [0, -100]);
  const yMid = useTransform(scrollY, [0, 5000], [0, -300]);
  const yFast = useTransform(scrollY, [0, 5000], [0, -500]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-black">
      {/* 1. Atmospheric Pulse Base - Much Brighter */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(153,255,0,0.15)_0%,transparent_70%)]"
      />

      {/* 2. Deep Monolithic Volumes (Parallax Layer) - More Opacity */}
      <motion.div style={{ y: ySlow }} className="absolute inset-0">
        <div className="absolute top-[10%] left-[-10%] w-[60%] h-[40%] bg-white/[0.08] blur-[120px] rounded-full rotate-12" />
        <div className="absolute bottom-[20%] right-[-5%] w-[50%] h-[30%] bg-primary/[0.1] blur-[100px] rounded-full -rotate-12" />
      </motion.div>

      {/* 3. Glassmorphic Radial Refractions (Scanning Light) - High Visibility */}
      <motion.div
        animate={{
          x: ["-30%", "130%", "-30%"],
          y: ["-30%", "130%", "-30%"],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: ["130%", "-30%", "130%"],
          y: ["130%", "-30%", "130%"],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(153,255,0,0.25)_0%,transparent_70%)] rounded-full blur-[80px]"
      />

      {/* 4. Precision Grid (Static) - More defined */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:100px_100px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* 5. Tactical Texture (Film Grain Overlay) */}
      <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none bg-[url('/noise.svg')]" />
    </div>
  );
};

export default DraftingCanvas;
