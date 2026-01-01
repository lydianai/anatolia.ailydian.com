/**
 * TÜRK DİJİTAL METROPOL - Elite Gradient System
 *
 * Turkish cultural gradients - Sunset, Sea, Tulip Gardens
 */

export const gradients = {
  // Turkish Sunset (İstanbul Günbatımı)
  sunset: 'linear-gradient(135deg, #FF6B9D 0%, #D4AF37 50%, #E30A17 100%)',
  sunsetReverse: 'linear-gradient(135deg, #E30A17 0%, #D4AF37 50%, #FF6B9D 100%)',

  // Bosphorus Waters (Boğaz Suları)
  bosphorus: 'linear-gradient(135deg, #0097D7 0%, #40E0D0 100%)',
  bosphorusDeep: 'linear-gradient(180deg, #003D59 0%, #0097D7 100%)',

  // Ottoman Gold (Osmanlı Altını)
  ottoman: 'linear-gradient(135deg, #FFE799 0%, #D4AF37 50%, #8B720B 100%)',
  ottomanShine: 'linear-gradient(90deg, #D4AF37 0%, #FFF3CC 50%, #D4AF37 100%)',

  // Tulip Garden (Lale Bahçesi)
  tulip: 'linear-gradient(135deg, #FF6B9D 0%, #FF3397 50%, #CC5680 100%)',
  tulipField: 'linear-gradient(180deg, #FFE6F2 0%, #FF6B9D 100%)',

  // Aegean Sea (Ege Denizi)
  aegean: 'linear-gradient(135deg, #40E0D0 0%, #0097D7 50%, #005C86 100%)',

  // Olive Grove (Zeytin Bahçesi)
  olive: 'linear-gradient(135deg, #A3BD66 0%, #6B8E23 50%, #415615 100%)',

  // Cini Pattern (Çini Deseni)
  cini: 'linear-gradient(135deg, #40E0D0 0%, #0097D7 50%, #E30A17 100%)',

  // Turkish Flag (Bayrak)
  flag: 'linear-gradient(135deg, #E30A17 0%, #B60814 100%)',

  // Modern Premiums
  nightSky: 'linear-gradient(180deg, #0A0A0A 0%, #262626 100%)',
  silver: 'linear-gradient(135deg, #F5F5F5 0%, #D4D4D4 50%, #A3A3A3 100%)',
  gold: 'linear-gradient(135deg, #FFE799 0%, #D4AF37 100%)',

  // Glassmorphism
  glassLight: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  glassDark: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%)',

  // Mesh Gradients (Modern)
  mesh1: 'radial-gradient(at 40% 20%, #D4AF37 0px, transparent 50%), radial-gradient(at 80% 0%, #E30A17 0px, transparent 50%), radial-gradient(at 0% 50%, #0097D7 0px, transparent 50%)',
  mesh2: 'radial-gradient(at 0% 0%, #FF6B9D 0px, transparent 50%), radial-gradient(at 50% 0%, #40E0D0 0px, transparent 50%), radial-gradient(at 100% 0%, #D4AF37 0px, transparent 50%)',
} as const;

export type Gradients = typeof gradients;
