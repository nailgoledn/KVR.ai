'use client';

/**
 * CTASection Component
 * 
 * Call-to-action section with headline and button.
 */

import React from 'react';
import { Button, Container } from '../primitives';
import { colors, spacing } from '@/src/design-system';

export interface CTASectionProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  variant?: 'dark' | 'light';
}

export const CTASection: React.FC<CTASectionProps> = ({
  headline,
  subheadline,
  ctaText = 'Get Started Now',
  onCtaClick,
  variant = 'dark',
}) => {
  const isDark = variant === 'dark';

  return (
    <section
      style={{
        backgroundColor: isDark ? colors.black : colors.orange[50],
        color: isDark ? colors.white : colors.black,
        padding: `${spacing[20]} ${spacing[4]}`,
      }}
    >
      <Container size="xl">
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 700,
              marginBottom: spacing[4],
              color: isDark ? colors.white : colors.black,
            }}
          >
            {headline}
          </h2>

          {subheadline && (
            <p
              style={{
                fontSize: '18px',
                marginBottom: spacing[8],
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: isDark ? colors.gray[300] : colors.gray[600],
              }}
            >
              {subheadline}
            </p>
          )}

          <Button
            variant={isDark ? 'primary' : 'primary'}
            size="lg"
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>
        </div>
      </Container>
    </section>
  );
};

CTASection.displayName = 'CTASection';
