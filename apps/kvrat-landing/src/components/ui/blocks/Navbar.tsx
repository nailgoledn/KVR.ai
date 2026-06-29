'use client';

/**
 * Navbar Component
 * 
 * Main navigation bar for the landing page.
 * Sticky header with logo, nav links, and CTA.
 */

import React, { useState } from 'react';
import { Button } from '../primitives';
import { colors, spacing } from '@/src/design-system';

export interface NavbarProps {
  logo?: React.ReactNode;
  onCtaClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ logo, onCtaClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${spacing[4]} ${spacing[4]}`,
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: colors.black }}>
          {logo || 'KVRAT.ai'}
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: spacing[8],
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: colors.gray[600],
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 200ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.orange[500];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray[600];
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <Button variant="primary" size="sm" onClick={onCtaClick}>
          Get Started
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: spacing[2],
            marginLeft: spacing[4],
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: '2px',
                  backgroundColor: colors.gray[900],
                  width: '100%',
                  transition: 'all 200ms ease-out',
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[2],
            padding: spacing[4],
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: colors.gray[600],
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

Navbar.displayName = 'Navbar';
