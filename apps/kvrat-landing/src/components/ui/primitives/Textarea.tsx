/**
 * Textarea Component
 * 
 * Accessible textarea with consistent styling.
 */

import React from 'react';
import { colors, radiusPresets, spacing, shadows } from '@/src/design-system';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, ...props }, ref) => {
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
        <textarea
          ref={ref}
          style={{
            width: '100%',
            padding: `${spacing[3]} ${spacing[4]}`,
            fontSize: '16px',
            border: `1px solid ${error ? colors.semantic.error : colors.border}`,
            borderRadius: radiusPresets.input,
            backgroundColor: colors.input,
            color: colors.foreground,
            fontFamily: 'inherit',
            resize: 'vertical',
            transition: `all 200ms ease-out`,
            outline: 'none',
            minHeight: '120px',
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
        />
        {error && (
          <span style={{ fontSize: '12px', color: colors.semantic.error }}>
            {error}
          </span>
        )}
        {helperText && !error && (
          <span style={{ fontSize: '12px', color: colors.gray[500] }}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
