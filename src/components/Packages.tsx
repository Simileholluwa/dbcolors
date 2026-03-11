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
    image: "/gallery/hero-room.jpg",
    color: "bg-zinc-200",
  },
];

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);

  return (
    <section className="py-24 bg-secondary text-white overflow-hidden" id="packages">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Design <span className="text-primary italic">Packages</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Choose a curated package that fits your space and ambition. 
            All packages include professional consultation and 3D visualizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-start gap-6 hover:border-primary/50 transition-all group relative"
            >
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-2">
                <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-primary text-secondary px-3 py-1 rounded-full text-xs font-bold">
                  {pkg.price}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold">{pkg.name}</h3>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                {pkg.description}
              </p>

              <button 
                onClick={() => setSelectedPackage(pkg)}
                className="flex items-center gap-2 text-primary font-bold group/btn"
              >
                View Details <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-zinc-900 border border-white/10 w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <Image src={selectedPackage.image} alt={selectedPackage.name} fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl font-bold mb-2">{selectedPackage.name}</h3>
                    <p className="text-primary text-2xl font-bold">{selectedPackage.price}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPackage(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <p className="text-white/70 leading-relaxed">
                  {selectedPackage.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-bold text-white/40 uppercase tracking-widest text-xs">Included Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPackage.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="bg-primary/20 text-primary p-1 rounded-md">
                          <Check size={14} />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8 flex gap-4">
                  <button className="flex-1 bg-primary text-secondary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all">
                    <ShoppingCart size={20} /> Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Packages;
