'use client';

/**
 * FAQAccordion Component
 * 
 * Expandable FAQ section with accordion behavior.
 */

import React, { useState } from 'react';
import { Container } from '../primitives';
import { colors, spacing } from '@/src/design-system';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  title?: string;
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  title = 'Frequently Asked Questions',
  items,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: `${spacing[20]} ${spacing[4]}`,
      }}
    >
      <Container size="lg">
        {title && (
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: spacing[12],
              color: colors.black,
            }}
          >
            {title}
          </h2>
        )}

        <div style={{ maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                borderBottom: `1px solid ${colors.border}`,
                paddingTop: spacing[4],
                paddingBottom: spacing[4],
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: colors.black,
                    flex: 1,
                  }}
                >
                  {item.question}
                </h3>
                <span
                  style={{
                    fontSize: '20px',
                    color: colors.gray[400],
                    marginLeft: spacing[4],
                    transition: 'transform 200ms ease-out',
                    transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ↓
                </span>
              </button>

              {openIndex === idx && (
                <p
                  style={{
                    marginTop: spacing[4],
                    fontSize: '14px',
                    color: colors.gray[600],
                    lineHeight: 1.6,
                  }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

FAQAccordion.displayName = 'FAQAccordion';
