/**
 * TÜRK DİJİTAL METROPOL - Elite Button Component
 *
 * Premium button with 12 variants, micro-interactions, ripple effect
 * Apple quality meets Turkish cultural design
 */

'use client';

import React, { forwardRef, useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        // Ottoman Gold - Primary
        ottoman: 'bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-white shadow-ottoman hover:shadow-xl hover:scale-105 focus-visible:ring-[#D4AF37]',

        // Turkish Red - Danger/Important
        turkish: 'bg-gradient-to-r from-[#E30A17] to-[#B60814] text-white shadow-turkish hover:shadow-xl hover:scale-105 focus-visible:ring-[#E30A17]',

        // Bosphorus Blue - Info/Primary Alt
        bosphorus: 'bg-gradient-to-r from-[#0097D7] to-[#007AB2] text-white shadow-bosphorus hover:shadow-xl hover:scale-105 focus-visible:ring-[#0097D7]',

        // Tulip Pink - Special/Featured
        tulip: 'bg-gradient-to-r from-[#FF6B9D] to-[#CC5680] text-white shadow-md hover:shadow-xl hover:scale-105 focus-visible:ring-[#FF6B9D]',

        // Cini Turquoise - Success/Accent
        cini: 'bg-gradient-to-r from-[#40E0D0] to-[#33B3A6] text-gray-900 shadow-cini hover:shadow-xl hover:scale-105 focus-visible:ring-[#40E0D0]',

        // Glass - Premium Glassmorphism
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-glass hover:bg-white/20 hover:border-white/30',

        // Outline - Minimalist
        outline: 'border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',

        // Ghost - Ultra Minimal
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',

        // Gradient Mesh
        mesh: 'bg-gradient-to-r from-[#D4AF37] via-[#E30A17] to-[#0097D7] text-white shadow-2xl hover:shadow-3xl hover:scale-105',

        // Sunset - Turkish Sunset
        sunset: 'bg-gradient-to-r from-[#FF6B9D] via-[#D4AF37] to-[#E30A17] text-white shadow-xl hover:shadow-2xl hover:scale-105',

        // Dark - Modern Dark
        dark: 'bg-gray-900 text-white border border-gray-700 hover:bg-gray-800 shadow-lg',

        // Light - Clean Light
        light: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-md',
      },
      size: {
        xs: 'h-7 px-3 text-xs',
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
        xl: 'h-16 px-10 text-xl',
        icon: 'h-11 w-11',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'ottoman',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'size'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
}

interface RippleType {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ripple = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<RippleType[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled && !loading) {
        const button = buttonRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          const newRipple = {
            x,
            y,
            size,
            id: Date.now(),
          };

          setRipples((prev) => [...prev, newRipple]);

          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
          }, 600);
        }
      }

      onClick?.(e);
    };

    return (
      <motion.button
        ref={(node) => {
          (buttonRef as any).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        onClick={handleClick}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        {...props}
      >
        {/* Ripple Effect */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            initial={{
              x: ripple.x,
              y: ripple.y,
              width: ripple.size,
              height: ripple.size,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              scale: 2,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}

        {/* Loading Spinner */}
        {loading && (
          <motion.svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}

        {/* Left Icon */}
        {leftIcon && !loading && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {leftIcon}
          </motion.span>
        )}

        {/* Content */}
        <span className="relative z-10">{children}</span>

        {/* Right Icon */}
        {rightIcon && !loading && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {rightIcon}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
