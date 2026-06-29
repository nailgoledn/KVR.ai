/**
 * Design System - Colors
 * 
 * OpenAI/ChatGPT-inspired minimal color palette.
 * Pure white background, pure black text, light gray borders and accents.
 * No colorful gradients - clean, premium, professional.
 */

// Core Neutrals - OpenAI Aesthetic (White/Black/Gray system only)
export const colors = {
  // Neutrals - Foundation (pure white/black)
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray Scale - Light mode optimized
  // Subtle progression from pure white to near-black
  gray: {
    50: '#FAFAFA',   // Almost white - barely visible
    100: '#F5F5F5',  // Lightest usable gray
    150: '#EEEEEE',  // Light backgrounds
    200: '#E5E5E5',  // Light borders (primary border color)
    300: '#D3D3D3',  // Subtle dividers
    400: '#A0A0A0',  // Secondary text
    500: '#666666',  // Mid gray
    600: '#404040',  // Dark gray
    700: '#262626',  // Darker gray
    800: '#171717',  // Very dark
    900: '#0A0A0A',  // Almost black
  },

  // Accent - Minimal, used sparingly (replaced orange/blue with neutral)
  // Keep only for error/success states and critical actions
  orange: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D3D3D3',
    400: '#A0A0A0',
    500: '#000000',  // Convert to black for minimal aesthetic
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000',
  },

  blue: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D3D3D3',
    400: '#A0A0A0',
    500: '#000000',  // Convert to black for minimal aesthetic
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000',
  },

  // Semantic Colors - Only for status indicators
  semantic: {
    success: '#22C55E',  // Kept for status
    warning: '#EAB308',  // Kept for warnings
    error: '#EF4444',    // Kept for errors
    info: '#6B7280',     // Muted gray for info
  },

  // Functional Colors - Minimalist
  background: '#FFFFFF',     // Pure white
  foreground: '#000000',     // Pure black
  muted: '#F5F5F5',          // Subtle gray background
  'muted-foreground': '#666666',  // Medium gray text
  border: '#E5E5E5',         // Light gray borders (critical)
  input: '#FFFFFF',          // White input backgrounds with light border
  ring: '#000000',           // Black focus rings
  
  // Dark mode disabled - light only
  dark: {
    background: '#FFFFFF',
    foreground: '#000000',
    muted: '#F5F5F5',
    'muted-foreground': '#666666',
    border: '#E5E5E5',
    input: '#FFFFFF',
    card: '#FFFFFF',
  },
} as const;

// Color aliases - Minimal approach
export const colorAliases = {
  primary: colors.black,           // Pure black for primary actions
  secondary: colors.gray[600],     // Dark gray for secondary
  accent: colors.black,            // Black accents
  neutral: colors.gray[400],       // Mid gray for neutral text
  success: colors.semantic.success,
  warning: colors.semantic.warning,
  error: colors.semantic.error,
  info: colors.semantic.info,
} as const;

export type Colors = typeof colors;
export type ColorAliases = typeof colorAliases;
