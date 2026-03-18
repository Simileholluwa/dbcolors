"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Video, MapPin, Ruler, Layout, Square, ShoppingBag, FileText, Box, Play, Globe } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";

const consultationPackages = [
  {
    name: "Design Discovery",
    price: "Free",
    description: "The perfect starting point to discuss your vision and explore possibilities.",
    features: [
      { text: "30-minute virtual call", icon: <Video className="w-4 h-4" /> },
    ],
    cta: "Book Discovery Call",
    highlight: false,
  },
  {
    name: "Signature Transformation",
    price: "750,000",
    currency: "₦",
    description: "A professional foundation for your space with comprehensive planning and technical details.",
    features: [
      { text: "30-minute virtual call", icon: <Video className="w-4 h-4" /> },
      { text: "Site inspection", icon: <MapPin className="w-4 h-4" /> },
      { text: "Measurements & estimates", icon: <Ruler className="w-4 h-4" /> },
      { text: "Space layout & optimization", icon: <Layout className="w-4 h-4" /> },
      { text: "2D visualization", icon: <Square className="w-4 h-4" /> },
      { text: "Shopping list", icon: <ShoppingBag className="w-4 h-4" /> },
      { text: "Invoice for procurement", icon: <FileText className="w-4 h-4" /> },
    ],
    cta: "Start Transformation",
    highlight: true,
  },
  {
    name: "Elite Visionary",
    price: "1,500,000",
    currency: "₦",
    description: "The ultimate design experience with immersive visualizations and end-to-end support.",
    features: [
      { text: "30-minute virtual call", icon: <Video className="w-4 h-4" /> },
      { text: "Site inspection", icon: <MapPin className="w-4 h-4" /> },
      { text: "Measurements & estimates", icon: <Ruler className="w-4 h-4" /> },
      { text: "Space layout & optimization", icon: <Layout className="w-4 h-4" /> },
      { text: "2D visualization", icon: <Square className="w-4 h-4" /> },
      { text: "Shopping list", icon: <ShoppingBag className="w-4 h-4" /> },
      { text: "Invoice for procurement", icon: <FileText className="w-4 h-4" /> },
      { text: "3D visualization (HD)", icon: <Box className="w-4 h-4" /> },
      { text: "3D animation walk-through", icon: <Play className="w-4 h-4" /> },
      { text: "Full product sourcing", icon: <Globe className="w-4 h-4" /> },
    ],
    cta: "Go Elite",
    highlight: false,
  },
];

const ConsultationView = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 md:pt-48 md:pb-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <SectionHeader
              whiteText="Choose Your"
              highlightText="Consultation"
            />
            <p
              className="text-md md:text-lg text-white/50 font-medium leading-relaxed"
            >
              Tailored design expertise to bring your architectural dreams to life. Select the tier that matches your project's scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:items-stretch md:items-center">
            {consultationPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`flex flex-col relative group h-full rounded-[1.5rem] border transition-all duration-500 p-8 md:p-10 backdrop-blur-2xl overflow-hidden
                  ${idx === 2 ? "md:col-span-2 lg:col-span-1 md:max-w-md md:w-full md:mx-auto lg:max-w-none lg:mx-0" : ""}
                  ${pkg.highlight
                    ? "bg-white/[0.05] border-primary/30 shadow-[0_0_50px_rgba(153,255,0,0.1)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }
                `}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 px-6 py-2 bg-primary text-secondary font-black text-[10px] uppercase tracking-widest rounded-bl-2xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-2 uppercase">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    {pkg.currency && <span className="text-lg font-bold text-white/40">{pkg.currency}</span>}
                    <span className="text-4xl md:text-5xl font-black text-primary tracking-tighter">{pkg.price}</span>
                  </div>
                </div>

                <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 italic">
                  {pkg.description}
                </p>

                <div className="space-y-4 mb-10 flex-grow">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-2">Package Includes</span>
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-white/70 group/item">
                      <div className={`p-2 rounded-lg transition-colors duration-300
                        ${pkg.highlight ? "bg-primary/20 text-primary" : "bg-white/5 text-white/40 group-hover/item:text-primary group-hover/item:bg-primary/10"}
                      `}>
                        {feature.icon}
                      </div>
                      <span className="text-sm font-bold tracking-tight">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn
                  ${pkg.highlight
                    ? "bg-primary text-secondary shadow-[0_0_30px_rgba(153,255,0,0.2)] hover:brightness-110"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-primary/50"
                  }
                `}>
                  {pkg.cta}
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Decorative architectural datum line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            ))}
          </div>

          {/* Requirements Section */}
          <div
            className="mt-24 md:mt-32 max-w-5xl mx-auto backdrop-blur-2xl border border-white/5 bg-white/[0.05] rounded-[1.5rem] p-8 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex flex-col md:flex-row gap-12 md:items-center">
              <div className="md:w-1/3">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-4">Mandatory</span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">
                  Required <br /><span className="text-primary italic">Assets</span>
                </h2>
                <p className="text-white/60 text-base font-medium leading-relaxed italic">
                  To ensure the highest precision in our consultation, please prepare the following items regardless of your selected package.
                </p>
              </div>

              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                {[
                  { title: "Visual Media", desc: "Clear photos and videos of the current space from multiple angles.", icon: <Box className="w-5 h-5" /> },
                  { title: "Architectural Drawings", desc: "Original blueprints or architectural plans (if available).", icon: <Square className="w-5 h-5" /> },
                  { title: "Floor Layout", desc: "Existing furniture arrangement or floor layout (if available).", icon: <Layout className="w-5 h-5" /> },
                  { title: "Personal Preferences", desc: "Inspiration images, mood boards, or text-based design goals.", icon: <Check className="w-5 h-5" /> },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4 group/item">
                    <div className="flex items-center gap-4">
                      <div className="text-primary p-2 bg-primary/10 rounded-lg group-hover/item:bg-primary group-hover/item:text-secondary transition-all duration-300">
                        {item.icon}
                      </div>
                      <h4 className="text-white font-black uppercase text-[12px] tracking-[0.2em]">{item.title}</h4>
                    </div>
                    <p className="text-white/50 text-sm font-medium leading-relaxed group-hover/item:text-white/80 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-20 text-center"
          >
            <Link href="/" className="text-white/30 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              <span className="rotate-180"><ArrowRight size={12} /></span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ConsultationView;
