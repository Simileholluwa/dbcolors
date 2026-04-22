"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VerifyErrorPage = () => {
  const searchParams = useSearchParams();
  const detail = searchParams.get("detail") || "The verification link is invalid or has expired.";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-6 relative overflow-hidden pt-[84px] min-h-[calc(100vh-84px)]">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20"
            >
              <XCircle className="text-red-400" size={40} />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4 leading-tight">
              Verification <span className="text-red-400 italic">Failed</span>
            </h1>

            <p className="text-white/40 text-sm md:text-base font-medium mb-10 leading-relaxed">
              {detail}
            </p>

            <div className="space-y-4">
              <Link
                href="/admin/login"
                className="group flex items-center justify-center gap-3 w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={18} />
                Try Signing In Again
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center gap-3 w-full py-4 text-white/30 hover:text-white transition-colors font-black text-[10px] uppercase tracking-widest"
              >
                <Home size={14} />
                Back to Safety
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyErrorPage;
