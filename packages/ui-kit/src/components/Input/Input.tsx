/**
 * TÜRK DİJİTAL METROPOL - Elite Input Component
 *
 * Animated label, validation, icon support
 * Premium form input with smooth transitions
 */

'use client';

import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

const inputVariants = cva(
  'w-full rounded-lg border bg-transparent px-4 py-3 text-base transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 dark:border-gray-600',
        turkish:
          'border-gray-300 focus:border-[#E30A17] focus:ring-2 focus:ring-[#E30A17]/20 dark:border-gray-600',
        bosphorus:
          'border-gray-300 focus:border-[#0097D7] focus:ring-2 focus:ring-[#0097D7]/20 dark:border-gray-600',
        glass:
          'border-white/20 bg-white/10 backdrop-blur-md focus:border-white/40 focus:bg-white/20',
      },
      inputSize: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-13 px-5 text-lg',
      },
      hasError: {
        true: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      },
      hasSuccess: {
        true: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  floatingLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      type = 'text',
      label,
      error,
      success,
      leftIcon,
      rightIcon,
      helperText,
      floatingLabel = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              inputVariants({
                variant,
                inputSize,
                hasError,
                hasSuccess,
                className,
              }),
              {
                'pl-10': leftIcon,
                'pr-10': rightIcon || isPasswordType || hasError || hasSuccess,
                'pt-6': floatingLabel && label,
              }
            )}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            {...props}
          />

          {/* Floating Label */}
          {floatingLabel && label && (
            <motion.label
              className={cn(
                'absolute left-4 pointer-events-none transition-all duration-200',
                {
                  'text-gray-500 dark:text-gray-400': !isFocused && !hasValue,
                  'text-[#D4AF37]': isFocused && variant === 'default',
                  'text-[#E30A17]': isFocused && variant === 'turkish',
                  'text-[#0097D7]': isFocused && variant === 'bosphorus',
                  'text-white': isFocused && variant === 'glass',
                  'text-red-500': hasError,
                  'text-green-500': hasSuccess,
                  'left-14': leftIcon,
                }
              )}
              initial={false}
              animate={
                isFocused || hasValue
                  ? { y: -24, scale: 0.85, x: -4 }
                  : { y: -12, scale: 1, x: 0 }
              }
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {label}
            </motion.label>
          )}

          {/* Static Label */}
          {!floatingLabel && label && (
            <label
              className={cn('block text-sm font-medium mb-2', {
                'text-red-500': hasError,
                'text-green-500': hasSuccess,
                'text-gray-700 dark:text-gray-300': !hasError && !hasSuccess,
              })}
            >
              {label}
            </label>
          )}

          {/* Right Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Success Icon */}
            {hasSuccess && !hasError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-500"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            )}

            {/* Error Icon */}
            {hasError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-red-500"
              >
                <AlertCircle className="w-5 h-5" />
              </motion.div>
            )}

            {/* Password Toggle */}
            {isPasswordType && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !isPasswordType && !hasError && !hasSuccess && (
              <div className="text-gray-500 dark:text-gray-400">{rightIcon}</div>
            )}
          </div>
        </div>

        {/* Helper/Error/Success Text */}
        <AnimatePresence mode="wait">
          {(error || success || helperText) && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn('mt-2 text-sm', {
                'text-red-500': hasError,
                'text-green-500': hasSuccess,
                'text-gray-500 dark:text-gray-400': !hasError && !hasSuccess,
              })}
            >
              {error || success || helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      label,
      error,
      success,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn('block text-sm font-medium mb-2', {
              'text-red-500': hasError,
              'text-green-500': hasSuccess,
              'text-gray-700 dark:text-gray-300': !hasError && !hasSuccess,
            })}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={cn(
            inputVariants({ variant, hasError, hasSuccess, className }),
            'min-h-[100px] resize-y'
          )}
          disabled={disabled}
          {...props}
        />

        <AnimatePresence mode="wait">
          {(error || success || helperText) && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn('mt-2 text-sm', {
                'text-red-500': hasError,
                'text-green-500': hasSuccess,
                'text-gray-500 dark:text-gray-400': !hasError && !hasSuccess,
              })}
            >
              {error || success || helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
