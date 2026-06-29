/**
 * Design System - Main Export
 * 
 * Centralized export for all design tokens and utilities.
 */

// Core tokens
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './radius';
export * from './shadows';
export * from './breakpoints';
export * from './animation';

// Combined design system object
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';
import { shadows } from './shadows';
import { breakpoints } from './breakpoints';
import { animation } from './animation';

export const designSystem = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  breakpoints,
  animation,
} as const;

export default designSystem;
