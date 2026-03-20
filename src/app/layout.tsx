import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import Image from "next/image";
import "./globals.css";

import DraftingCanvas from "@/components/DraftingCanvas";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dbcolors.ng"),
  title: {
    default: "dbcolors.ng | Premium Interior Design & Architecture",
    template: "%s | dbcolors.ng",
  },
  description: "Bespoke interior design and architectural services in Nigeria. Since 2016, dbcolors.ng has been creating luxury residential and commercial spaces.",
  keywords: [
    "interior design Nigeria",
    "bespoke furniture Lagos",
    "office design Nigeria",
    "home renovation Nigeria",
    "luxury interiors Lagos",
    "architectural services Nigeria",
    "dbcolors",
    "residential design Lagos",
  ],
  authors: [{ name: "dbcolors.ng" }],
  creator: "dbcolors.ng",
  publisher: "dbcolors.ng",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "dbcolors.ng | Premium Interior Design & Architecture",
    description: "Creating transcendent architectural spaces that define bespoke luxury since 2016.",
    url: "https://dbcolors.ng",
    siteName: "dbcolors.ng",
    images: [
      {
        url: "/gallery/interior-1.png",
        width: 1200,
        height: 630,
        alt: "dbcolors.ng Premium Interior Design",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dbcolors.ng | Premium Interior Design & Architecture",
    description: "Creating transcendent architectural spaces that define bespoke luxury since 2016.",
    images: ["/gallery/interior-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: "dbcolors.ng",
    statusBarStyle: "black",
    capable: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "dbcolors.ng",
    image: "https://dbcolors.ng/gallery/interior-1.png",
    "@id": "https://dbcolors.ng",
    url: "https://dbcolors.ng",
    telephone: "+234000000000", // Placeholder, user should update
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lagos, Nigeria",
      addressLocality: "Lagos",
      addressRegion: "Lagos",
      postalCode: "100001",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.5244,
      longitude: 3.3792,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "09:00",
      closes: "18:00"
    },
    sameAs: [
      "https://www.instagram.com/dbcolors.ng",
      // Add other social links as needed
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${raleway.variable} antialiased font-raleway bg-secondary text-white relative`}
      >
        <DraftingCanvas />
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] mix-blend-screen"
          style={{
            backgroundImage: "url('/bg-house.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
