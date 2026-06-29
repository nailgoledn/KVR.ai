/**
 * Design System - Animation & Transitions
 * 
 * Micro-interactions using Framer Motion.
 * Subtle, performant animations for enterprise SaaS feel.
 */

export const animation = {
  // Duration presets (ms)
  duration: {
    instant: 0,
    fast: 150,
    base: 200,
    normal: 300,
    slow: 500,
    slower: 750,
    slowest: 1000,
  },

  // Easing functions
  easing: {
    // Standard cubic beziers
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Custom smooth easings
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    swift: 'cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Delay presets (ms)
  delay: {
    0: 0,
    25: 25,
    50: 50,
    75: 75,
    100: 100,
    150: 150,
    200: 200,
  },
} as const;

// Framer Motion variants for common interactions
export const motionVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: animation.duration.base },
  },

  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: animation.duration.base },
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: animation.duration.base },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: animation.duration.base },
  },

  // Slide animations
  slideInRight: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: animation.duration.base },
  },

  slideInLeft: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: animation.duration.base },
  },

  // Container animations
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: animation.duration.fast / 1000,
        delayChildren: animation.delay[0] / 1000,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: animation.duration.base },
    },
  },

  // Hover animations
  buttonHover: {
    scale: 1.02,
    transition: { duration: animation.duration.fast },
  },

  buttonTap: {
    scale: 0.98,
    transition: { duration: animation.duration.fast },
  },
} as const;

export type Animation = typeof animation;
export type MotionVariants = typeof motionVariants;
