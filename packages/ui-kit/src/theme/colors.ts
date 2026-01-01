/**
 * TÜRK DİJİTAL METROPOL - Elite Color System
 *
 * Osmanlı saraylarının ihtişamı, Boğaz'ın mavisi, lale bahçelerinin renkleri
 * Apple'ın minimalizmi ile buluşuyor
 */

export const colors = {
  // Ottoman Gold - Osmanlı Altını (Topkapı Sarayı'ndan esinlenildi)
  ottoman: {
    50: '#FFF9E6',
    100: '#FFF3CC',
    200: '#FFE799',
    300: '#FFDB66',
    400: '#FFCF33',
    500: '#D4AF37', // Primary Ottoman Gold
    600: '#B8960F',
    700: '#8B720B',
    800: '#5E4D08',
    900: '#312804',
  },

  // Turkish Red - Türk Kırmızısı (Bayrak ve Çini motiflerinden)
  turkish: {
    50: '#FFE6E6',
    100: '#FFCCCC',
    200: '#FF9999',
    300: '#FF6666',
    400: '#FF3333',
    500: '#E30A17', // Primary Turkish Red
    600: '#B60814',
    800: '#5C0409',
    900: '#2E0205',
  },

  // Bosphorus Blue - Boğaz Mavisi (İstanbul Boğazı)
  bosphorus: {
    50: '#E6F7FF',
    100: '#CCF0FF',
    200: '#99E0FF',
    300: '#66D1FF',
    400: '#33C1FF',
    500: '#0097D7', // Primary Bosphorus Blue
    600: '#007AB2',
    700: '#005C86',
    800: '#003D59',
    900: '#001F2D',
  },

  // Tulip Pink - Lale Pembesi (Osmanlı lale dönemi)
  tulip: {
    50: '#FFE6F2',
    100: '#FFCCE5',
    200: '#FF99CB',
    300: '#FF66B1',
    400: '#FF3397',
    500: '#FF6B9D', // Primary Tulip Pink
    600: '#CC5680',
    700: '#994063',
    800: '#662B46',
    900: '#331529',
  },

  // Olive Green - Zeytin Yeşili (Ege ve Akdeniz)
  olive: {
    50: '#F0F4E6',
    100: '#E0E9CC',
    200: '#C2D399',
    300: '#A3BD66',
    400: '#85A733',
    500: '#6B8E23', // Primary Olive Green
    600: '#56721C',
    700: '#415615',
    800: '#2B390E',
    900: '#161D07',
  },

  // Cini Turquoise - Çini Turkuazı (İznik çinileri)
  cini: {
    50: '#E6FFFC',
    100: '#CCFFF9',
    200: '#99FFF3',
    300: '#66FFED',
    400: '#33FFE7',
    500: '#40E0D0', // Primary Cini Turquoise
    600: '#33B3A6',
    700: '#26867D',
    800: '#1A5A53',
    900: '#0D2D2A',
  },

  // Neutral Grays - Modern Premium
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },

  // Semantic Colors
  semantic: {
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6', // Blue
  },

  // Glassmorphism Support
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    heavy: 'rgba(255, 255, 255, 0.3)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

export type ColorScale = typeof colors;
