import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { easterPackages } from "@/data/easterPromo";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const EasterPackages = () => {
  return (
    <section className="pt-10 md:py-20 text-white">
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                  <div className="flex gap-2">
                    <Link
                      href={`/consultation?package=${encodeURIComponent(pkg.name)}&promo=easter2026`}
                      className="flex-1 bg-white/5 hover:bg-primary hover:text-secondary border border-white/10 hover:border-transparent py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Book Consultation
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href={`https://wa.me/2347041123790?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} Easter Promo package.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/20 hover:border-transparent p-4 rounded-2xl transition-all flex items-center justify-center group/wa"
                      title="Contact on WhatsApp"
                    >
                      <WhatsAppIcon className="w-5 h-5 transition-transform group-hover/wa:scale-110" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
