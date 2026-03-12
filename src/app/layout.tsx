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
        {/* Persistent Global Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <Image
            src="/hero.png"
            alt="Premium Interior Design Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-secondary/85 backdrop-blur-[2px]" />
        </div>

        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
