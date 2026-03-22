"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Menu, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Don't show the dashboard layout on the login page
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">Authenticating...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row bg-black min-h-screen relative overflow-hidden text-white">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-6 border-b border-white/5 bg-secondary/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black italic">
            DB
          </div>
          <span className="text-sm font-black uppercase tracking-widest">Portal</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white/60 hover:text-primary transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block sticky top-0 h-screen z-40 w-64">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-secondary z-[70] md:hidden shadow-2xl"
            >
              <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 relative z-10 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
