"use client";

/**
 * CUSTOM CURSOR - Turkish Star Cursor with Effects
 * Premium cursor interactions
 */

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// TYPES

type CursorVariant = "default" | "hover" | "click" | "text" | "loading";

// COMPONENT

export const CustomCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);

  // Cursor position with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Update cursor position
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    // Hide cursor when leaving window
    const hideCursor = () => setIsVisible(false);

    // Detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setVariant("hover");
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    const handleMouseDown = () => setVariant("click");
    const handleMouseUp = () => setVariant(variant === "hover" ? "hover" : "default");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY, variant]);

  // Hide on mobile/touch devices
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Turkish Star */}
        <motion.div
          className="relative flex h-8 w-8 items-center justify-center"
          animate={{
            scale: variant === "hover" ? 2 : variant === "click" ? 0.8 : 1,
            rotate: variant === "loading" ? 360 : 0,
          }}
          transition={{
            scale: { duration: 0.2 },
            rotate: { duration: 1, repeat: variant === "loading" ? Infinity : 0, ease: "linear" },
          }}
        >
          {/* Star SVG */}
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="white"
            className="drop-shadow-lg"
            animate={{
              opacity: variant === "text" ? 0 : 1,
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>

          {/* Crescent Moon (for Turkish theme) */}
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
            className="absolute drop-shadow-lg"
            animate={{
              opacity: variant === "hover" ? 1 : 0,
              rotate: variant === "hover" ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>

          {/* Text cursor (I-beam) */}
          {variant === "text" && (
            <motion.div
              className="h-6 w-0.5 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500"
          animate={{
            width: variant === "hover" ? 60 : variant === "click" ? 40 : 0,
            height: variant === "hover" ? 60 : variant === "click" ? 40 : 0,
            opacity: variant === "hover" ? 0.3 : variant === "click" ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Trailing dots */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 rounded-full bg-red-500 opacity-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{ delay: 0.05 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-1.5 w-1.5 rounded-full bg-red-400 opacity-30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{ delay: 0.1 }}
      />
    </>
  );
};

// HOOK TO SET CURSOR VARIANT

export const useCursor = () => {
  const setCursorVariant = (variant: CursorVariant) => {
    const event = new CustomEvent("cursor-variant", { detail: variant });
    window.dispatchEvent(event);
  };

  return { setCursorVariant };
};
