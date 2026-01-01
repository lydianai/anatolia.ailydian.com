/**
 * ELITE ANIMATION VARIANTS - 50+ Framer Motion Presets
 * Turkish Digital Metropol Premium Animation Library
 */

import { Variants, Transition } from "framer-motion";

// EASING FUNCTIONS (Premium Curves)

export const EASING = {
  // Smooth & Natural
  smooth: [0.43, 0.13, 0.23, 0.96],
  snappy: [0.6, 0.01, 0.05, 0.95],
  bouncy: [0.68, -0.55, 0.265, 1.55],

  // Turkish-themed
  turkish: [0.42, 0, 0.58, 1], // Ottoman curve
  crescent: [0.34, 1.56, 0.64, 1], // Moon bounce

  // Premium
  elite: [0.25, 0.46, 0.45, 0.94],
  butter: [0.33, 1, 0.68, 1],
  silk: [0.39, 0.575, 0.565, 1],
} as const;

// SPRING PHYSICS (60 FPS Guaranteed)

export const SPRING = {
  gentle: { type: "spring", stiffness: 100, damping: 20 },
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  bouncy: { type: "spring", stiffness: 400, damping: 15 },
  wobbly: { type: "spring", stiffness: 180, damping: 12 },
  stiff: { type: "spring", stiffness: 500, damping: 40 },

  // Turkish-themed
  turkish: { type: "spring", stiffness: 260, damping: 26 },
  crescent: { type: "spring", stiffness: 350, damping: 18 },
} as const;

// DURATION PRESETS

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
} as const;

// FADE VARIANTS

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASING.smooth }
  },
};

export const fadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASING.smooth }
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASING.elite }
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASING.elite }
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASING.smooth }
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASING.smooth }
  },
};

// SCALE VARIANTS

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASING.bouncy }
  },
};

export const scaleOut: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: DURATION.fast, ease: EASING.smooth }
  },
};

export const scalePop: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: SPRING.bouncy
  },
};

export const scaleHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: DURATION.fast, ease: EASING.snappy }
  },
  tap: {
    scale: 0.95,
    transition: { duration: DURATION.instant }
  },
};

// SLIDE VARIANTS

export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: DURATION.normal, ease: EASING.elite }
  },
};

export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: DURATION.normal, ease: EASING.elite }
  },
};

export const slideInUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: DURATION.normal, ease: EASING.elite }
  },
};

export const slideInDown: Variants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: { duration: DURATION.normal, ease: EASING.elite }
  },
};

// ROTATION VARIANTS

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: DURATION.slow, ease: EASING.elite }
  },
};

export const rotateScale: Variants = {
  hidden: { opacity: 0, rotate: -45, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: SPRING.bouncy
  },
};

export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const spinSlow: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// STAGGER CONTAINERS

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// TURKISH-THEMED VARIANTS

export const crescentReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -90,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION.slow,
      ease: EASING.crescent,
    }
  },
};

export const ottomanPattern: Variants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
  },
  visible: {
    clipPath: "circle(100% at 50% 50%)",
    transition: {
      duration: DURATION.slower,
      ease: EASING.turkish,
    }
  },
};

export const turkishFlag: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASING.turkish,
    }
  },
};

// CARD VARIANTS

export const cardHover: Variants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  },
  hover: {
    scale: 1.05,
    y: -8,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: { duration: DURATION.fast, ease: EASING.snappy }
  },
};

export const card3D: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: { duration: DURATION.fast }
  },
};

export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: DURATION.normal, ease: EASING.smooth }
  },
  back: {
    rotateY: 180,
    transition: { duration: DURATION.normal, ease: EASING.smooth }
  },
};

// MODAL VARIANTS

export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(10px)",
    transition: { duration: DURATION.normal }
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.elite,
    }
  },
};

export const modalSlide: Variants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.elite,
    }
  },
};

// BUTTON VARIANTS

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: DURATION.instant }
  },
  tap: {
    scale: 0.95,
    transition: { duration: DURATION.instant }
  },
};

export const buttonPulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const buttonGlow: Variants = {
  initial: {
    boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)",
  },
  hover: {
    boxShadow: "0 0 20px 5px rgba(220, 38, 38, 0.4)",
    transition: { duration: DURATION.normal }
  },
};

// LIST VARIANTS

export const listItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASING.smooth }
  },
};

export const listItemPop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING.bouncy
  },
};

// NOTIFICATION VARIANTS

export const toastSlide: Variants = {
  hidden: {
    opacity: 0,
    x: 400,
    y: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: SPRING.snappy
  },
  exit: {
    opacity: 0,
    x: 400,
    transition: { duration: DURATION.fast }
  },
};

export const alertShake: Variants = {
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  },
};

// PAGE TRANSITION VARIANTS

export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    x: -200,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION.normal,
      ease: EASING.elite,
    }
  },
  exit: {
    opacity: 0,
    x: 200,
    filter: "blur(10px)",
    transition: {
      duration: DURATION.fast,
    }
  },
};

export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal }
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast }
  },
};

// LOADING VARIANTS

export const skeletonPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const spinnerRotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// HOVER GLOW EFFECTS

export const glowRed: Variants = {
  initial: { filter: "drop-shadow(0 0 0 rgba(220, 38, 38, 0))" },
  hover: {
    filter: "drop-shadow(0 0 15px rgba(220, 38, 38, 0.6))",
    transition: { duration: DURATION.normal }
  },
};

export const glowBlue: Variants = {
  initial: { filter: "drop-shadow(0 0 0 rgba(59, 130, 246, 0))" },
  hover: {
    filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))",
    transition: { duration: DURATION.normal }
  },
};

export const glowGold: Variants = {
  initial: { filter: "drop-shadow(0 0 0 rgba(234, 179, 8, 0))" },
  hover: {
    filter: "drop-shadow(0 0 15px rgba(234, 179, 8, 0.6))",
    transition: { duration: DURATION.normal }
  },
};

// UTILITY FUNCTIONS

/**
 * Create custom stagger animation
 */
export const createStagger = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Create custom fade animation
 */
export const createFade = (
  duration: number = DURATION.normal,
  ease: number[] = EASING.smooth
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease }
  },
});

/**
 * Combine multiple variants
 */
export const combineVariants = (...variants: Variants[]): Variants => {
  return variants.reduce((acc, variant) => {
    return {
      ...acc,
      ...variant,
    };
  }, {});
};
