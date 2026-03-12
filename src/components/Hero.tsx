"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden lg:items-center bg-transparent" id="hero">
      {/* Background elements moved to layout.tsx for global availability */}

      <div className="container mx-auto px-6 relative z-10 lg:pt-0 flex flex-col lg:flex-row items-center">
        <div className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-8 md:gap-12 items-center">
          {/* Left Segment: Headline & Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center pt-32 pb-12 lg:py-0 lg:h-auto">
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
                {/* Magnetic Hover Fill Effect */}
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

          {/* Right Segment: Intuitive Bento Journey Layout */}
          <div className="relative w-full lg:h-full flex flex-col justify-center items-center lg:items-end pb-12 md:pb-24 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:max-w-lg"
            >
              {/* Foundation Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="col-span-1 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-col justify-between"
              >
                <span className="text-xs text-primary uppercase tracking-widest font-bold">ESTABLISHED</span>
                <div className="mt-4">
                  <span className="text-3xl font-black text-white block">2016</span>
                </div>
              </motion.div>

              {/* Satisfaction Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="col-span-1 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-col justify-between"
              >
                <span className="text-xs text-primary uppercase tracking-widest font-bold">CUSTOMER SATISFACTION</span>
                <div className="mt-4">
                  <span className="text-3xl font-black text-white block">98%</span>
                </div>
              </motion.div>

              {/* Projects Card - Large */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-2 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md group hover:border-primary/50 transition-colors duration-500 overflow-hidden relative"
              >
                <div className="relative z-10">
                  <span className="text-sm text-primary uppercase tracking-[0.3em] font-bold mb-3 block">completed premium projects</span>
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">120+</span>
                  </div>
                </div>
                {/* Decorative architectural grid in background */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
              </motion.div>

              {/* Materials Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex items-center justify-between"
              >
                <div>
                  <span className="text-4xl font-black text-white block">350+</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-primary/80 uppercase tracking-[0.2em] font-bold block">Premium Materials</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] block mt-1 font-black">Sourced Globally</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
