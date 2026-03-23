"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { useAdminStats } from "@/hooks/useAdminStats";

const DashboardPage = () => {
  const { stats, isLoading, error } = useAdminStats();

  const cards = [
    { name: "Total Sessions", value: stats.totalBookings, icon: Calendar, color: "text-primary" },
    { name: "Upcoming", value: stats.upcomingBookings, icon: Clock, color: "text-blue-400" },
    { name: "Unique Clients", value: stats.recentClients, icon: Users, color: "text-purple-400" },
    { name: "Growth Rate", value: "+12%", icon: TrendingUp, color: "text-green-400" },
  ];

  return (
    <div className="p-6 md:p-12">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 text-white">
          Dashboard <span className="text-primary italic">Overview</span>
        </h1>
        <p className="text-white/40 text-xs md:text-sm font-medium tracking-wide">Welcome back to the administrative control center.</p>
      </header>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-8 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, index) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${card.color}`}>
                <card.icon size={20} />
              </div>
              <ArrowUpRight className="text-white/10 group-hover:text-primary transition-colors" size={16} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{card.name}</p>
            <h3 className="text-3xl font-black tracking-tighter text-white">
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : card.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {/* Placeholder for activity feed */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold">New Consultation Booked</p>
                  <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
            <Calendar className="text-primary" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Keep Growing</h3>
          <p className="text-sm text-white/40 mb-8 max-w-[200px]">Your portfolio is expanding. Check your bookings to manage sessions.</p>
          <button className="px-8 py-4 bg-primary text-secondary font-black text-xs uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all">
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
