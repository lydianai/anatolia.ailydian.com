/**
 * SCROLL-TRIGGERED ANIMATIONS
 * Intersection Observer + Framer Motion
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// INTERSECTION OBSERVER CONFIG

export const OBSERVER_CONFIG = {
  // Trigger immediately when element enters
  immediate: {
    threshold: 0,
    triggerOnce: true,
  },

  // Trigger when 50% visible
  half: {
    threshold: 0.5,
    triggerOnce: true,
  },

  // Trigger when fully visible
  full: {
    threshold: 1,
    triggerOnce: true,
  },

  // Repeat every time
  repeat: {
    threshold: 0.1,
    triggerOnce: false,
  },

  // Turkish-themed (trigger at crescent position)
  turkish: {
    threshold: 0.3,
    triggerOnce: true,
    margin: "-100px",
  },
} as const;

// SCROLL REVEAL HOOK

export interface UseScrollRevealConfig {
  threshold?: number;
  triggerOnce?: boolean;
  margin?: string;
  delay?: number;
}

/**
 * Hook to detect when element is in view
 */
export const useScrollReveal = (config: UseScrollRevealConfig = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    margin = "0px",
    delay = 0,
  } = config;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin,
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      setShouldAnimate(false);
    }
  }, [isInView, delay, triggerOnce]);

  return { ref, isInView: shouldAnimate };
};

// SCROLL PROGRESS

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollProgress;
};

// SCROLL DIRECTION

type ScrollDirection = "up" | "down" | null;

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
};

// SCROLL VELOCITY

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();

      const distance = Math.abs(currentScrollY - lastScrollY.current);
      const time = currentTimestamp - lastTimestamp.current;

      const newVelocity = time > 0 ? distance / time : 0;
      setVelocity(newVelocity);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTimestamp;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return velocity;
};

// PARALLAX SCROLL

export interface UseParallaxConfig {
  speed?: number; // 0.5 = slow, 2 = fast
  direction?: "up" | "down";
}

export const useParallax = (config: UseParallaxConfig = {}) => {
  const { speed = 0.5, direction = "up" } = config;
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const viewportHeight = window.innerHeight;

      const progress = (scrolled - elementTop + viewportHeight) / (viewportHeight + rect.height);
      const newOffset = progress * 100 * speed * (direction === "up" ? -1 : 1);

      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return { ref, offset };
};

// SCROLL SNAP SECTIONS

export const useScrollSnap = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-scroll-section]");

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
};

// COUNTER ANIMATION (Count up when in view)

export interface UseCounterConfig {
  end: number;
  start?: number;
  duration?: number; // in seconds
  decimals?: number;
}

export const useCounter = (config: UseCounterConfig) => {
  const { end, start = 0, duration = 2, decimals = 0 } = config;
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const increment = (end - start) / (duration * 60); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Number(current.toFixed(decimals)));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, start, duration, decimals]);

  return { ref, count };
};

// SCROLL-LINKED TEXT REVEAL

export const useTextReveal = () => {
  const [revealProgress, setRevealProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / viewportHeight)
      );

      setRevealProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, progress: revealProgress };
};

// INFINITE SCROLL DETECTOR

export interface UseInfiniteScrollConfig {
  onLoadMore: () => void;
  threshold?: number; // pixels from bottom
  isLoading?: boolean;
}

export const useInfiniteScroll = (config: UseInfiniteScrollConfig) => {
  const { onLoadMore, threshold = 300, isLoading = false } = config;

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onLoadMore, threshold, isLoading]);
};

// SCROLL TO SECTION

export const scrollToSection = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

// SCROLL TO TOP

export const scrollToTop = (smooth: boolean = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};

// HIDE ON SCROLL DOWN

export const useHideOnScroll = (threshold: number = 100) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < threshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isVisible;
};

// SCROLL-BASED SCALE

export const useScrollScale = () => {
  const [scale, setScale] = useState(1);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / viewportHeight)
      );

      setScale(0.8 + progress * 0.2); // Scale from 0.8 to 1
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, scale };
};

// EXPORT ALL

export const scrollAnimations = {
  hooks: {
    useScrollReveal,
    useScrollProgress,
    useScrollDirection,
    useScrollVelocity,
    useParallax,
    useScrollSnap,
    useCounter,
    useTextReveal,
    useInfiniteScroll,
    useHideOnScroll,
    useScrollScale,
  },
  utils: {
    scrollToSection,
    scrollToTop,
  },
  config: OBSERVER_CONFIG,
};
