/**
 * Button Component
 * 
 * OpenAI/ChatGPT minimal aesthetic: Black/white/gray only.
 * Fully reusable, accessible button with clean design.
 */

import React, { CSSProperties } from 'react';
import { colors, radiusPresets, spacing, animation } from '@/src/design-system';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

function getVariantStyles(variant: ButtonVariant): CSSProperties {
  switch (variant) {
    case 'primary':
      // Black button with white text
      return {
        backgroundColor: colors.black,
        color: colors.white,
        border: `1px solid ${colors.black}`,
      };
    case 'secondary':
      // White button with black text and light border
      return {
        backgroundColor: colors.white,
        color: colors.black,
        border: `1px solid ${colors.gray[200]}`,
      };
    case 'ghost':
      // Transparent button with black text
      return {
        backgroundColor: 'transparent',
        color: colors.black,
        border: `1px solid transparent`,
      };
    case 'danger':
      // Red button (semantic error only)
      return {
        backgroundColor: colors.semantic.error,
        color: colors.white,
        border: `1px solid ${colors.semantic.error}`,
      };
    default:
      return {};
  }
}

function getSizeStyles(size: ButtonSize): CSSProperties {
  switch (size) {
    case 'sm':
      return {
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: '12px',
        minHeight: '32px',
      };
    case 'md':
      return {
        padding: `${spacing[3]} ${spacing[4]}`,
        fontSize: '14px',
        minHeight: '40px',
      };
    case 'lg':
      return {
        padding: `${spacing[4]} ${spacing[6]}`,
        fontSize: '16px',
        minHeight: '48px',
      };
    default:
      return {};
  }
}

function SpinnerComponent({ size }: { size: 'sm' | 'md' }): React.ReactNode {
  const sizeMap = { sm: '16px', md: '24px' };
  return (
    <div
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `2px solid ${colors.gray[200]}`,
        borderTop: `2px solid ${colors.black}`,
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }}
    />
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={{
          ...getVariantStyles(variant),
          ...getSizeStyles(size),
          borderRadius: radiusPresets.button,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: `all ${animation.duration.fast}ms ${animation.easing.easeOut}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing[2],
          fontWeight: 500,
          opacity: disabled ? 0.5 : 1,
          whiteSpace: 'nowrap',
        }}
        {...props}
      >
        {isLoading ? <SpinnerComponent size="sm" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
