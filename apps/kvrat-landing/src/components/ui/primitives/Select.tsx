/**
 * Select Component
 * 
 * Accessible dropdown select input.
 */

import React from 'react';
import { colors, radiusPresets, spacing, shadows } from '@/src/design-system';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, ...props }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5] }}>
        {label && (
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.gray[900],
            }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          style={{
            width: '100%',
            padding: `${spacing[3]} ${spacing[4]}`,
            fontSize: '16px',
            border: `1px solid ${error ? colors.semantic.error : colors.border}`,
            borderRadius: radiusPresets.input,
            backgroundColor: colors.input,
            color: colors.foreground,
            cursor: 'pointer',
            transition: `all 200ms ease-out`,
            outline: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '16px 12px',
            paddingRight: spacing[10],
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? colors.semantic.error : colors.orange[500];
            e.target.style.boxShadow = shadows.focus;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? colors.semantic.error : colors.border;
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span style={{ fontSize: '12px', color: colors.semantic.error }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
