"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const AboutUs = () => {

  return (
    <section className="py-16 md:py-24 bg-transparent overflow-hidden relative" id="about">
      {/* Section Header */}
      <div className="container mx-auto lg:w-full px-6 relative">
        <SectionHeader
          whiteText="The Archival"
          highlightText="Heritage"
        />

        <div className="relative">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-25 items-start">

            {/* The 5-Image Compact Bento Gallery - Taking 7 cols */}
            <div className="lg:col-span-7 relative z-10 lg:order-2">
              <div className="grid grid-cols-6 grid-rows-2 gap-3 md:gap-4 h-[350px] md:h-[400px] lg:h-[500px] lg:mt-0">

                {/* Image 1: Main Living (Top Left, wider) */}
                <div
                  className="relative col-span-4 row-span-1 rounded-xl overflow-hidden border border-white/10 group"
                >
                  <Image src="/gallery/interior-1.png" alt="Empty Luxury Living Room" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 left-4 z-30 flex flex-col gap-1">
                    <div className="w-6 h-[1px] bg-white/50" />
                    <div className="w-[1px] h-6 bg-white/50" />
                  </div>
                </div>

                {/* Image 2: Kitchen (Top Right) */}
                <div
                  className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden border border-white/10 group"
                >
                  <Image src="/gallery/interior-2.png" alt="Empty Modern Kitchen" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Image 3: Bedroom (Bottom Left) */}
                <div
                  className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden border border-white/10 group bg-secondary"
                >
                  <Image src="/gallery/interior-3.png" alt="Empty Premium Bedroom" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Image 4: Dining (Bottom Mid) */}
                <div
                  className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden border border-white/10 group bg-secondary"
                >
                  <Image src="/gallery/interior-4.png" alt="Empty Elegant Dining" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Image 5: Office (Bottom Right) */}
                <div
                  className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden border border-white/10 group bg-secondary"
                >
                  <Image src="/gallery/interior-5.png" alt="Empty Modern Office" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-3 right-3 z-30 opacity-60">
                    <span className="coordinate-marker text-[7px] tracking-[0.2em] md:text-[8px] md:tracking-[0.3em]">FIG. 05</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Narrative Card - Floating Glass Doc */}
            <div className="lg:col-span-5 relative z-40 lg:order-1">
              <div
                className="relative p-8 md:p-12 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl group"
              >


                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary" />
                    <span className="coordinate-marker text-white/40">Statement_v2.0</span>
                  </div>

                  <p className="text-white/80 text-xl md:text-2xl leading-tight font-light italic">
                    Since 2016, we've harmonized light, texture, and form to craft
                    <span className="text-white font-bold italic"> transcendent architectural spaces</span> that define bespoke luxury.
                  </p>

                  <div className="pt-8 grid grid-cols-2 gap-6 border-t border-white/5">
                    <div>
                      <span className="block text-[10px] text-primary font-black uppercase tracking-widest mb-1">Experience</span>
                      <span className="text-2xl font-black text-white">10+ yrs</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-primary font-black uppercase tracking-widest mb-1">Projects</span>
                      <span className="text-2xl font-black text-white">120+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
