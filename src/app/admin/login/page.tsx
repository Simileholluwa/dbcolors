"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/bookings");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md px-2 md:px-0"
      >
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-2">
              Admin <span className="text-primary italic">Portal</span>
            </h1>
            <p className="text-white/40 text-[10px] md:text-sm font-medium tracking-wide uppercase">Secure Personnel Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div className="space-y-1.5">
              <label className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 md:py-4 pl-11 md:pl-12 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all font-medium"
                  placeholder="admin@dbcolors.ng"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={16} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-2">Master Password</label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 md:py-4 pl-11 md:pl-12 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all font-medium"
                  placeholder="••••••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={16} />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-[9px] font-black text-center uppercase tracking-widest">{error}</p>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-primary text-secondary py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Authenticate Access
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
};

export default AdminLoginPage;
