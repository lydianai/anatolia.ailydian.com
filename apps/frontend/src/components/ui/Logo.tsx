/**
 * ANADOLU REALM - Premium Animated Logo Component
 * Ultra-premium gaming logo with particle effects & responsive design
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface LogoProps {
  size?: 'small' | 'default' | 'large';
  showPoweredBy?: boolean;
  showIcon?: boolean;
  className?: string;
}

export const Logo = ({
  size = 'default',
  showPoweredBy = true,
  showIcon = true,
  className
}: LogoProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const sizeConfigs = {
    small: {
      icon: 28,
      text: 'text-base sm:text-lg',
      powered: 'text-[9px] sm:text-[10px]',
      gap: 'gap-2'
    },
    default: {
      icon: 40,
      text: 'text-xl sm:text-2xl',
      powered: 'text-[10px] sm:text-xs',
      gap: 'gap-3'
    },
    large: {
      icon: 56,
      text: 'text-3xl sm:text-4xl md:text-5xl',
      powered: 'text-xs sm:text-sm',
      gap: 'gap-4'
    }
  };

  const config = sizeConfigs[size];

  useEffect(() => {
    if (showIcon) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    }
  }, [showIcon]);

  // Encode sensitive text
  const p0w3r3d = String.fromCharCode(112,111,119,101,114,101,100,32,98,121,32,76,121,100,105,97,110);

  return (
    <div className={cn("relative flex items-center", config.gap, className)}>
      {showIcon && (
        <div className="relative flex-shrink-0" style={{ width: config.icon, height: config.icon }}>
          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-turkish-gold rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [0, p.x, 0],
                  y: [0, p.y, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-turkish-red to-turkish-gold rounded-full blur-lg sm:blur-xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* SVG Icon */}
          <svg
            viewBox="0 0 100 100"
            className="relative z-10"
            style={{ width: config.icon, height: config.icon }}
          >
            {/* Crescent */}
            <motion.path
              d="M70 50 A25 25 0 1 1 50 25 A20 20 0 0 0 70 50z"
              fill="#DC2626"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Star */}
            <motion.path
              d="M50 15 L55 35 L75 35 L60 47 L65 65 L50 53 L35 65 L40 47 L25 35 L45 35 Z"
              fill="#D4AF37"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />

            {/* Pulsing ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.25"
              animate={{
                r: [33, 37, 33],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </svg>

          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 border border-turkish-gold/15 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Text Logo */}
      <div className="flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 0, x: showIcon ? -10 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <h1
            className={cn(
              "font-extrabold tracking-wider leading-tight",
              config.text
            )}
            style={{
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            <motion.span
              className="bg-gradient-to-r from-turkish-gold via-yellow-400 to-turkish-gold bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            >
              ANADOLU
            </motion.span>
            <br className="hidden sm:block" />
            <span className="hidden sm:inline"> </span>
            <motion.span
              className="text-white drop-shadow-lg"
              animate={{
                textShadow: [
                  "0 0 8px rgba(212, 175, 55, 0.2)",
                  "0 0 16px rgba(212, 175, 55, 0.4)",
                  "0 0 8px rgba(212, 175, 55, 0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              REALM
            </motion.span>
          </h1>

          {showPoweredBy && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={cn("mt-1 flex items-center gap-1", config.powered)}
            >
              {/* "by" text */}
              <motion.span
                className="font-light italic text-white/40"
                style={{ fontFamily: "'Inter', sans-serif" }}
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                by
              </motion.span>

              {/* "Lydian" text with premium gradient */}
              <motion.span
                className="font-bold tracking-wide bg-gradient-to-r from-turkish-gold via-yellow-300 to-turkish-gold bg-clip-text text-transparent relative"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                LYDIAN

                {/* Sparkle effect */}
                <motion.span
                  className="absolute -top-0.5 -right-1 text-turkish-gold"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  style={{ fontSize: '0.5em' }}
                >
                  ✦
                </motion.span>
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
