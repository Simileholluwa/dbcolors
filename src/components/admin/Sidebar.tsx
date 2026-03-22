"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { motion } from "framer-motion";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  const { logout, user } = useAdminAuth();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Bookings", icon: Calendar, href: "/admin/bookings" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <aside className="w-full h-full bg-secondary border-r border-white/5 flex flex-col">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="text-primary" size={18} />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Admin</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Portal v1.0</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-xl transition-all group
                  ${isActive 
                    ? "bg-primary text-secondary shadow-[0_0_20px_rgba(153,255,0,0.15)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active-indicator">
                    <ChevronRight size={14} />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/5">
        <div className="mb-6">
          <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Authenticated as</p>
          <p className="text-[10px] font-bold text-white/60 truncate">{user?.email}</p>
        </div>
        <button
          onClick={() => {
            logout();
            onClose?.();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all text-xs font-black uppercase tracking-widest"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
