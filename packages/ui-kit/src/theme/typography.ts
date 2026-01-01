/**
 * TÜRK DİJİTAL METROPOL - Elite Typography System
 *
 * Türkçe karakter optimizasyonu ile premium tipografi
 */

export const typography = {
  // Font Families - Turkish Character Optimized
  fontFamily: {
    heading: '"Montserrat", "Segoe UI", system-ui, -apple-system, sans-serif',
    body: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    display: '"Playfair Display", Georgia, serif',
    mono: '"JetBrains Mono", "Monaco", "Menlo", monospace',
    turkish: '"Noto Sans Turkish", "Segoe UI", sans-serif',
  },

  // Font Sizes - Responsive Scale
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }], // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
    '8xl': ['6rem', { lineHeight: '1' }], // 96px
    '9xl': ['8rem', { lineHeight: '1' }], // 128px
  },

  // Font Weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// Turkish Text Utilities
export const turkishText = {
  // Turkish uppercase helper (handles İ/i correctly)
  toUpperCase: (text: string): string => {
    return text
      .replace(/i/g, 'İ')
      .replace(/ı/g, 'I')
      .toUpperCase();
  },

  // Turkish lowercase helper
  toLowerCase: (text: string): string => {
    return text
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .toLowerCase();
  },

  // Turkish title case
  toTitleCase: (text: string): string => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => turkishText.toUpperCase(word.charAt(0)) + word.slice(1))
      .join(' ');
  },
};

export type Typography = typeof typography;
