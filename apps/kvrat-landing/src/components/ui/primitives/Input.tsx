/**
 * Input Component
 * 
 * OpenAI/ChatGPT minimal: White background, black text, light gray border.
 * Accessible text input with minimal styling and subtle focus states.
 */

import React from 'react';
import { colors, radiusPresets, spacing, shadows } from '@/src/design-system';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5] }}>
        {label && (
          <label
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: colors.black,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            width: '100%',
            padding: `${spacing[3]} ${spacing[4]}`,
            fontSize: '16px',
            border: `1px solid ${error ? colors.semantic.error : colors.gray[200]}`,
            borderRadius: radiusPresets.input,
            backgroundColor: colors.white,
            color: colors.black,
            transition: `all 200ms ease-out`,
            outline: 'none',
          }}
          onFocus={(e) => {
            // Black border on focus (minimal)
            e.target.style.borderColor = error ? colors.semantic.error : colors.black;
            e.target.style.boxShadow = shadows.focus;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? colors.semantic.error : colors.gray[200];
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
        {error && (
          <span style={{ fontSize: '12px', color: colors.semantic.error }}>
            {error}
          </span>
        )}
        {helperText && !error && (
          <span style={{ fontSize: '12px', color: colors.gray[400] }}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
