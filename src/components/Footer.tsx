"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Send, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { Icon: Instagram, href: "https://www.instagram.com/dbcolorsng/" },
    { Icon: Facebook, href: "https://web.facebook.com/dbcolorsng" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/dbcolors/" },
    { Icon: Youtube, href: "https://www.youtube.com/channel/UCk8Pwn3Rvj5jw1b0NsuzBqQ" },
  ];

  return (
    <footer className="bg-secondary text-white pt-12 md:pt-20 pb-12 overflow-hidden border-t border-white/10" id="footer">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="text-3xl font-black tracking-tighter mb-4 block">
              dbcolors<span className="text-primary">.ng</span>
            </Link>
            <p className="text-white/40 leading-relaxed mb-6 max-w-xs text-sm font-medium italic">
              Redefining interior spaces with excellence, innovation, and a touch of premium craftsmanship since 2009.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary hover:text-secondary hover:border-transparent transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-6 text-primary">Explore</h4>
            <ul className="space-y-3">
              {["Packages", "Gallery", "About Us", "Contact", "FAQ"].map((link) => (
                <li key={link}>
                  <Link href={`/#${link.toLowerCase().replace(" ", "-")}`} className="text-white/40 hover:text-white transition-colors text-sm font-bold tracking-tight">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-6 text-primary">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/40 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <MapPin size={14} />
                </div>
                <span className="text-sm font-bold tracking-tight">Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 group">
                <Link href="tel:08164221214" className="flex items-center gap-3 hover:text-white transition-colors">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm font-bold tracking-tight">+2348164221214</span>
                </Link>
              </li>
              <li className="flex flex-col gap-3">
                {[
                  "info@dbcolors.ng",
                  "projects@dbcolors.ng",
                  "events@dbcolors.ng"
                ].map((email) => (
                  <Link key={email} href={`mailto:${email}`} className="flex items-center gap-3 text-white/40 hover:text-white group transition-colors">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      <Mail size={14} />
                    </div>
                    <span className="text-sm font-bold tracking-tight">{email}</span>
                  </Link>
                ))}
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-6 text-primary">Newsletter</h4>
            <p className="text-white/40 mb-4 text-sm">Subscribe to receive the latest design tips and project updates.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors text-white"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-secondary p-3 rounded-xl hover:brightness-110 transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2026 dbcolors.ng. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Large background decorative text */}
      <div className="absolute bottom-0 right-0 translate-y-1/3 text-[17vw] font-black text-white/[0.04] pointer-events-none leading-none select-none">
        dbcolors.ng
      </div>
    </footer>
  );
};

export default Footer;
