'use client';

import { useRouter } from 'next/navigation';
import { CTASection } from '../ui/blocks';
import { colors, spacing } from '@/src/design-system';

export default function CTA() {
  const router = useRouter();

  return (
    <section
      style={{
        margin: `${spacing[16]} ${spacing[4]}`,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: `${spacing[12]} ${spacing[8]}`,
          background: `linear-gradient(135deg, ${colors.black}, ${colors.gray[900]})`,
          borderRadius: '16px',
          textAlign: 'center',
          border: `1px solid ${colors.gray[800]}`,
        }}
      >
        <CTASection
          headline="Start Building with KVRAT.ai Today"
          subheadline="From concept to production-ready code. Leverage autonomous AI agents to transform your startup idea into reality—no coding required."
          ctaText="Generate Your Blueprint"
          onCtaClick={() => router.push('/dashboard')}
          variant="dark"
        />
      </div>
    </section>
  );
}
