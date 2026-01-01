/**
 * TÜRK DİJİTAL METROPOL - Minimap HUD
 *
 * Radar-style minimap with Turkish locations
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, MapPin } from 'lucide-react';

interface MinimapProps {
  playerPosition: { x: number; y: number };
  playerRotation: number;
  nearbyPlayers?: Array<{ x: number; y: number; name: string }>;
  nearbyLocations?: Array<{ x: number; y: number; name: string; type: string }>;
  size?: number;
}

export const Minimap: React.FC<MinimapProps> = ({
  playerPosition,
  playerRotation,
  nearbyPlayers = [],
  nearbyLocations = [],
  size = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background with Turkish pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, size, size);

    // Draw grid
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let i = 0; i <= size; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    // Draw nearby locations
    nearbyLocations.forEach((location) => {
      const x = (location.x / 1000) * size;
      const y = (location.y / 1000) * size;

      ctx.fillStyle = 'rgba(0, 151, 215, 0.6)';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw nearby players
    nearbyPlayers.forEach((player) => {
      const x = (player.x / 1000) * size;
      const y = (player.y / 1000) * size;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw player (center)
    const centerX = size / 2;
    const centerY = size / 2;

    // Player direction indicator
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(playerRotation);

    // Player triangle
    ctx.fillStyle = '#E30A17';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(-5, 5);
    ctx.lineTo(5, 5);
    ctx.closePath();
    ctx.fill();

    // Player border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // Draw compass circle
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
    ctx.stroke();
  }, [playerPosition, playerRotation, nearbyPlayers, nearbyLocations, size]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl z-50"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Compass className="w-5 h-5 text-[#D4AF37]" />
        <span className="text-white font-semibold text-sm">Harita</span>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-xl border border-white/10"
        />

        {/* Cardinal Directions */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
          K
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
          G
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
          B
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">
          D
        </div>
      </div>

      {/* Stats */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-400">
          <Users className="w-3 h-3" />
          <span>{nearbyPlayers.length}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <MapPin className="w-3 h-3" />
          <span>{nearbyLocations.length}</span>
        </div>
        <div className="text-[#D4AF37] font-semibold">
          {playerPosition.x}, {playerPosition.y}
        </div>
      </div>
    </motion.div>
  );
};
