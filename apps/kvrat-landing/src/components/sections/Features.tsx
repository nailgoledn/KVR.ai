'use client';

import { FeatureGrid } from '../ui/blocks';
import { colors, spacing } from '@/src/design-system';

export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: "AI Project Generator",
      description: "Convert your idea into a complete startup blueprint instantly.",
    },
    {
      icon: '🛠️',
      title: "Enterprise Backend",
      description: "Production-grade NestJS backend with scalable architecture.",
    },
    {
      icon: '🎨',
      title: "Modern Frontend",
      description: "Next.js web application with responsive, pixel-perfect UI.",
    },
    {
      icon: '📱',
      title: "Mobile App",
      description: "Cross-platform iOS and Android apps with React Native.",
    },
    {
      icon: '📊',
      title: "Admin Dashboard",
      description: "Complete management interface for control and analytics.",
    },
    {
      icon: '🔌',
      title: "REST API",
      description: "Fully functional, documented APIs ready for integration.",
    },
  ];

  return (
    <section
      id="features"
      style={{
        backgroundColor: colors.white,
        padding: `${spacing[16]} ${spacing[4]}`,
      }}
    >
      <FeatureGrid
        title="Why Choose KVRAT.ai?"
        features={features}
        cols={3}
      />
    </section>
  );
}