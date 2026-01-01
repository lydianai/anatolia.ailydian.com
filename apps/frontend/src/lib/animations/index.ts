/**
 * ANIMATION LIBRARY - Central Export
 * Turkish Digital Metropol Elite Animation System
 */

// Variants
export * from "./variants";
export * from "./gestures";
export * from "./scroll-animations";

// Micro-interactions (selective export to avoid conflicts with variants)
export {
  microInteractions,
  buttonInteractions,
  cardInteractions,
  inputInteractions,
  iconInteractions,
  badgeInteractions,
  tooltipInteractions
} from "./micro-interactions";

// Import for presets
import {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleOut,
  scalePop,
  scaleHover,
  slideInLeft,
  slideInRight,
  slideInUp,
  slideInDown,
  staggerContainer,
  staggerFast,
  staggerSlow,
  crescentReveal,
  ottomanPattern,
  turkishFlag,
  modalBackdrop,
  modalContent,
  modalSlide,
  buttonHover,
  buttonPulse,
  buttonGlow,
  pageTransition,
  pageFade,
  skeletonPulse,
  spinnerRotate
} from "./variants";

// Animation presets for quick use
export const ANIMATION_PRESETS = {
  // Common patterns
  fadeInSlow: { ...fadeIn, transition: { duration: 0.8 } },
  fadeInFast: { ...fadeIn, transition: { duration: 0.2 } },
  scaleInBounce: { ...scaleIn, transition: { type: "spring", stiffness: 400, damping: 15 } },

  // Turkish-themed presets
  turkishEntrance: crescentReveal,
  ottomanReveal: ottomanPattern,

  // Page-specific
  heroAnimation: {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  },

  cardReveal: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  },
} as const;

// Animation timing constants
export const TIMING = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
  slowest: 1200,
} as const;

// Performance utilities
export const enableGPU = (element: HTMLElement) => {
  element.style.transform = "translateZ(0)";
  element.style.willChange = "transform, opacity";
};

export const disableGPU = (element: HTMLElement) => {
  element.style.willChange = "auto";
};

// Reduce motion support
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const getAnimationDuration = (baseDuration: number) => {
  return prefersReducedMotion() ? 0 : baseDuration;
};

// Turkish star path (for SVG animations)
export const TURKISH_STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

export const TURKISH_CRESCENT_PATH =
  "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";

// Animation ready status
let animationSystemReady = false;

export const initAnimationSystem = () => {
  if (animationSystemReady) return;

  console.log(
    "%c🎬 TURKISH DIGITAL METROPOL ANIMATION SYSTEM LOADED",
    "background: #dc2626; color: white; font-size: 16px; font-weight: bold; padding: 10px;"
  );
  console.log(
    "%c✨ 50+ Animation Variants | 🎮 Premium Micro-Interactions | 🚀 GPU Accelerated",
    "color: #fbbf24; font-size: 12px;"
  );

  animationSystemReady = true;
};

export const isAnimationSystemReady = () => animationSystemReady;
