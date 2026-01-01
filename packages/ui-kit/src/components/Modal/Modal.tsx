/**
 * TÜRK DİJİTAL METROPOL - Elite Modal Component
 *
 * Stack system, backdrop blur, slide-in animations
 * Premium modal with Turkish cultural design
 */

'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { modalBackdrop, modalContent } from '../../animations';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  variant?: 'default' | 'glass' | 'ottoman' | 'gradient';
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  description,
  size = 'md',
  closeButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
  variant = 'default',
}) => {
  // Handle ESC key
  useEffect(() => {
    if (!closeOnEsc || !open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, closeOnEsc, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (typeof window === 'undefined') return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const variantClasses = {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20',
    ottoman:
      'bg-white dark:bg-gray-900 border-2 border-[#D4AF37] shadow-ottoman',
    gradient:
      'bg-gradient-to-br from-[#FF6B9D]/20 via-[#D4AF37]/20 to-[#0097D7]/20 backdrop-blur-xl border border-white/20',
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1300]"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[1310] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className={cn(
                'relative w-full rounded-2xl shadow-2xl',
                sizeClasses[size],
                variantClasses[variant],
                className
              )}
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Header */}
              {(title || description) && (
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  {title && (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Modal Sub-components
export const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'px-6 py-5 border-b border-gray-200 dark:border-gray-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('px-6 py-5', className)} {...props}>
    {children}
  </div>
);

export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
