/**
 * ANADOLU REALM - Floating Damage Numbers Component
 * PS5-Quality combat feedback with animations
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Skull, Zap, Shield, Flame, Droplet, Snowflake } from 'lucide-react';

export interface DamageNumberProps {
  id: string;
  amount: number;
  type: 'damage' | 'heal' | 'critical' | 'dot' | 'blocked' | 'miss' | 'evade';
  position: { x: number; y: number };
  element?: 'fire' | 'ice' | 'lightning' | 'poison' | 'physical';
  onComplete?: () => void;
}

export function FloatingDamageNumber({
  id,
  amount,
  type,
  position,
  element = 'physical',
  onComplete
}: DamageNumberProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Type-based styling
  const typeConfig = {
    damage: {
      color: 'text-white',
      size: 'text-2xl',
      shadow: 'drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]',
      icon: null,
      prefix: ''
    },
    critical: {
      color: 'text-yellow-400',
      size: 'text-4xl',
      shadow: 'drop-shadow-[0_4px_12px_rgba(234,179,8,1)]',
      icon: Zap,
      prefix: 'CRITICAL!'
    },
    heal: {
      color: 'text-green-400',
      size: 'text-2xl',
      shadow: 'drop-shadow-[0_2px_8px_rgba(74,222,128,0.8)]',
      icon: null,
      prefix: '+'
    },
    dot: {
      color: 'text-red-400',
      size: 'text-xl',
      shadow: 'drop-shadow-[0_2px_6px_rgba(248,113,113,0.8)]',
      icon: Flame,
      prefix: ''
    },
    blocked: {
      color: 'text-cyan-400',
      size: 'text-xl',
      shadow: 'drop-shadow-[0_2px_6px_rgba(34,211,238,0.8)]',
      icon: Shield,
      prefix: 'ENGELLENDI'
    },
    miss: {
      color: 'text-gray-400',
      size: 'text-xl',
      shadow: 'drop-shadow-[0_2px_6px_rgba(156,163,175,0.6)]',
      icon: null,
      prefix: 'KAÇTI'
    },
    evade: {
      color: 'text-purple-400',
      size: 'text-xl',
      shadow: 'drop-shadow-[0_2px_6px_rgba(192,132,252,0.8)]',
      icon: null,
      prefix: 'SAVUŞTURDU'
    }
  };

  // Element-based styling
  const elementConfig = {
    fire: {
      color: 'text-orange-500',
      icon: Flame,
      glow: 'drop-shadow-[0_4px_12px_rgba(249,115,22,1)]'
    },
    ice: {
      color: 'text-cyan-400',
      icon: Snowflake,
      glow: 'drop-shadow-[0_4px_12px_rgba(34,211,238,1)]'
    },
    lightning: {
      color: 'text-yellow-300',
      icon: Zap,
      glow: 'drop-shadow-[0_4px_12px_rgba(253,224,71,1)]'
    },
    poison: {
      color: 'text-green-500',
      icon: Droplet,
      glow: 'drop-shadow-[0_4px_12px_rgba(34,197,94,1)]'
    },
    physical: {
      color: 'text-white',
      icon: null,
      glow: 'drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]'
    }
  };

  const config = typeConfig[type];
  const elementStyle = elementConfig[element];
  const Icon = config.icon || elementStyle.icon;

  // Animation variants based on type
  const getAnimationVariant = () => {
    switch (type) {
      case 'critical':
        return {
          initial: {
            opacity: 0,
            scale: 0.5,
            y: 0,
            x: 0,
            rotate: -10
          },
          animate: {
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1.5, 1.3, 1.3, 1.1],
            y: [-10, -40, -60, -80, -100],
            x: [0, 5, -5, 3, 0],
            rotate: [-10, 10, -5, 5, 0]
          },
          transition: {
            duration: 2,
            times: [0, 0.2, 0.5, 0.8, 1],
            ease: 'easeOut'
          }
        };
      case 'heal':
        return {
          initial: { opacity: 0, scale: 0.8, y: 0 },
          animate: {
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 1.1, 1],
            y: [0, -20, -40, -60]
          },
          transition: {
            duration: 1.5,
            ease: 'easeOut'
          }
        };
      case 'blocked':
      case 'miss':
      case 'evade':
        return {
          initial: { opacity: 0, scale: 0.5, x: 0, y: 0 },
          animate: {
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.3, 1.2, 1],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            y: [0, -15, -25, -35]
          },
          transition: {
            duration: 1.2,
            ease: 'easeOut'
          }
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.7, y: 0 },
          animate: {
            opacity: [0, 1, 1, 1, 0],
            scale: [0.7, 1.2, 1.1, 1.05, 1],
            y: [0, -20, -40, -60, -80]
          },
          transition: {
            duration: 1.8,
            times: [0, 0.15, 0.4, 0.7, 1],
            ease: 'easeOut'
          }
        };
    }
  };

  const variant = getAnimationVariant();

  return (
    <motion.div
      className="fixed pointer-events-none z-50 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      initial={variant.initial}
      animate={variant.animate}
      transition={variant.transition}
    >
      <div className={`flex flex-col items-center gap-1 font-black ${config.size} ${element !== 'physical' && type === 'damage' ? elementStyle.color : config.color} ${element !== 'physical' && type === 'damage' ? elementStyle.glow : config.shadow}`}>
        {/* Icon */}
        {Icon && (
          <Icon className={`${type === 'critical' ? 'w-8 h-8' : 'w-6 h-6'} mb-1`} />
        )}

        {/* Prefix (CRITICAL!, ENGELLENDI, etc.) */}
        {config.prefix && (
          <div className="text-xs font-bold tracking-wider">
            {config.prefix}
          </div>
        )}

        {/* Amount */}
        {type !== 'miss' && type !== 'evade' && type !== 'blocked' && (
          <div className="flex items-center gap-1">
            {config.prefix && type === 'heal' && <span>+</span>}
            <span style={{
              WebkitTextStroke: type === 'critical' ? '2px black' : '1px black',
            }}>
              {Math.abs(Math.floor(amount))}
            </span>
          </div>
        )}

        {/* Critical Hit Animation */}
        {type === 'critical' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/30 blur-xl"
            animate={{
              scale: [1, 2, 3],
              opacity: [0.8, 0.4, 0]
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

// Manager component to handle multiple damage numbers
export function DamageNumberManager() {
  const [damageNumbers, setDamageNumbers] = useState<DamageNumberProps[]>([]);

  // Expose method to add damage numbers
  useEffect(() => {
    const handleAddDamage = (event: CustomEvent<Omit<DamageNumberProps, 'id' | 'onComplete'>>) => {
      const newDamage: DamageNumberProps = {
        ...event.detail,
        id: `damage-${Date.now()}-${Math.random()}`,
        onComplete: () => {
          setDamageNumbers(prev => prev.filter(d => d.id !== newDamage.id));
        }
      };
      setDamageNumbers(prev => [...prev, newDamage]);
    };

    window.addEventListener('showDamage' as any, handleAddDamage);
    return () => {
      window.removeEventListener('showDamage' as any, handleAddDamage);
    };
  }, []);

  return (
    <AnimatePresence>
      {damageNumbers.map(damage => (
        <FloatingDamageNumber key={damage.id} {...damage} />
      ))}
    </AnimatePresence>
  );
}

// Utility function to trigger damage numbers
export function showDamageNumber(
  amount: number,
  type: DamageNumberProps['type'],
  position: { x: number; y: number },
  element?: DamageNumberProps['element']
) {
  const event = new CustomEvent('showDamage', {
    detail: { amount, type, position, element }
  });
  window.dispatchEvent(event);
}
