import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dbcolors.ng | Premium Interior Design",
  description: "Excellence in interior design for homes and offices.",
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
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
