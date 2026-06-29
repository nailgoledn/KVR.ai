'use client';

/**
 * Footer Component
 * 
 * Main footer with links, social media, and legal.
 */

import React from 'react';
import { Container, Divider } from '../primitives';
import { colors, spacing } from '@/src/design-system';

export interface FooterProps {
  columns?: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  legalLinks?: Array<{ label: string; href: string }>;
}

export const Footer: React.FC<FooterProps> = ({
  columns,
  legalLinks,
}) => {
  const defaultColumns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Community', href: '#' },
      ],
    },
  ];

  const footerColumns = columns || defaultColumns;

  return (
    <footer
      style={{
        backgroundColor: colors.black,
        color: colors.white,
        paddingTop: spacing[16],
        paddingBottom: spacing[8],
      }}
    >
      <Container size="xl">
        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing[8],
            marginBottom: spacing[12],
          }}
        >
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: spacing[4],
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: colors.gray[300],
                }}
              >
                {column.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {column.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: spacing[2] }}>
                    <a
                      href={link.href}
                      style={{
                        color: colors.gray[400],
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 200ms ease-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.white;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.gray[400];
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider style={{ backgroundColor: colors.gray[800], marginBottom: spacing[8] }} />

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: spacing[4],
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: colors.gray[400],
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} KVRAT.ai. All rights reserved.
          </p>

          {legalLinks && (
            <div style={{ display: 'flex', gap: spacing[6] }}>
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: '12px',
                    color: colors.gray[400],
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
};

Footer.displayName = 'Footer';
