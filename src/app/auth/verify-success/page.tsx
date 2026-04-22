"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VerifySuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden pt-[84px] min-h-[calc(100vh-84px)]">
        {/* Background elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/20"
            >
              <CheckCircle2 className="text-primary" size={40} />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4 leading-tight">
              Email <span className="text-primary italic">Verified</span>
            </h1>

            <p className="text-white/40 text-sm md:text-base font-medium mb-10 leading-relaxed">
              Your identity has been confirmed. You now have full access to your personalized dashboard and tools.
            </p>

            <div className="space-y-4">
              <Link
                href="/"
                className="group flex items-center justify-center gap-3 w-full bg-primary text-secondary py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(153,255,0,0.15)]"
              >
                Sign In to Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-4 text-white/30 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifySuccessPage;
