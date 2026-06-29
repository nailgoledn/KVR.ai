/**
 * Divider Component
 * 
 * Simple visual separator between sections.
 */

import React from 'react';
import { colors } from '@/src/design-system';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  vertical?: boolean;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ vertical = false, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        style={{
          border: 'none',
          backgroundColor: colors.border,
          width: vertical ? '1px' : '100%',
          height: vertical ? '100%' : '1px',
        }}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
