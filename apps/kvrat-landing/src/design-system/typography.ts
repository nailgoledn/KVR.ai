/**
 * Design System - Typography
 * 
 * Font hierarchy and styling rules.
 * Fonts: Inter (body), Plus Jakarta Sans (secondary), Space Grotesk (headings)
 */

export const typography = {
  // Font families
  fontFamily: {
    inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    jakarta:
      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    grotesk:
      "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace",
  },

  // Font sizes
  fontSize: {
    xs: '12px',    // 0.75rem
    sm: '14px',    // 0.875rem
    base: '16px',  // 1rem
    lg: '18px',    // 1.125rem
    xl: '20px',    // 1.25rem
    '2xl': '24px', // 1.5rem
    '3xl': '30px', // 1.875rem
    '4xl': '36px', // 2.25rem
    '5xl': '48px', // 3rem
    '6xl': '60px', // 3.75rem
    '7xl': '72px', // 4.5rem
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Typography presets - ready to use
export const typographyPresets = {
  // Headings
  h1: {
    fontSize: typography.fontSize['7xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    fontFamily: typography.fontFamily.grotesk,
    letterSpacing: typography.letterSpacing.tight,
  },

  h2: {
    fontSize: typography.fontSize['6xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    fontFamily: typography.fontFamily.grotesk,
    letterSpacing: typography.letterSpacing.tight,
  },

  h3: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.snug,
    fontFamily: typography.fontFamily.grotesk,
    letterSpacing: typography.letterSpacing.tight,
  },

  h4: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.snug,
    fontFamily: typography.fontFamily.grotesk,
  },

  h5: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    fontFamily: typography.fontFamily.grotesk,
  },

  h6: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
    fontFamily: typography.fontFamily.jakarta,
  },

  // Body text
  bodyLg: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.relaxed,
    fontFamily: typography.fontFamily.inter,
  },

  bodyMd: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.relaxed,
    fontFamily: typography.fontFamily.inter,
  },

  bodySm: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    fontFamily: typography.fontFamily.inter,
  },

  bodyXs: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    fontFamily: typography.fontFamily.inter,
  },

  // Labels and UI
  labelMd: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    fontFamily: typography.fontFamily.inter,
  },

  labelSm: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    fontFamily: typography.fontFamily.inter,
  },

  // Special - Display text
  display: {
    fontSize: typography.fontSize['7xl'],
    fontWeight: typography.fontWeight.black,
    lineHeight: typography.lineHeight.tight,
    fontFamily: typography.fontFamily.grotesk,
    letterSpacing: typography.letterSpacing.tighter,
  },

  // Code/Monospace
  mono: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    fontFamily: "'Fira Code', 'Monaco', monospace",
  },
} as const;

export type Typography = typeof typography;
export type TypographyPresets = typeof typographyPresets;
