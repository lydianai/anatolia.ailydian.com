/**
 * MICRO-INTERACTIONS - Button, Input, UI Element Animations
 * Premium interactions for Turkish Digital Metropol
 */

import { Variants } from "framer-motion";
import { DURATION, EASING, SPRING } from "./variants";

// BUTTON MICRO-INTERACTIONS

export const buttonInteractions = {
  // Standard hover/tap
  standard: {
    initial: { scale: 1 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: DURATION.instant },
  },

  // Ripple effect (CSS-based trigger)
  ripple: {
    whileTap: {
      boxShadow: [
        "0 0 0 0 rgba(220, 38, 38, 0.4)",
        "0 0 0 10px rgba(220, 38, 38, 0.2)",
        "0 0 0 20px rgba(220, 38, 38, 0)",
      ],
      transition: { duration: 0.5 },
    },
  },

  // Glow pulse
  glow: {
    initial: {
      boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)",
    },
    whileHover: {
      boxShadow: "0 0 20px 5px rgba(220, 38, 38, 0.4)",
      transition: { duration: DURATION.normal },
    },
    whileTap: {
      boxShadow: "0 0 30px 10px rgba(220, 38, 38, 0.6)",
    },
  },

  // Loading state
  loading: {
    opacity: 0.7,
    cursor: "not-allowed" as const,
    scale: 0.98,
  },

  // Success state
  success: {
    backgroundColor: "#10b981",
    scale: [1, 1.1, 1],
    transition: { duration: 0.4 },
  },

  // Error state
  error: {
    backgroundColor: "#ef4444",
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },

  // Turkish flag colors
  turkish: {
    initial: {
      background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    },
    whileHover: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      boxShadow: "0 0 25px rgba(220, 38, 38, 0.5)",
    },
  },

  // Magnetic (follows cursor)
  magnetic: {
    whileHover: {
      scale: 1.05,
    },
  },

  // 3D press
  press3d: {
    initial: {
      boxShadow: "0 5px 0 #991b1b",
      y: 0,
    },
    whileTap: {
      boxShadow: "0 2px 0 #991b1b",
      y: 3,
    },
  },
};

// INPUT FIELD MICRO-INTERACTIONS

export const inputInteractions = {
  // Label float
  labelFloat: {
    empty: {
      y: 0,
      scale: 1,
      color: "#6b7280",
    },
    filled: {
      y: -24,
      scale: 0.85,
      color: "#dc2626",
      transition: { duration: DURATION.fast, ease: EASING.smooth },
    },
  },

  // Border glow on focus
  borderGlow: {
    initial: {
      borderColor: "#d1d5db",
      boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)",
    },
    focus: {
      borderColor: "#dc2626",
      boxShadow: "0 0 0 3px rgba(220, 38, 38, 0.1)",
      transition: { duration: DURATION.fast },
    },
  },

  // Error shake
  errorShake: {
    x: [-10, 10, -10, 10, 0],
    borderColor: "#ef4444",
    transition: { duration: 0.4 },
  },

  // Success checkmark
  success: {
    borderColor: "#10b981",
    transition: { duration: DURATION.fast },
  },

  // Password peek
  passwordPeek: {
    hidden: { opacity: 0.5 },
    visible: { opacity: 1 },
  },

  // Clear button
  clearButton: {
    initial: { opacity: 0, scale: 0.8, rotate: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: SPRING.snappy,
    },
    hover: {
      scale: 1.2,
      rotate: 90,
      transition: { duration: DURATION.fast },
    },
  },
};

// CHECKBOX / RADIO INTERACTIONS

export const checkboxInteractions = {
  // Checkmark draw
  checkmark: {
    unchecked: {
      pathLength: 0,
      opacity: 0,
    },
    checked: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: EASING.smooth },
    },
  },

  // Box scale
  box: {
    unchecked: {
      scale: 1,
      backgroundColor: "#ffffff",
      borderColor: "#d1d5db",
    },
    checked: {
      scale: [1, 1.2, 1],
      backgroundColor: "#dc2626",
      borderColor: "#dc2626",
      transition: { duration: 0.3 },
    },
  },

  // Radio ripple
  radio: {
    unchecked: { scale: 0 },
    checked: {
      scale: 1,
      transition: SPRING.bouncy,
    },
  },
};

// TOGGLE SWITCH INTERACTIONS

export const toggleInteractions = {
  // Switch slide
  switch: {
    off: {
      x: 2,
      backgroundColor: "#9ca3af",
    },
    on: {
      x: 22,
      backgroundColor: "#dc2626",
      transition: SPRING.snappy,
    },
  },

  // Handle bounce
  handle: {
    off: { x: 0 },
    on: {
      x: 20,
      transition: SPRING.bouncy,
    },
  },
};

// DROPDOWN / SELECT INTERACTIONS

export const dropdownInteractions = {
  // Menu appear
  menu: {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      pointerEvents: "none" as const,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      pointerEvents: "auto" as const,
      transition: SPRING.snappy,
    },
  },

  // Stagger items
  item: {
    closed: { opacity: 0, x: -10 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: DURATION.fast,
      },
    }),
  },

  // Arrow rotate
  arrow: {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  },
};

// TOOLTIP INTERACTIONS

export const tooltipInteractions = {
  // Fade + scale
  standard: {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: DURATION.fast },
    },
  },

  // Slide from direction
  top: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
  bottom: {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  },
};

// BADGE / NOTIFICATION DOT

export const badgeInteractions = {
  // Pulse
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Bounce in
  bounceIn: {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: { duration: 0.4 },
    },
  },

  // Ping (like unread notification)
  ping: {
    scale: [1, 1.5, 1],
    opacity: [0.8, 0, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

// SLIDER INTERACTIONS

export const sliderInteractions = {
  // Handle scale on drag
  handle: {
    initial: { scale: 1 },
    hover: { scale: 1.2 },
    drag: { scale: 1.3, cursor: "grabbing" },
  },

  // Track fill
  track: {
    initial: { scaleX: 0 },
    animate: (value: number) => ({
      scaleX: value / 100,
      transition: SPRING.snappy,
    }),
  },
};

// TABS INTERACTIONS

export const tabInteractions = {
  // Sliding indicator
  indicator: {
    transition: SPRING.snappy,
  },

  // Tab hover
  tab: {
    initial: { color: "#6b7280" },
    hover: { color: "#dc2626" },
    active: { color: "#dc2626", fontWeight: 600 },
  },

  // Content transition
  content: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: DURATION.normal },
    },
  },
};

// ACCORDION INTERACTIONS

export const accordionInteractions = {
  // Content expand
  content: {
    closed: {
      height: 0,
      opacity: 0,
      overflow: "hidden" as const,
    },
    open: {
      height: "auto",
      opacity: 1,
      overflow: "hidden" as const,
      transition: { duration: DURATION.normal, ease: EASING.smooth },
    },
  },

  // Arrow rotate
  arrow: {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  },
};

// PROGRESS BAR INTERACTIONS

export const progressInteractions = {
  // Fill animation
  fill: {
    initial: { width: "0%" },
    animate: (progress: number) => ({
      width: `${progress}%`,
      transition: { duration: 0.5, ease: EASING.smooth },
    }),
  },

  // Shimmer effect
  shimmer: {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },

  // Pulse
  pulse: {
    animate: {
      opacity: [1, 0.7, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  },
};

// ICON INTERACTIONS

export const iconInteractions = {
  // Bounce
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },

  // Spin
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },

  // Wiggle
  wiggle: {
    rotate: [-10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },

  // Scale pulse
  scalePulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },

  // Heart beat
  heartBeat: {
    scale: [1, 1.3, 1, 1.3, 1],
    transition: {
      duration: 1,
      times: [0, 0.2, 0.3, 0.5, 0.6],
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

// CARD INTERACTIONS

export const cardInteractions = {
  // Hover lift
  lift: {
    initial: {
      y: 0,
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
      transition: { duration: DURATION.fast },
    },
  },

  // 3D tilt
  tilt3d: {
    initial: {
      rotateX: 0,
      rotateY: 0,
    },
    hover: {
      scale: 1.05,
    },
  },

  // Border glow
  borderGlow: {
    initial: {
      borderColor: "transparent",
    },
    hover: {
      borderColor: "#dc2626",
      boxShadow: "0 0 20px rgba(220, 38, 38, 0.3)",
    },
  },
};

// AVATAR INTERACTIONS

export const avatarInteractions = {
  // Online status pulse
  onlineStatus: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },

  // Hover zoom
  zoom: {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: DURATION.fast },
    },
  },

  // Ring rotation
  ring: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// SKELETON LOADING INTERACTIONS

export const skeletonPulse = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// EXPORT ALL

export const microInteractions = {
  button: buttonInteractions,
  input: inputInteractions,
  checkbox: checkboxInteractions,
  toggle: toggleInteractions,
  dropdown: dropdownInteractions,
  tooltip: tooltipInteractions,
  badge: badgeInteractions,
  slider: sliderInteractions,
  tabs: tabInteractions,
  accordion: accordionInteractions,
  progress: progressInteractions,
  icon: iconInteractions,
  card: cardInteractions,
  avatar: avatarInteractions,
};
