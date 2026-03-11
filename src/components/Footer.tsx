"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="text-3xl font-black tracking-tighter mb-8 block">
              dbcolors<span className="text-primary">.ng</span>
            </Link>
            <p className="text-white/40 leading-relaxed mb-8 max-w-xs">
              Redefining interior spaces with excellence, innovation, and a touch of premium craftsmanship since 2009.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 italic">Quick Links</h4>
            <ul className="space-y-4">
              {["Products", "Solutions", "Enterprise", "Resources", "Pricing"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-white/40 hover:text-primary transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-8 italic">Contact</h4>
            <ul className="space-y-4 text-white/40">
              <li>Lagos, Nigeria</li>
              <li>+234 800 123 4567</li>
              <li>hello@dbcolors.ng</li>
              <li>info@dbcolors.ng</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-8 italic">Newsletter</h4>
            <p className="text-white/40 mb-6 text-sm">Subscribe to receive the latest design tips and project updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-secondary p-3 rounded-xl hover:brightness-110 transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2026 dbcolors.ng. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Large background decorative text */}
      <div className="absolute bottom-0 right-0 translate-y-1/3 text-[20vw] font-black text-white/[0.02] pointer-events-none leading-none select-none">
        EXCELLENCE
      </div>
    </footer>
  );
};

export default Footer;
