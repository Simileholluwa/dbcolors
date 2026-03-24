import React from "react";
import { Clock, ShieldCheck } from "lucide-react";

export const EasterHero = () => {
  return (
    <section className="relative pt-30 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Easter Promotion 2026</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Transform Your <span className="text-primary italic">Sanctuary </span> This Easter
          </h1>

          <p className="text-white/40 text-md md:text-xl font-medium italic max-w-2xl mx-auto leading-relaxed">
            Exclusive, limited-time interior design and renovation packages tailored for modern living. Valid from March 20 – April 10, 2026.
          </p>
        </div>
      </div>
    </section>
  );
};
