/**
 * Design System - Border Radius
 * 
 * OpenAI/ChatGPT aesthetic: Minimal corner radius.
 * Preference for sharp or very slightly rounded corners.
 */

export const radius = {
  none: '0px',
  sm: '0px',       // No rounding
  base: '4px',     // Very subtle rounding
  md: '4px',       // Subtle rounding
  lg: '4px',       // Subtle rounding
  xl: '6px',       // Light rounding
  '2xl': '8px',    // Slightly more rounded
  '3xl': '12px',   // Rounded (rare)
  full: '9999px',  // Pill shape
} as const;

// Preset border radius - Minimal approach
export const radiusPresets = {
  // Button radius (very subtle)
  button: radius.base,

  // Card radius (minimal)
  card: radius.base,

  // Input fields (minimal)
  input: radius.base,

  // Badges (slightly rounded)
  badge: radius.md,

  // Pills (fully rounded)
  pill: radius.full,

  // Dialog/Modal (subtle)
  dialog: radius.base,

  // Tooltip (minimal)
  tooltip: radius.none,
} as const;

export type Radius = typeof radius;
export type RadiusPresets = typeof radiusPresets;
