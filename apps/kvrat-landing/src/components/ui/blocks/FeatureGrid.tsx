'use client';

/**
 * FeatureGrid Component
 * 
 * Responsive grid layout for feature cards.
 */

import React from 'react';
import { Card, Container } from '../primitives';
import { colors, spacing } from '@/src/design-system';

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

export interface FeatureGridProps {
  features: Feature[];
  cols?: 2 | 3 | 4;
  title?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  cols = 3,
}) => {
  const gridColsMap = {
    2: 'repeat(auto-fit, minmax(300px, 1fr))',
    3: 'repeat(auto-fit, minmax(250px, 1fr))',
    4: 'repeat(auto-fit, minmax(200px, 1fr))',
  };

  return (
    <section
      style={{
        backgroundColor: colors.gray[50],
        padding: `${spacing[20]} ${spacing[4]}`,
      }}
    >
      <Container size="xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridColsMap[cols],
            gap: spacing[6],
          }}
        >
          {features.map((feature, idx) => (
            <Card key={idx} bordered elevated={false}>
              {feature.icon && (
                <div
                  style={{
                    fontSize: '40px',
                    marginBottom: spacing[4],
                  }}
                >
                  {feature.icon}
                </div>
              )}
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: spacing[2],
                  color: colors.black,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: colors.gray[600],
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </p>
              {feature.link && (
                <a
                  href={feature.link}
                  style={{
                    display: 'inline-block',
                    marginTop: spacing[4],
                    color: colors.orange[500],
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Learn more →
                </a>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

FeatureGrid.displayName = 'FeatureGrid';
