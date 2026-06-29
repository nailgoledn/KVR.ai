/**
 * Checkbox Component
 * 
 * Accessible checkbox input.
 */

import React from 'react';
import { colors, radius, spacing } from '@/src/design-system';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          style={{
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            accentColor: colors.orange[500],
            borderRadius: radius.sm,
          }}
          {...props}
        />
        {label && (
          <span style={{ fontSize: '14px', color: colors.gray[900] }}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
