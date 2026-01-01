/**
 * TÜRK DİJİTAL METROPOL - Elite Shadow System
 *
 * Multi-layer realistic shadows - Apple & Spotify inspired
 */

export const shadows = {
  // Subtle Shadows
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Premium Shadows (Multi-layer)
  ottoman: '0 4px 20px rgba(212, 175, 55, 0.3), 0 2px 8px rgba(212, 175, 55, 0.2)', // Gold glow
  turkish: '0 4px 20px rgba(227, 10, 23, 0.3), 0 2px 8px rgba(227, 10, 23, 0.2)', // Red glow
  bosphorus: '0 4px 20px rgba(0, 151, 215, 0.3), 0 2px 8px rgba(0, 151, 215, 0.2)', // Blue glow
  cini: '0 4px 20px rgba(64, 224, 208, 0.3), 0 2px 8px rgba(64, 224, 208, 0.2)', // Turquoise glow

  // Glassmorphism Shadows
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  glassHeavy: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',

  // Inner Shadows
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  innerLg: 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',

  // No Shadow
  none: '0 0 #0000',

  // Special Effects
  neon: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
  glow: '0 0 20px rgba(255, 255, 255, 0.5)',
} as const;

export type Shadows = typeof shadows;
