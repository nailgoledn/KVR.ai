'use client';

import { Container } from '../ui/primitives';
import { colors, spacing, typography } from '@/src/design-system';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Describe Your Idea",
      description: "Tell us what you want to build. Use plain language—no coding knowledge needed.",
    },
    {
      number: "02",
      title: "AI Processes Request",
      description: "Our autonomous agents analyze your requirements and create a complete technical blueprint.",
    },
    {
      number: "03",
      title: "Generate Full Stack",
      description: "Backend, frontend, database, API endpoints, and admin dashboard are generated automatically.",
    },
    {
      number: "04",
      title: "Ready to Launch",
      description: "Download production-ready code and deploy immediately, or iterate further with our platform.",
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: colors.gray[50],
        padding: `${spacing[16]} ${spacing[4]}`,
      }}
    >
      <Container size="xl">
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            fontSize: typography.fontSize['5xl'],
            fontWeight: 700,
            marginBottom: spacing[12],
            color: colors.black,
            fontFamily: typography.fontFamily.grotesk,
          }}
        >
          How KVRAT.ai Works
        </h2>

        {/* Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: spacing[6],
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: spacing[6],
                transition: 'all 200ms ease-out',
              }}
            >
              {/* Step Number */}
              <div
                style={{
                  fontSize: typography.fontSize['5xl'],
                  fontWeight: 700,
                  color: colors.orange[500],
                  marginBottom: spacing[4],
                  fontFamily: typography.fontFamily.grotesk,
                }}
              >
                {step.number}
              </div>

              {/* Step Title */}
              <h3
                style={{
                  fontSize: typography.fontSize.lg,
                  fontWeight: 600,
                  color: colors.black,
                  marginBottom: spacing[2],
                }}
              >
                {step.title}
              </h3>

              {/* Step Description */}
              <p
                style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.gray[600],
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}