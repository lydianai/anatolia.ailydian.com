/**
 * TÜRK DİJİTAL METROPOL - Character Panel HUD
 *
 * Glassmorphic character stats panel with Turkish design
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Star, Shield } from 'lucide-react';

interface CharacterPanelProps {
  character: {
    name: string;
    level: number;
    class: string;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    experience: number;
    maxExperience: number;
    avatar?: string;
  };
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({ character }) => {
  const healthPercent = (character.health / character.maxHealth) * 100;
  const manaPercent = (character.mana / character.maxMana) * 100;
  const expPercent = (character.experience / character.maxExperience) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 left-4 w-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl z-50"
    >
      {/* Character Info */}
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8960F] rounded-full p-0.5">
            <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
              {character.avatar ? (
                <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
              ) : (
                <Shield className="w-8 h-8 text-[#D4AF37]" />
              )}
            </div>
          </div>
          {/* Level Badge */}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-[#E30A17] to-[#B60814] rounded-full flex items-center justify-center border-2 border-gray-900">
            <span className="text-white text-xs font-bold">{character.level}</span>
          </div>
        </div>

        {/* Name & Class */}
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg">{character.name}</h3>
          <p className="text-[#D4AF37] text-sm">{character.class}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        {/* Health Bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              <span className="text-white text-sm font-medium">Can</span>
            </div>
            <span className="text-white text-sm">
              {character.health} / {character.maxHealth}
            </span>
          </div>
          <div className="h-3 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${healthPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Mana Bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" fill="currentColor" />
              <span className="text-white text-sm font-medium">Mana</span>
            </div>
            <span className="text-white text-sm">
              {character.mana} / {character.maxMana}
            </span>
          </div>
          <div className="h-3 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${manaPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Experience Bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#D4AF37]" fill="currentColor" />
              <span className="text-white text-sm font-medium">Tecrübe</span>
            </div>
            <span className="text-white text-sm">
              {character.experience} / {character.maxExperience}
            </span>
          </div>
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8960F] relative"
              initial={{ width: 0 }}
              animate={{ width: `${expPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
