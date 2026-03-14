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
  title: "dbcolors.ng | Premium Interior Design",
  description: "Excellence in interior design for homes and offices.",
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
  return (
    <html lang="en">
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
