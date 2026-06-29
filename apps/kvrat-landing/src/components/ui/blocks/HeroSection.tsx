'use client';

/**
 * HeroSection Component
 * 
 * Cinematic hero section with headline, subheadline, and CTA.
 * Stripe-level minimalist design.
 */

import React from 'react';
import { Button, Container } from '../primitives';
import { colors, spacing, typography } from '@/src/design-system';

export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subheadline,
  ctaText = 'Get Started',
  onCtaClick,
  backgroundImage,
}) => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Optional gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container size="xl">
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Headline */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 700,
              lineHeight: 1.1,
              color: colors.black,
              marginBottom: spacing[6],
              fontFamily: typography.fontFamily.grotesk,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: '20px',
              color: colors.gray[600],
              marginBottom: spacing[8],
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            {subheadline}
          </p>

          {/* CTA Button */}
          <Button size="lg" onClick={onCtaClick}>
            {ctaText}
          </Button>
        </div>
      </Container>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
