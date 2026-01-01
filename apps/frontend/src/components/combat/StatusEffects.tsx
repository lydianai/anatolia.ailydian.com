/**
 * ANADOLU REALM - Status Effects Component
 * Visual indicators for combat status effects
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Snowflake, Zap, Droplet, Shield, Sword, Heart, Eye, Target, Wind } from 'lucide-react';

export type StatusEffectType =
  | 'bleeding'
  | 'burning'
  | 'frozen'
  | 'stunned'
  | 'poisoned'
  | 'weakened'
  | 'slowed'
  | 'shielded'
  | 'strengthened'
  | 'hasted'
  | 'invisible'
  | 'marked';

export interface StatusEffect {
  id: string;
  type: StatusEffectType;
  duration: number; // in seconds
  stacks?: number;
  power?: number;
}

export interface StatusEffectsProps {
  effects: StatusEffect[];
  size?: 'small' | 'medium' | 'large';
  showTimer?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export default function StatusEffects({
  effects,
  size = 'medium',
  showTimer = true,
  showTooltip = true,
  className = ''
}: StatusEffectsProps) {
  const statusConfig: Record<StatusEffectType, {
    icon: typeof Flame;
    color: string;
    gradient: string;
    glow: string;
    name: string;
    description: string;
    isPositive: boolean;
  }> = {
    bleeding: {
      icon: Droplet,
      color: 'text-red-500',
      gradient: 'from-red-500 to-red-700',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.8)]',
      name: 'Kanama',
      description: 'Zaman içinde can kaybı',
      isPositive: false
    },
    burning: {
      icon: Flame,
      color: 'text-orange-500',
      gradient: 'from-orange-500 to-red-600',
      glow: 'shadow-[0_0_15px_rgba(249,115,22,0.8)]',
      name: 'Yanma',
      description: 'Ateş hasarı alıyorsun',
      isPositive: false
    },
    frozen: {
      icon: Snowflake,
      color: 'text-cyan-400',
      gradient: 'from-cyan-400 to-blue-600',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.8)]',
      name: 'Donmuş',
      description: 'Hareket edemiyorsun',
      isPositive: false
    },
    stunned: {
      icon: Zap,
      color: 'text-yellow-400',
      gradient: 'from-yellow-400 to-orange-500',
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.8)]',
      name: 'Sersemletilmiş',
      description: 'Hareket ve saldırı yapamıyorsun',
      isPositive: false
    },
    poisoned: {
      icon: Droplet,
      color: 'text-green-500',
      gradient: 'from-green-500 to-emerald-700',
      glow: 'shadow-[0_0_15px_rgba(34,197,94,0.8)]',
      name: 'Zehirlenmiş',
      description: 'Zehir hasarı alıyorsun',
      isPositive: false
    },
    weakened: {
      icon: Sword,
      color: 'text-gray-500',
      gradient: 'from-gray-500 to-gray-700',
      glow: 'shadow-[0_0_15px_rgba(107,114,128,0.6)]',
      name: 'Zayıflatılmış',
      description: 'Hasar verme gücün azaldı',
      isPositive: false
    },
    slowed: {
      icon: Wind,
      color: 'text-blue-400',
      gradient: 'from-blue-400 to-blue-600',
      glow: 'shadow-[0_0_15px_rgba(96,165,250,0.6)]',
      name: 'Yavaşlatılmış',
      description: 'Hareket hızın azaldı',
      isPositive: false
    },
    shielded: {
      icon: Shield,
      color: 'text-cyan-300',
      gradient: 'from-cyan-300 to-blue-500',
      glow: 'shadow-[0_0_15px_rgba(103,232,249,0.8)]',
      name: 'Kalkan',
      description: 'Ekstra savunma kazandın',
      isPositive: true
    },
    strengthened: {
      icon: Sword,
      color: 'text-red-400',
      gradient: 'from-red-400 to-orange-500',
      glow: 'shadow-[0_0_15px_rgba(248,113,113,0.8)]',
      name: 'Güçlendirilmiş',
      description: 'Hasar verme gücün arttı',
      isPositive: true
    },
    hasted: {
      icon: Zap,
      color: 'text-purple-400',
      gradient: 'from-purple-400 to-pink-500',
      glow: 'shadow-[0_0_15px_rgba(192,132,252,0.8)]',
      name: 'Hızlandırılmış',
      description: 'Hareket hızın arttı',
      isPositive: true
    },
    invisible: {
      icon: Eye,
      color: 'text-indigo-300',
      gradient: 'from-indigo-300 to-purple-500',
      glow: 'shadow-[0_0_15px_rgba(165,180,252,0.6)]',
      name: 'Görünmez',
      description: 'Düşmanlar seni göremez',
      isPositive: true
    },
    marked: {
      icon: Target,
      color: 'text-rose-400',
      gradient: 'from-rose-400 to-red-600',
      glow: 'shadow-[0_0_15px_rgba(251,113,133,0.8)]',
      name: 'İşaretli',
      description: 'Ekstra hasar alıyorsun',
      isPositive: false
    }
  };

  const sizeConfig = {
    small: {
      containerSize: 'w-8 h-8',
      iconSize: 'w-4 h-4',
      fontSize: 'text-xs',
      stackSize: 'text-[8px]',
      gap: 'gap-1'
    },
    medium: {
      containerSize: 'w-12 h-12',
      iconSize: 'w-6 h-6',
      fontSize: 'text-sm',
      stackSize: 'text-xs',
      gap: 'gap-2'
    },
    large: {
      containerSize: 'w-16 h-16',
      iconSize: 'w-8 h-8',
      fontSize: 'text-base',
      stackSize: 'text-sm',
      gap: 'gap-3'
    }
  };

  const sizeStyle = sizeConfig[size];

  return (
    <div className={`flex flex-wrap ${sizeStyle.gap} ${className}`}>
      <AnimatePresence>
        {effects.map((effect) => {
          const config = statusConfig[effect.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={effect.id}
              className="relative group"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
            >
              {/* Status Icon Container */}
              <motion.div
                className={`relative ${sizeStyle.containerSize} rounded-lg bg-gradient-to-br ${config.gradient} ${config.glow} border-2 ${config.isPositive ? 'border-white/40' : 'border-black/40'} flex items-center justify-center cursor-pointer`}
                animate={{
                  opacity: effect.duration <= 3 ? [1, 0.5, 1] : 1
                }}
                transition={{
                  duration: 0.5,
                  repeat: effect.duration <= 3 ? Infinity : 0
                }}
              >
                {/* Animated Icon */}
                <motion.div
                  animate={
                    effect.type === 'burning' ? {
                      y: [0, -2, 0],
                      rotate: [0, 5, -5, 0]
                    } : effect.type === 'frozen' ? {
                      rotate: [0, -3, 3, 0]
                    } : effect.type === 'stunned' ? {
                      rotate: [0, 10, -10, 10, -10, 0]
                    } : {}
                  }
                  transition={{
                    duration: effect.type === 'stunned' ? 0.3 : 1.5,
                    repeat: Infinity,
                    repeatDelay: effect.type === 'stunned' ? 1 : 0
                  }}
                >
                  <Icon className={`${sizeStyle.iconSize} text-white drop-shadow-lg`} />
                </motion.div>

                {/* Stack Counter */}
                {effect.stacks && effect.stacks > 1 && (
                  <div className={`absolute bottom-0 right-0 ${sizeStyle.stackSize} font-bold text-white bg-black/70 rounded-full w-5 h-5 flex items-center justify-center border border-white/30`}>
                    {effect.stacks}
                  </div>
                )}

                {/* Duration Timer */}
                {showTimer && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-black/50 rounded-t-lg overflow-hidden`}>
                    <motion.div
                      className="h-full bg-white/90"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{
                        duration: effect.duration,
                        ease: 'linear'
                      }}
                    />
                  </div>
                )}
              </motion.div>

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <motion.div
                    className="bg-black/95 backdrop-blur-md rounded-lg px-3 py-2 min-w-[150px] border border-white/20"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Name */}
                    <div className={`font-bold ${sizeStyle.fontSize} ${config.color} mb-1`}>
                      {config.name}
                      {effect.stacks && effect.stacks > 1 && ` (×${effect.stacks})`}
                    </div>

                    {/* Description */}
                    <div className="text-white/80 text-xs">
                      {config.description}
                    </div>

                    {/* Duration */}
                    <div className="text-white/60 text-xs mt-1">
                      Süre: {Math.ceil(effect.duration)}s
                    </div>

                    {/* Power/Damage */}
                    {effect.power && (
                      <div className={`text-xs mt-1 ${config.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {config.isPositive ? '+' : ''}{effect.power} {config.isPositive ? 'güç' : 'hasar/s'}
                      </div>
                    )}

                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[1px]">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20" />
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Particle Effects for Special Status */}
              {effect.type === 'burning' && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-orange-400"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        y: [-10, -30],
                        x: [0, Math.random() * 10 - 5],
                        opacity: [1, 0],
                        scale: [1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </>
              )}

              {effect.type === 'frozen' && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-cyan-300"
                      style={{
                        left: `${25 + i * 15}%`,
                        top: `${25 + (i % 2) * 25}%`,
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
