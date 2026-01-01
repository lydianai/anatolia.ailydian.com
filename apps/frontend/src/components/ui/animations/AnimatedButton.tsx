"use client";

/**
 * ANIMATED BUTTON - Premium Button with Micro-interactions
 * Turkish Digital Metropol Elite Component
 */

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, useState } from "react";
import { microInteractions } from "@/lib/animations/micro-interactions";

// TYPES

export interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost" | "turkish";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  withRipple?: boolean;
  withGlow?: boolean;
  children: React.ReactNode;
}

// STYLES

const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-lg transition-colors overflow-hidden";

const variants = {
  primary: "bg-red-600 text-white hover:bg-red-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  turkish: "bg-gradient-to-r from-red-600 to-red-800 text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

// COMPONENT

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      success = false,
      error = false,
      withRipple = false,
      withGlow = false,
      children,
      className = "",
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    // Handle ripple effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (withRipple && !disabled && !loading) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }

      onClick?.(e);
    };

    // Determine animation state
    const getAnimationProps = () => {
      if (loading) return microInteractions.button.loading;
      if (success) return microInteractions.button.success;
      if (error) return microInteractions.button.error;

      if (withGlow) {
        return {
          ...microInteractions.button.glow,
          ...microInteractions.button.standard,
        };
      }

      return microInteractions.button.standard;
    };

    const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <motion.button
        ref={ref}
        className={buttonStyles}
        onClick={handleClick}
        disabled={disabled || loading}
        {...getAnimationProps()}
        {...props}
      >
        {/* Ripple effects */}
        {withRipple && ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}

        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Success checkmark */}
        {success && !loading && (
          <motion.svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </motion.svg>
        )}

        {/* Error icon */}
        {error && !loading && (
          <motion.svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </motion.svg>
        )}

        {/* Button text */}
        <span className="relative z-10">{children}</span>

        {/* Glow effect overlay */}
        {withGlow && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 to-red-600 opacity-0"
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// PRESET BUTTONS

export const TurkishButton = (props: Omit<AnimatedButtonProps, "variant">) => (
  <AnimatedButton variant="turkish" withGlow {...props} />
);

export const RippleButton = (props: Omit<AnimatedButtonProps, "withRipple">) => (
  <AnimatedButton withRipple {...props} />
);

export const GlowButton = (props: Omit<AnimatedButtonProps, "withGlow">) => (
  <AnimatedButton withGlow {...props} />
);
