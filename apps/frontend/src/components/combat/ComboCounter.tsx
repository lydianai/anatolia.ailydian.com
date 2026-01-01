/**
 * ANADOLU REALM - Combo Counter Component
 * Visual feedback for combo chains and multipliers
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Swords, Zap } from 'lucide-react';

export interface ComboCounterProps {
  comboCount: number;
  maxCombo?: number;
  onComboEnd?: () => void;
  timeoutDuration?: number; // milliseconds
}

export default function ComboCounter({
  comboCount,
  maxCombo = 10,
  onComboEnd,
  timeoutDuration = 3000
}: ComboCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prevCombo, setPrevCombo] = useState(0);

  useEffect(() => {
    if (comboCount > 0) {
      setIsVisible(true);

      // Reset timer on combo increase
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComboEnd?.();
      }, timeoutDuration);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [comboCount, timeoutDuration, onComboEnd]);

  // Trigger animation on combo increase
  const comboIncreased = comboCount > prevCombo;
  useEffect(() => {
    setPrevCombo(comboCount);
  }, [comboCount]);

  // Calculate multiplier (10% per combo hit)
  const multiplier = 1 + (comboCount - 1) * 0.1;

  // Color based on combo level
  const getComboColor = () => {
    if (comboCount >= 10) return 'from-purple-500 via-pink-500 to-red-500';
    if (comboCount >= 7) return 'from-red-500 via-orange-500 to-yellow-500';
    if (comboCount >= 5) return 'from-orange-500 via-yellow-500 to-amber-500';
    if (comboCount >= 3) return 'from-yellow-500 via-amber-500 to-orange-500';
    return 'from-white via-gray-200 to-gray-300';
  };

  const getGlowColor = () => {
    if (comboCount >= 10) return 'shadow-[0_0_30px_rgba(168,85,247,1)]';
    if (comboCount >= 7) return 'shadow-[0_0_25px_rgba(239,68,68,1)]';
    if (comboCount >= 5) return 'shadow-[0_0_20px_rgba(249,115,22,1)]';
    if (comboCount >= 3) return 'shadow-[0_0_15px_rgba(234,179,8,1)]';
    return 'shadow-[0_0_10px_rgba(255,255,255,0.8)]';
  };

  return (
    <AnimatePresence>
      {isVisible && comboCount > 0 && (
        <motion.div
          className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Main Container */}
          <div className="relative">
            {/* Glow Effect */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${getComboColor()} blur-2xl ${getGlowColor()}`}
              animate={{
                scale: comboIncreased ? [1, 1.5, 1] : 1,
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                scale: { duration: 0.3 },
                opacity: { duration: 1.5, repeat: Infinity }
              }}
            />

            {/* Content */}
            <div className="relative bg-black/80 backdrop-blur-md rounded-2xl px-8 py-6 border-2 border-white/20">
              {/* Icon */}
              <div className="flex justify-center mb-2">
                <motion.div
                  animate={comboIncreased ? {
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.3, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Swords className={`w-8 h-8 text-transparent bg-gradient-to-r ${getComboColor()} bg-clip-text`} />
                </motion.div>
              </div>

              {/* Combo Text */}
              <div className="text-center space-y-1">
                <motion.div
                  className={`text-6xl font-black bg-gradient-to-r ${getComboColor()} bg-clip-text text-transparent`}
                  style={{
                    WebkitTextStroke: '2px rgba(0,0,0,0.5)',
                  }}
                  animate={comboIncreased ? {
                    scale: [1, 1.3, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {comboCount}x
                </motion.div>

                <div className="text-sm font-bold text-white/90 tracking-wider">
                  KOMBO
                </div>

                {/* Multiplier */}
                <motion.div
                  className="text-xl font-bold text-yellow-400"
                  animate={{
                    scale: comboIncreased ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  +{Math.floor((multiplier - 1) * 100)}% Hasar
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${getComboColor()}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(comboCount / maxCombo) * 100}%` }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                />
              </div>

              {/* Combo Level Messages */}
              <AnimatePresence>
                {comboCount === 3 && (
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-sm whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ⚡ İYİ!
                  </motion.div>
                )}
                {comboCount === 5 && (
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-orange-400 font-bold text-base whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    🔥 HARIKA!
                  </motion.div>
                )}
                {comboCount === 7 && (
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-red-400 font-bold text-lg whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    💥 MÜTHİŞ!
                  </motion.div>
                )}
                {comboCount >= 10 && (
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-purple-400 font-bold text-xl whitespace-nowrap"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [0.8, 1.2, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{
                      scale: { duration: 0.5, repeat: Infinity, repeatDelay: 1 }
                    }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ⭐ EFSANE!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Particle Effects for High Combos */}
            {comboCount >= 5 && (
              <>
                {[...Array(comboCount >= 10 ? 8 : comboCount >= 7 ? 6 : 4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${getComboColor()}`}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(i * (360 / (comboCount >= 10 ? 8 : comboCount >= 7 ? 6 : 4)) * Math.PI / 180) * 100],
                      y: [0, Math.sin(i * (360 / (comboCount >= 10 ? 8 : comboCount >= 7 ? 6 : 4)) * Math.PI / 180) * 100],
                      opacity: [1, 0],
                      scale: [0, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
