'use client';

import { Container, Divider } from '../ui/primitives';
import { colors, spacing } from '@/src/design-system';

export default function Footer() {
  const footerLinks = [
    { label: 'الرئيسية', href: '#' },
    { label: 'المنتجات', href: '#' },
    { label: 'عن المنصة', href: '#' },
    { label: 'تواصل', href: '#' },
  ];

  return (
    <footer
      style={{
        backgroundColor: colors.black,
        color: colors.gray[400],
        marginTop: spacing[20],
      }}
    >
      <Container size="xl">
        <div style={{ paddingTop: spacing[12], paddingBottom: spacing[12] }}>
          {/* Logo */}
          <div style={{ marginBottom: spacing[6], fontSize: '20px', color: colors.white, fontWeight: 600 }}>
            KVRAT.ai
          </div>

          {/* Description */}
          <p style={{ marginBottom: spacing[6], lineHeight: 1.8, maxWidth: '500px', color: colors.gray[400] }}>
            منصة ذكية لتحويل الأفكار إلى منتجات رقمية باستخدام الذكاء الاصطناعي
          </p>

          <Divider style={{ backgroundColor: colors.gray[800], marginBottom: spacing[8] }} />

          {/* Links */}
          <div style={{ display: 'flex', gap: spacing[8], justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            {footerLinks.map((link) => (
              <a
                key={link.label}
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
            ))}
          </div>

          <Divider style={{ backgroundColor: colors.gray[800], marginTop: spacing[8], marginBottom: spacing[8] }} />

          {/* Copyright */}
          <div style={{ fontSize: '12px', color: colors.gray[500], textAlign: 'center' }}>
            © {new Date().getFullYear()} KVRAT.ai - All rights reserved
          </div>
        </div>
      </Container>
    </footer>
  );
}