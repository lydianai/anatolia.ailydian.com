/**
 * ANADOLU REALM - Health/Stamina/Mana Bar Component
 * PS5-Quality animated bars with damage flash effects
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart, Zap, Droplet, Shield } from 'lucide-react';

export interface BarProps {
  current: number;
  max: number;
  type: 'health' | 'stamina' | 'mana' | 'shield';
  showNumbers?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function ResourceBar({
  current,
  max,
  type,
  showNumbers = true,
  size = 'medium',
  className = ''
}: BarProps) {
  const [prevValue, setPrevValue] = useState(current);
  const [flash, setFlash] = useState(false);

  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  // Trigger flash effect on damage
  useEffect(() => {
    if (current < prevValue && type === 'health') {
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }
    setPrevValue(current);
  }, [current, prevValue, type]);

  // Color schemes for each resource type
  const config = {
    health: {
      icon: Heart,
      gradient: 'from-red-500 via-red-600 to-red-700',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      bg: 'bg-red-900/30',
      border: 'border-red-500/30',
      label: 'Can',
      flashColor: 'bg-red-500/50'
    },
    stamina: {
      icon: Zap,
      gradient: 'from-yellow-500 via-yellow-600 to-yellow-700',
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
      bg: 'bg-yellow-900/30',
      border: 'border-yellow-500/30',
      label: 'Dayanıklılık',
      flashColor: 'bg-yellow-500/50'
    },
    mana: {
      icon: Droplet,
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
      bg: 'bg-blue-900/30',
      border: 'border-blue-500/30',
      label: 'Mana',
      flashColor: 'bg-blue-500/50'
    },
    shield: {
      icon: Shield,
      gradient: 'from-cyan-500 via-cyan-600 to-cyan-700',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
      bg: 'bg-cyan-900/30',
      border: 'border-cyan-500/30',
      label: 'Kalkan',
      flashColor: 'bg-cyan-500/50'
    }
  };

  const activeConfig = config[type];
  const Icon = activeConfig.icon;

  // Size variants
  const sizeConfig = {
    small: {
      height: 'h-4',
      iconSize: 'w-3 h-3',
      fontSize: 'text-xs',
      padding: 'p-1'
    },
    medium: {
      height: 'h-6',
      iconSize: 'w-4 h-4',
      fontSize: 'text-sm',
      padding: 'p-2'
    },
    large: {
      height: 'h-8',
      iconSize: 'w-5 h-5',
      fontSize: 'text-base',
      padding: 'p-3'
    }
  };

  const sizeStyle = sizeConfig[size];

  return (
    <div className={`relative ${className}`}>
      {/* Label with Icon */}
      <div className={`flex items-center gap-2 mb-1 ${sizeStyle.fontSize}`}>
        <Icon className={`${sizeStyle.iconSize} ${type === 'health' ? 'text-red-400' : type === 'stamina' ? 'text-yellow-400' : type === 'mana' ? 'text-blue-400' : 'text-cyan-400'}`} />
        <span className="text-white/90 font-semibold">{activeConfig.label}</span>
        {showNumbers && (
          <span className="text-white/70 text-xs ml-auto">
            {Math.floor(current)} / {max}
          </span>
        )}
      </div>

      {/* Bar Container */}
      <div className={`relative w-full ${sizeStyle.height} ${activeConfig.bg} ${activeConfig.border} border rounded-full overflow-hidden backdrop-blur-sm`}>
        {/* Flash Effect */}
        <AnimatePresence>
          {flash && (
            <motion.div
              className={`absolute inset-0 ${activeConfig.flashColor} z-10`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }} />
        </div>

        {/* Fill Bar */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${activeConfig.gradient} ${activeConfig.glow}`}
          initial={false}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.3
          }}
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Low Resource Warning */}
        {percentage < 25 && (
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </div>

      {/* Percentage Text Overlay */}
      {showNumbers && size === 'large' && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/90 font-bold text-sm drop-shadow-lg pointer-events-none">
          {Math.floor(percentage)}%
        </div>
      )}
    </div>
  );
}

// Composite Component for Player Stats
export function PlayerStatsBars({
  health,
  maxHealth,
  stamina,
  maxStamina,
  mana,
  maxMana,
  shield,
  maxShield,
  className = ''
}: {
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  mana: number;
  maxMana: number;
  shield?: number;
  maxShield?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Shield (if active) */}
      {shield !== undefined && shield > 0 && maxShield && (
        <ResourceBar
          current={shield}
          max={maxShield}
          type="shield"
          size="small"
        />
      )}

      {/* Health */}
      <ResourceBar
        current={health}
        max={maxHealth}
        type="health"
        size="large"
      />

      {/* Stamina */}
      <ResourceBar
        current={stamina}
        max={maxStamina}
        type="stamina"
        size="medium"
      />

      {/* Mana */}
      <ResourceBar
        current={mana}
        max={maxMana}
        type="mana"
        size="medium"
      />
    </div>
  );
}
