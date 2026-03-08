// src/lib/breakpoints.ts

/**
 * Single source of truth for breakpoint values.
 * Used by both Tailwind CSS config and JavaScript hooks.
 */

// Raw pixel values for breakpoints
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Breakpoints formatted for Tailwind CSS config
export const screens = {
  xs: `${breakpoints.xs}px`,
  sm: `${breakpoints.sm}px`,
  md: `${breakpoints.md}px`,
  lg: `${breakpoints.lg}px`,
  xl: `${breakpoints.xl}px`,
  '2xl': `${breakpoints['2xl']}px`,
};
