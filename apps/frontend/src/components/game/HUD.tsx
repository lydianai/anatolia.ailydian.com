'use client';

import * as React from 'react';
import { Heart, Droplet, Zap, User, MapPin } from 'lucide-react';
import { useGameStore } from '@/lib/store/gameStore';
import { formatPercentage, getHealthColor, formatXP } from '@/lib/utils/format';

export function HUD() {
  const character = useGameStore(state => state.currentCharacter);

  if (!character) return null;

  const healthPercent = formatPercentage(character.health, character.maxHealth);
  const manaPercent = formatPercentage(character.mana, character.maxMana);

  return (
    <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto">
        {/* Character Info */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-turkish-red/30">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-turkish-red flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>

            {/* Stats */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-lg">
                  {character.name}
                </span>
                <span className="text-turkish-gold font-bold">
                  Lv. {character.level}
                </span>
              </div>

              {/* Health Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Heart className="w-3 h-3" />
                  <span>Can</span>
                  <span className="ml-auto">
                    {character.health} / {character.maxHealth}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getHealthColor(healthPercent)}`}
                    style={{ width: `${healthPercent}%` }}
                  />
                </div>
              </div>

              {/* Mana Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Droplet className="w-3 h-3" />
                  <span>Mana</span>
                  <span className="ml-auto">
                    {character.mana} / {character.maxMana}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${manaPercent}%` }}
                  />
                </div>
              </div>

              {/* Experience Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Zap className="w-3 h-3" />
                  <span>Deneyim</span>
                  <span className="ml-auto">{formatXP(character.experience)}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-turkish-gold transition-all duration-300"
                    style={{ width: `${(character.experience % 1000) / 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position (Debug) */}
        <div className="mt-2 bg-black/30 backdrop-blur-sm rounded px-3 py-1 text-xs text-white/60 font-mono inline-flex items-center gap-2">
          <MapPin className="w-3 h-3" />
          X: {Math.round(character.position.x)} Y: {Math.round(character.position.y)}
        </div>
      </div>
    </div>
  );
}
