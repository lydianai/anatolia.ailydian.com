'use client';

import * as React from 'react';
import { useGameStore, selectCharacter, selectNearbyPlayers } from '@/lib/store/gameStore';

export function Minimap() {
  const character = useGameStore(selectCharacter);
  const nearbyPlayers = useGameStore(selectNearbyPlayers);

  if (!character) return null;

  const mapSize = 200;
  const scale = 0.5;

  return (
    <div className="absolute top-4 right-4 w-[200px] h-[200px] bg-black/80 backdrop-blur-sm rounded-lg border border-turkish-red/30 p-2">
      <div className="text-white text-xs font-semibold mb-2 text-center border-b border-turkish-red/30 pb-1">
        Harita
      </div>

      <div className="relative w-full h-[160px] bg-gray-900/50 rounded overflow-hidden">
        {/* Grid */}
        <svg className="absolute inset-0" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(227, 10, 23, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Current player (center) */}
        <div
          className="absolute w-3 h-3 bg-turkish-red rounded-full border-2 border-white shadow-lg"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Nearby players */}
        {nearbyPlayers.map((player) => {
          const relX = (player.position.x - character.position.x) * scale;
          const relY = (player.position.y - character.position.y) * scale;

          return (
            <div
              key={player.id}
              className="absolute w-2 h-2 bg-green-500 rounded-full border border-white"
              style={{
                left: `calc(50% + ${relX}px)`,
                top: `calc(50% + ${relY}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              title={player.displayName}
            />
          );
        })}

        {/* Compass */}
        <div className="absolute top-1 right-1 text-white text-xs font-bold">
          K
        </div>
      </div>
    </div>
  );
}
