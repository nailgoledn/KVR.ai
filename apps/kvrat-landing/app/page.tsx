'use client';

import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/sections/Hero";
import Features from "@/src/components/sections/Features";
import HowItWorks from "@/src/components/sections/HowItWorks";
import CTA from "@/src/components/sections/CTA";
import Footer from "@/src/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <Footer />
      </main>
    </>
  );
}