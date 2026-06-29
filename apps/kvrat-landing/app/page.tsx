'use client';

import { useRouter } from 'next/navigation';
import { Navbar } from '@/src/components/ui/blocks';
import Hero from '@/src/components/sections/Hero';
import Features from '@/src/components/sections/Features';
import HowItWorks from '@/src/components/sections/HowItWorks';
import CTA from '@/src/components/sections/CTA';
import Footer from '@/src/components/sections/Footer';
import { colors } from '@/src/design-system';

export default function HomePage() {
  const router = useRouter();

  const handleNavbarCTA = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <Navbar
        logo="KVRAT.ai"
        onCtaClick={handleNavbarCTA}
      />

      <main
        style={{
          backgroundColor: colors.white,
          color: colors.black,
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