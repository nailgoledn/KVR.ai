/**
 * Badge Component
 * 
 * Compact label component for tags, statuses, and labels.
 */

import React from 'react';
import { colors, radiusPresets, spacing } from '@/src/design-system';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const getVariantColors = (variant: BadgeVariant) => {
  switch (variant) {
    case 'success':
      return { bg: '#D1FAE5', text: '#065F46' };
    case 'warning':
      return { bg: '#FEF3C7', text: '#92400E' };
    case 'error':
      return { bg: '#FEE2E2', text: '#991B1B' };
    case 'info':
      return { bg: '#DBEAFE', text: '#0C4A6E' };
    default:
      return { bg: colors.gray[100], text: colors.gray[700] };
  }
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', children, ...props }, ref) => {
    const { bg, text } = getVariantColors(variant);

    return (
      <span
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: `${spacing[1]} ${spacing[2.5]}`,
          backgroundColor: bg,
          color: text,
          fontSize: '12px',
          fontWeight: 500,
          borderRadius: radiusPresets.badge,
          whiteSpace: 'nowrap',
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
