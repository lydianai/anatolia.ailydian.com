/**
 * TÜRK DİJİTAL METROPOL - Elite Theme System
 *
 * Complete design token system - Turkish cultural premium design
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';
import { gradients } from './gradients';

export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  gradients,

  // Border Radius - Soft & Premium
  radius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    full: '9999px',
  },

  // Z-Index Layers
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    toast: 1500,
    tooltip: 1600,
    loading: 1700,
  },

  // Transitions - Smooth & Premium
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Breakpoints - Mobile First
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Blur - Glassmorphism
  blur: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '40px',
  },
} as const;

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './gradients';

export type Theme = typeof theme;
