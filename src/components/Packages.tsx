"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, X, ArrowRight, ShoppingCart } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Luxe Living",
    price: "$2,500",
    description: "High-end residential living rooms with bespoke furniture and designer lighting.",
    features: ["Custom Layout", "Premium Furniture", "Lighting Design", "Color Consultation"],
    image: "/gallery/living-room.png",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Zen Workspace",
    price: "$1,800",
    description: "Minimalist home and corporate offices designed for productivity and calm.",
    features: ["Ergonomic Setup", "Acoustic Treatment", "Cable Management", "Custom Shelving"],
    image: "/gallery/office.png",
    color: "bg-zinc-200",
  },
  {
    id: 3,
    name: "Urban Kitchen",
    price: "$3,200",
    description: "Modern culinary spaces with integrated appliances and sophisticated finishes.",
    features: ["Cabinet Design", "Island Planning", "Appliance Selection", "Tile & Countertops"],
    image: "/gallery/kitchen.png",
    color: "bg-primary",
  },
  {
    id: 4,
    name: "Serene Suites",
    price: "$2,200",
    description: "Premium bedroom and bathroom designs focused on luxury and relaxation.",
    features: ["Wardrobe Design", "En-suite Planning", "Textile Selection", "Mood Lighting"],
    image: "/gallery/bedroom.png",
    color: "bg-zinc-200",
  },
  {
    id: 5,
    name: "Executive Lounge",
    price: "$4,500",
    description: "Corporate hospitality and relaxation areas designed for high-level meetings.",
    features: ["Bar Design", "Acoustic Panels", "Luxury Seating", "AV Integration"],
    image: "/gallery/office.png",
    color: "bg-primary",
  },
  {
    id: 6,
    name: "Artisanal Atelier",
    price: "$1,500",
    description: "Creative studios and niche spaces tailored for artists and creators.",
    features: ["Optimal Lighting", "Storage Solutions", "Workstation Design", "Color Grading"],
    image: "/gallery/hero.png",
    color: "bg-zinc-200",
  },
];

const Packages = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-transparent relative z-10" id="packages">
      <div className="container mx-auto px-6">
        {/* Refined Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight"
            >
              Curated Design <span className="text-primary italic">Packages</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group h-[580px] [perspective:1500px] cursor-pointer"
              onClick={() => toggleFlip(index)}
            >
              <motion.div
                animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full [transform-style:preserve-3d]"
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 [backface-visibility:hidden] h-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] overflow-hidden backdrop-blur-md group-hover:border-primary/40 transition-colors duration-500 p-4 flex flex-col shadow-2xl">
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-secondary/30 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1 group-hover:text-primary transition-colors">
                        {pkg.name}
                      </h3>
                      <span className="text-primary text-xl font-bold tracking-tight">{pkg.price}</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary group-hover:text-secondary transition-all">
                      <ArrowRight size={18} strokeWidth={3} />
                    </div>
                  </div>

                  <p className="text-white/50 text-base font-medium leading-relaxed mb-8 italic">
                    {pkg.description}
                  </p>

                  <div className="mt-auto flex gap-2 flex-wrap pb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                    {pkg.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[9px] uppercase tracking-widest font-bold text-white/40 border border-white/5">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] h-full bg-secondary border border-primary/30 rounded-[1.5rem] overflow-hidden p-4 flex flex-col shadow-[0_0_50px_rgba(153,255,0,0.1)]">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-primary font-black uppercase tracking-[0.3em] text-[8px] mb-1 block">Specifications</span>
                      <h3 className="text-2xl font-black text-white tracking-tighter">{pkg.name}</h3>
                    </div>
                    <div className="p-2 bg-white/5 rounded-full text-white/40">
                      <X size={14} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/70">
                        <div className="bg-primary/20 text-primary p-1 rounded-lg">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed mb-6 font-medium italic overflow-hidden line-clamp-4">
                    {pkg.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Investment</span>
                      <span className="text-primary text-xl font-black">{pkg.price}</span>
                    </div>
                    <button className="w-full bg-primary text-secondary py-3.5 rounded-xl font-black text-base tracking-tight flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(153,255,0,0.15)]">
                      <ShoppingCart size={18} strokeWidth={3} />
                      Begin Project
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
