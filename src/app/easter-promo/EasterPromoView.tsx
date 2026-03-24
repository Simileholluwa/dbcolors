"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EasterHero } from "@/components/easter/EasterHero";
import { EasterPackages } from "@/components/easter/EasterPackages";
import { EasterTerms } from "@/components/easter/EasterTerms";

const EasterPromoView = () => {
  return (
    <main className="min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <EasterHero />
      <EasterPackages />
      <EasterTerms />
      <Footer />
    </main>
  );
};

export default EasterPromoView;
