import React from "react";
import { Metadata } from "next";
import EasterPromoView from "./EasterPromoView";
import { easterPackages } from "@/data/easterPromo";

export const metadata: Metadata = {
  title: "Easter Home Transformation Deals 2026 | dbcolors.ng",
  description: "Exclusive interior design and renovation packages for Easter. From kitchen transformations to full duplex renovations, bring luxury to your home this season.",
  openGraph: {
    title: "Easter Home Transformation Deals 2026 | dbcolors.ng",
    description: "Celebrate Easter with a home makeover. Special tiered packages for kitchens, living rooms, and full-scale renovations.",
    url: "https://dbcolors.ng/easter-promo",
    images: [
      {
        url: "/promo/easter/kitchen.png",
        width: 1200,
        height: 630,
        alt: "dbcolors.ng Easter Promotion",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easter Home Transformation Deals | dbcolors.ng",
    description: "Premium renovation deals starting this Easter. Explore our specialized packages.",
    images: ["/promo/easter/kitchen.png"],
  },
};

export default function EasterPromoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Easter Home Transformation Promotion",
    "provider": {
      "@type": "ProfessionalService",
      "name": "dbcolors.ng",
      "url": "https://dbcolors.ng"
    },
    "description": "Exclusive renovation and interior design packages for the Easter season.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Easter Promo Packages",
      "itemListElement": easterPackages.map((pkg, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": pkg.name,
          "description": pkg.outcome
        },
        "price": pkg.price,
        "priceCurrency": "NGN",
        "position": index + 1
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EasterPromoView />
    </>
  );
}
