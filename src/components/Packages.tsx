"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, X, ArrowRight, ShoppingCart } from "lucide-react";
import SectionHeader from "./SectionHeader";

const packages = [
  {
    id: 1,
    name: "Executive Parlour",
    price: "₦3.5M",
    description: "Transform your main parlour into a masterpiece with bespoke furniture and designer POP ceilings.",
    features: ["POP Ceiling Design", "Screeding & Painting", "Custom Furniture", "Lighting Fixtures"],
    image: "/gallery/living-room.png",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Pro Home Office",
    price: "₦1.8M",
    description: "Build a productive workspace that survives any power cut. Inverter-ready and distraction-free.",
    features: ["Inverter-Ready Setup", "Acoustic Padding", "Cable Management", "Ergonomic Desk"],
    image: "/gallery/office.png",
    color: "bg-zinc-200",
  },
  {
    id: 3,
    name: "Modern Island Kitchen",
    price: "₦5.2M",
    description: "Upgrade your kitchen with premium granite tops, heat extractors, and sophisticated cabinetry.",
    features: ["Granite Countertops", "Heat Extractor", "Kitchen Island", "Smart Storage"],
    image: "/gallery/kitchen.png",
    color: "bg-primary",
  },
  {
    id: 4,
    name: "Master Suite Haven",
    price: "₦2.8M",
    description: "The ultimate sanctuary. Featuring premium walk-in closets and luxury hotel-standard finishing.",
    features: ["Walk-in Closet", "En-suite Design", "Mood Lighting", "Wall Stucco"],
    image: "/gallery/bedroom.png",
    color: "bg-zinc-200",
  },
  {
    id: 5,
    name: "Corporate VIP Lounge",
    price: "₦7.5M",
    description: "Create a world-class impression for your clients. High-end finishing for offices and private lounges.",
    features: ["3D Wall Panels", "Luxury Seating", "AV Installation", "Mini Bar Setup"],
    image: "/gallery/office.png",
    color: "bg-primary",
  },
  {
    id: 6,
    name: "Content Creator Hub",
    price: "₦1.5M",
    description: "The perfect setup for your brand. Professional lighting and aesthetic backgrounds for high-quality shoots.",
    features: ["Ring Light Setup", "Dynamic Backdrops", "Sound Treatment", "Equipment Storage"],
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
        <SectionHeader
          whiteText="Curated Design"
          highlightText="Packages"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group h-[580px] [perspective:1500px] cursor-pointer md:last:odd:col-span-2 lg:last:odd:col-span-1 md:last:odd:max-w-md md:last:odd:mx-auto md:last:odd:w-full"
              onClick={() => toggleFlip(index)}
            >
              <motion.div
                animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full [transform-style:preserve-3d]"
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 [backface-visibility:hidden] h-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] overflow-hidden backdrop-blur-2xl group-hover:border-primary/40 transition-colors duration-500 p-4 flex flex-col shadow-2xl">
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
                    <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
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
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] h-full bg-white/[0.03] border border-primary/30 rounded-[1.5rem] backdrop-blur-2xl overflow-hidden p-4 flex flex-col shadow-[0_0_50px_rgba(153,255,0,0.1)]">
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
