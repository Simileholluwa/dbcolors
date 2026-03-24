import React, { Suspense } from "react";
import { Metadata } from "next";
import ConsultationView from "./ConsultationView";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Schedule a professional interior design consultation with dbcolors.ng. We offer tiered packages from concept brainstorming to full-scale architectural planning.",
  openGraph: {
    title: "Interior Design Consultation | dbcolors.ng",
    description: "Tailored design expertise to bring your architectural dreams to life. Select a consultation tier that matches your project scope.",
    url: "https://dbcolors.ng/consultation",
    images: [
      {
        url: "/gallery/interior-1.png",
        width: 1200,
        height: 630,
        alt: "dbcolors.ng Consultation Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Consultation | dbcolors.ng",
    description: "Book your professional design consultation today.",
    images: ["/gallery/interior-1.png"],
  },
};

export default function ConsultationPage() {
  return (
    <Suspense fallback={null}>
      <ConsultationView />
    </Suspense>
  );
}
