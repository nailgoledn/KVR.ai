/**
 * Design System - Shadows
 * 
 * OpenAI/ChatGPT aesthetic: Almost no shadows.
 * Only extremely subtle shadows for elevation, if needed.
 * Focus on borders instead of shadows.
 */

export const shadows = {
  // Minimal/No shadows - OpenAI style
  none: 'none',
  sm: 'none',                    // No shadow
  base: 'none',                  // No shadow
  md: 'none',                    // No shadow
  lg: 'none',                    // No shadow
  xl: 'none',                    // No shadow
  '2xl': 'none',                 // No shadow

  // Inner shadows (not used)
  inner: 'none',

  // Focus shadows - Ultra subtle (almost invisible)
  focus: '0 0 0 2px #FFFFFF, 0 0 0 3px #000000',  // Black outline only
  'focus-blue': '0 0 0 2px #FFFFFF, 0 0 0 3px #000000',  // Black outline
} as const;

// Shadow presets - Minimal approach
export const shadowPresets = {
  // Cards and containers - Use borders instead of shadows
  cardHover: 'none',
  cardDefault: 'none',

  // Buttons - No shadow
  buttonHover: 'none',

  // Dropdowns and popovers - Ultra subtle gray border
  popup: 'none',

  // Modals and dialogs - Black border
  modal: 'none',

  // Focus states - Black outline only
  focus: '0 0 0 2px #FFFFFF, 0 0 0 3px #000000',
} as const;

export type Shadows = typeof shadows;
export type ShadowPresets = typeof shadowPresets;
