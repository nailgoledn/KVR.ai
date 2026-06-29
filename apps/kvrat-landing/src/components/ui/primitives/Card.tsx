/**
 * Card Component
 * 
 * OpenAI/ChatGPT minimal: White background, light gray border, no shadow.
 * Simple container with subtle styling.
 */

import React from 'react';
import { colors, radiusPresets, shadows, spacing } from '@/src/design-system';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bordered?: boolean;
  elevated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, bordered = true, elevated = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: colors.white,
          borderRadius: radiusPresets.card,
          border: bordered ? `1px solid ${colors.gray[200]}` : 'none',
          boxShadow: shadows.none,  // No shadows in OpenAI aesthetic
          padding: spacing[6],
          transition: `all 200ms ease-out`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
