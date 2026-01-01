/**
 * TÜRK DİJİTAL METROPOL - Elite Avatar Component
 *
 * Ring animations, status indicator, Turkish flag border
 * Premium avatar with cultural design
 */

'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold select-none',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl',
        '3xl': 'w-24 h-24 text-3xl',
      },
      variant: {
        default: '',
        ottoman: 'ring-2 ring-[#D4AF37] ring-offset-2',
        turkish: 'ring-2 ring-[#E30A17] ring-offset-2',
        bosphorus: 'ring-2 ring-[#0097D7] ring-offset-2',
        flag: 'ring-2 ring-[#E30A17] ring-offset-2 ring-offset-white',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  ring?: boolean;
  pulse?: boolean;
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
};

const statusPositions = {
  'top-right': 'top-0 right-0',
  'bottom-right': 'bottom-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-left': 'bottom-0 left-0',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      variant,
      src,
      alt,
      fallback,
      status,
      statusPosition = 'bottom-right',
      ring = false,
      pulse = false,
      ...props
    },
    ref
  ) => {
    const initials = fallback
      ? fallback
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '?';

    return (
      <motion.div
        ref={ref}
        className={cn(
          avatarVariants({ size, variant: ring ? variant : 'default', className })
        )}
        whileHover={pulse ? { scale: 1.05 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || fallback || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}

        {/* Status Indicator */}
        {status && (
          <motion.span
            className={cn(
              'absolute w-3 h-3 rounded-full border-2 border-white dark:border-gray-900',
              statusColors[status],
              statusPositions[statusPosition]
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {status === 'online' && (
              <motion.span
                className="absolute inset-0 rounded-full bg-green-500"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.span>
        )}

        {/* Pulse Animation */}
        {pulse && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarProps['size'];
  children: React.ReactElement<AvatarProps>[];
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 5, size = 'md', children, ...props }, ref) => {
    const avatars = React.Children.toArray(children).slice(0, max);
    const remaining = React.Children.count(children) - max;

    return (
      <div
        ref={ref}
        className={cn('flex items-center -space-x-2', className)}
        {...props}
      >
        {avatars.map((avatar, index) => (
          <div key={index} className="relative">
            {React.cloneElement(avatar as React.ReactElement<AvatarProps>, {
              size,
              className: 'border-2 border-white dark:border-gray-900',
            })}
          </div>
        ))}

        {remaining > 0 && (
          <div
            className={cn(
              avatarVariants({ size }),
              'border-2 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
            )}
          >
            <span>+{remaining}</span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
