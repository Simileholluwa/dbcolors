import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { easterPackages } from "@/data/easterPromo";

export const EasterPackages = () => {
  return (
    <section className="pt-10 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {easterPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group relative bg-white/[0.03] border border-white/10 rounded-[1.5rem] overflow-hidden hover:border-primary/30 transition-all backdrop-blur-md duration-500 shadow-2xl flex flex-col h-full"
            >
              {/* Package Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] via-white/[0.02]/20 to-transparent" />
                <div className="absolute bottom-6 left-4 md:left-8">
                  <span className="px-3 py-1 bg-primary text-secondary text-[9px] font-black uppercase tracking-widest rounded-full">
                    Level {index + 1}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-black tracking-tighter mb-2 group-hover:text-primary transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-primary text-xl font-bold tracking-tight">{pkg.price}</p>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Best For</p>
                  <p className="text-white/60 text-sm italic font-medium">{pkg.bestFor}</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Expectation</p>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-medium">
                        <Check size={14} className="text-primary mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/5 mt-auto">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Core Outcome</p>
                    <p className="text-white/40 text-xs italic font-medium leading-relaxed">{pkg.outcome}</p>
                  </div>

                  <Link
                    href={`/consultation?package=${encodeURIComponent(pkg.name)}&promo=easter2026`}
                    className="w-full bg-white/5 hover:bg-primary hover:text-secondary border border-white/10 hover:border-transparent py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    Begin Project
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
