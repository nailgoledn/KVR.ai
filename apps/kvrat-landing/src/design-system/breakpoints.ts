/**
 * Design System - Breakpoints
 * 
 * Mobile-first responsive design breakpoints.
 * Aligned with Tailwind CSS defaults and industry standards.
 */

export const breakpoints = {
  // Mobile-first approach
  xs: '0px',       // Extra small (mobile)
  sm: '640px',     // Small (landscape phones)
  md: '768px',     // Medium (tablets)
  lg: '1024px',    // Large (desktops)
  xl: '1280px',    // Extra large (large desktops)
  '2xl': '1536px', // 2X Large (ultra-wide)
} as const;

// Container sizes for consistent layouts
export const containerSizes = {
  // Max widths for content containers
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  '2xl': '1320px',
  
  // Full width (with padding)
  full: '100%',
} as const;

// Media query helpers (for CSS-in-JS if needed)
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,

  // Max-width queries
  smMax: `(max-width: ${parseInt(breakpoints.sm) - 1}px)`,
  mdMax: `(max-width: ${parseInt(breakpoints.md) - 1}px)`,
  lgMax: `(max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  xlMax: `(max-width: ${parseInt(breakpoints.xl) - 1}px)`,
} as const;

export type Breakpoints = typeof breakpoints;
export type ContainerSizes = typeof containerSizes;
export type MediaQueries = typeof mediaQueries;
