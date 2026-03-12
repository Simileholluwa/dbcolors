import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Packages from "@/components/Packages";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* <Gallery />
      <Packages />
      <AboutUs />
      <Testimonials /> */}
      <FAQ />
      <Footer />
    </main>
  );
}
