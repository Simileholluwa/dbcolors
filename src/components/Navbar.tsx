"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "Packages", href: "packages" },
    { name: "FAQs", href: "faq" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Track Hero, Packages, FAQ, CTA, and Footer
    ["hero", "packages", "faq", "cta", "footer"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/20 backdrop-blur-sm" : "bg-transparent backdrop-blur-none"
        }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo - Left */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white shrink-0 relative z-10">
          dbcolors<span className="text-primary">.ng</span>
        </Link>

        {/* Links - Absolute Center */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm font-bold transition-all tracking-widest uppercase relative group ${activeSection === link.href ? "text-primary" : "text-white/40 hover:text-white"
                }`}
            >
              {link.name}
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA - Right */}
        <div className="flex items-center gap-4 relative z-10">
          <button className="hidden md:block bg-primary text-secondary px-6 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 active:scale-95 transition-all">
            Schedule a Consultation
          </button>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10 p-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-2xl font-black tracking-tighter text-left transition-colors ${activeSection === link.href ? "text-primary" : "text-white/60"
                  }`}
              >
                {link.name}
              </button>
            ))}
            <button className="bg-primary text-secondary px-6 py-4 rounded-xl text-lg font-bold mt-2">
              Schedule a Consultation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
