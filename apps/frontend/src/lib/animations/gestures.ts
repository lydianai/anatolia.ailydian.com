/**
 * GESTURE ANIMATIONS - Drag, Swipe, Pan
 * Elite touch interactions for Turkish Digital Metropol
 */

import { PanInfo, DragHandlers } from "framer-motion";

// DRAG CONSTRAINTS

export const DRAG_CONSTRAINTS = {
  free: {},
  horizontal: { top: 0, bottom: 0 },
  vertical: { left: 0, right: 0 },
  bounded: { top: -50, bottom: 50, left: -50, right: 50 },
  tight: { top: -10, bottom: 10, left: -10, right: 10 },
} as const;

// DRAG PRESETS

export const dragPresets = {
  // Smooth card drag
  card: {
    drag: true,
    dragElastic: 0.1,
    dragTransition: {
      bounceStiffness: 300,
      bounceDamping: 20,
    },
    whileDrag: {
      scale: 1.05,
      cursor: "grabbing",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
  },

  // Inventory item drag
  item: {
    drag: true,
    dragElastic: 0.05,
    dragTransition: {
      bounceStiffness: 400,
      bounceDamping: 25,
    },
    whileDrag: {
      scale: 0.95,
      opacity: 0.8,
      cursor: "grabbing",
      zIndex: 999,
    },
  },

  // Slider handle
  slider: {
    drag: "x" as const,
    dragElastic: 0,
    dragMomentum: false,
    whileDrag: {
      scale: 1.2,
      cursor: "grabbing",
    },
  },

  // Swipeable card
  swipe: {
    drag: "x" as const,
    dragElastic: 0.2,
    dragTransition: {
      bounceStiffness: 200,
      bounceDamping: 20,
    },
  },
} as const;

// SWIPE DETECTION

export interface SwipeConfig {
  threshold?: number;
  velocityThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

/**
 * Detect swipe gestures
 */
export const createSwipeHandlers = (config: SwipeConfig): DragHandlers => {
  const {
    threshold = 50,
    velocityThreshold = 500,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  } = config;

  return {
    onDragEnd: (event, info: PanInfo) => {
      const { offset, velocity } = info;

      // Horizontal swipes
      if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > velocityThreshold) {
        if (offset.x > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (offset.x < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }

      // Vertical swipes
      if (Math.abs(offset.y) > threshold || Math.abs(velocity.y) > velocityThreshold) {
        if (offset.y > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (offset.y < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    },
  };
};

// TINDER-LIKE SWIPE CARDS

export interface TinderSwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export const tinderSwipe = (config: TinderSwipeConfig) => {
  const { onSwipeLeft, onSwipeRight, threshold = 100 } = config;

  return {
    drag: "x" as const,
    dragElastic: 0.5,
    dragConstraints: { left: -300, right: 300 },
    onDragEnd: (event: any, info: PanInfo) => {
      const { offset, velocity } = info;

      if (offset.x > threshold || velocity.x > 500) {
        onSwipeRight?.();
      } else if (offset.x < -threshold || velocity.x < -500) {
        onSwipeLeft?.();
      }
    },
    whileDrag: {
      cursor: "grabbing",
      rotate: (info: any) => info.offset.x / 10, // Rotate based on drag
    },
  };
};

// CAROUSEL SWIPE

export interface CarouselSwipeConfig {
  onNext?: () => void;
  onPrev?: () => void;
  threshold?: number;
}

export const carouselSwipe = (config: CarouselSwipeConfig) => {
  const { onNext, onPrev, threshold = 50 } = config;

  return {
    drag: "x" as const,
    dragElastic: 0.2,
    dragConstraints: { left: 0, right: 0 },
    onDragEnd: (event: any, info: PanInfo) => {
      const { offset, velocity } = info;

      if (offset.x < -threshold || velocity.x < -500) {
        onNext?.();
      } else if (offset.x > threshold || velocity.x > 500) {
        onPrev?.();
      }
    },
  };
};

// PULL TO REFRESH

export interface PullToRefreshConfig {
  onRefresh: () => void;
  threshold?: number;
}

export const pullToRefresh = (config: PullToRefreshConfig) => {
  const { onRefresh, threshold = 80 } = config;

  return {
    drag: "y" as const,
    dragElastic: 0.3,
    dragConstraints: { top: 0, bottom: 200 },
    onDragEnd: (event: any, info: PanInfo) => {
      if (info.offset.y > threshold) {
        onRefresh();
      }
    },
  };
};

// DRAG TO DELETE

export interface DragToDeleteConfig {
  onDelete: () => void;
  threshold?: number;
  direction?: "left" | "right";
}

export const dragToDelete = (config: DragToDeleteConfig) => {
  const { onDelete, threshold = 150, direction = "left" } = config;

  return {
    drag: "x" as const,
    dragElastic: 0.5,
    dragConstraints: direction === "left"
      ? { left: -300, right: 0 }
      : { left: 0, right: 300 },
    onDragEnd: (event: any, info: PanInfo) => {
      const shouldDelete = direction === "left"
        ? info.offset.x < -threshold
        : info.offset.x > threshold;

      if (shouldDelete) {
        onDelete();
      }
    },
    whileDrag: {
      backgroundColor: "rgba(220, 38, 38, 0.1)", // Red tint
    },
  };
};

// REORDER LIST ITEMS

export const reorderItem = {
  drag: true,
  dragMomentum: false,
  dragElastic: 0,
  dragTransition: {
    bounceStiffness: 600,
    bounceDamping: 30,
  },
  whileDrag: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    cursor: "grabbing",
    zIndex: 1,
  },
};

// 3D TILT ON HOVER/DRAG

export interface TiltConfig {
  max?: number; // Maximum tilt in degrees
  perspective?: number;
  scale?: number;
}

/**
 * Create 3D tilt effect based on mouse position
 */
export const create3DTilt = (config: TiltConfig = {}) => {
  const { max = 15, perspective = 1000, scale = 1.05 } = config;

  return {
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * max;
      const rotateY = ((x - centerX) / centerX) * -max;

      return {
        rotateX,
        rotateY,
        scale,
        transition: { duration: 0.1 },
      };
    },
    onMouseLeave: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.3 },
    },
    style: {
      transformStyle: "preserve-3d" as const,
      perspective,
    },
  };
};

// MAGNETIC BUTTON (Follows cursor)

export const createMagneticEffect = (strength: number = 0.3) => {
  return {
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) * strength;
      const deltaY = (y - centerY) * strength;

      return {
        x: deltaX,
        y: deltaY,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      };
    },
    onMouseLeave: {
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };
};

// PARALLAX ON SCROLL

export interface ParallaxConfig {
  speed?: number; // 0.5 = slow, 2 = fast
  direction?: "up" | "down";
}

export const createParallax = (config: ParallaxConfig = {}) => {
  const { speed = 0.5, direction = "up" } = config;

  return {
    initial: { y: 0 },
    animate: (scrollY: number) => ({
      y: direction === "up" ? scrollY * speed : -scrollY * speed,
    }),
  };
};

// ELASTIC BOUNCE BACK

export const elasticBounce = {
  drag: true,
  dragElastic: 0.7,
  dragTransition: {
    bounceStiffness: 300,
    bounceDamping: 15,
  },
  dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
};

// DIRECTIONAL HOVER (Mouse follows)

export const createDirectionalHover = () => {
  return {
    whileHover: (event: React.MouseEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      return {
        x: (x - centerX) * 0.1,
        y: (y - centerY) * 0.1,
      };
    },
  };
};

// VELOCITY-BASED MOMENTUM

export const momentumScroll = {
  drag: "x" as const,
  dragElastic: 0.1,
  dragTransition: {
    power: 0.3,
    timeConstant: 300,
  },
};

// SNAP TO GRID

export interface SnapToGridConfig {
  gridSize: number;
  onSnapComplete?: (position: { x: number; y: number }) => void;
}

export const snapToGrid = (config: SnapToGridConfig) => {
  const { gridSize, onSnapComplete } = config;

  return {
    drag: true,
    dragElastic: 0,
    onDragEnd: (event: any, info: PanInfo) => {
      const x = Math.round(info.point.x / gridSize) * gridSize;
      const y = Math.round(info.point.y / gridSize) * gridSize;

      onSnapComplete?.({ x, y });

      return { x, y };
    },
  };
};

// EXPORT ALL

export const gestures = {
  drag: dragPresets,
  swipe: {
    tinder: tinderSwipe,
    carousel: carouselSwipe,
    detect: createSwipeHandlers,
  },
  special: {
    pullToRefresh,
    dragToDelete,
    reorder: reorderItem,
  },
  effects: {
    tilt3D: create3DTilt,
    magnetic: createMagneticEffect,
    parallax: createParallax,
    directionalHover: createDirectionalHover,
  },
  utilities: {
    elastic: elasticBounce,
    momentum: momentumScroll,
    snapToGrid,
  },
};
