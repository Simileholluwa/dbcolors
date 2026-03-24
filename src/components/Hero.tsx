"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent" id="hero">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-8 md:gap-12 lg:items-start pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-10 lg:pb-0">
          {/* Left Segment: Headline & Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center mb-8 lg:mb-0 lg:h-screen lg:sticky lg:top-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-4 md:mb-8">
              Transform Your <br />
              <span className="text-primary italic">Space</span>, Transform
              <br />
              Your Life
            </h1>

            <p className="text-md md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-4 md:mb-8 lg:mb-12 leading-relaxed font-medium">
              Elevate your living and working environments with bespoke interior designs
              that combine luxury, functionality, and timeless elegance.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 lg:mb-0 items-center justify-center lg:items-start lg:justify-start"
            >
              <motion.button
                onClick={scrollToPackages}
                whileHover="hover"
                whileTap="tap"
                className="group relative px-6 py-2 md:px-10 md:py-4 rounded-full border border-primary/50 backdrop-blur-md overflow-hidden flex items-center gap-3 md:gap-4 transition-all duration-500"
              >
                <motion.div
                  variants={{ hover: { scale: 1.5, opacity: 1 } }}
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
          <div className="relative w-full flex flex-col justify-center items-center lg:items-end lg:mb-0 lg:h-screen lg:sticky lg:top-0 ">
            <div
              className="w-full max-w-md bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700" />

              <div className="relative z-10">
                <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase block mb-6">Start Today</span>
                <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-8">
                  Ready to <br /><span className="text-primary italic">Transform?</span>
                </h2>

                <p className="text-white/50 text-base font-medium leading-relaxed mb-10 italic">
                  Book a discovery call or choose a signature package to begin your journey towards a more beautiful space.
                </p>

                <Link
                  href="/consultation"
                  className="w-full py-5 bg-primary text-secondary rounded-2xl font-black text-sm tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(153,255,0,0.2)] hover:shadow-[0_0_50px_rgba(153,255,0,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-3 group/btn hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Consultation
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight size={18} strokeWidth={3} />
                  </motion.div>
                </Link>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-secondary bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 overflow-hidden backdrop-blur-md">
                        <img
                          src={`https://i.pravatar.cc/150?u=${i + 10}`}
                          alt="User"
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">50+ Happy Clients</span>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-[80px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
