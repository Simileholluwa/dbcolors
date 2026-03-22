"use client";

import React from "react";
import { Settings, Shield, Bell, User } from "lucide-react";

const SettingsPage = () => {
  const sections = [
    { title: "Profile Settings", icon: User, desc: "Manage your administrative profile and public info." },
    { title: "Security", icon: Shield, desc: "Configure multi-factor authentication and passwords." },
    { title: "Notifications", icon: Bell, desc: "Manage automated email reminders and alerts." },
  ];

  return (
    <div className="p-8 md:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter mb-2">
          System <span className="text-primary italic">Settings</span>
        </h1>
        <p className="text-white/40 font-medium tracking-wide">Configure your administrative workspace environment.</p>
      </header>

      <div className="max-w-3xl space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group flex items-start gap-6">
            <div className="p-4 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-secondary transition-all">
              <section.icon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{section.title}</h3>
              <p className="text-sm text-white/40 mb-4">{section.desc}</p>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-primary transition-colors cursor-not-allowed">
                Coming Soon &bull; Phase 2
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
