"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/**
 * 3D GAME MODE PAGE
 * ANADOLU REALM - Premium 3D Experience
 
 *
 * Features:
 * - Full 3D Istanbul Taksim environment
 * - Three.js powered characters
 * - Realistic lighting and shadows
 * - Turkish cultural landmarks
 * - Toggle between 2D/3D modes
 */

// Dynamic import to avoid SSR issues with Three.js
const Game3DWorld = dynamic(() => import("@/components/game/Game3DWorld"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-turkish-red to-turkish-gold">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        <div className="text-white text-xl font-bold font-orbitron">3D Dünya Yükleniyor...</div>
        <div className="text-white/80 text-sm mt-2">İstanbul Taksim hazırlanıyor</div>
      </div>
    </div>
  )
});

export default function Game3DPage() {
  const router = useRouter();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* 3D World */}
      <Suspense fallback={null}>
        <Game3DWorld />
      </Suspense>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg border border-turkish-gold"
          >
            <div className="text-turkish-gold font-orbitron font-bold text-lg">
              🇹🇷 ANADOLU REALM
            </div>
            <div className="text-white/60 text-xs mt-1">
              powered by Lydian
            </div>
          </motion.div>
        </div>

        {/* Mode Toggle */}
        <div className="pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/game")}
            className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg border border-turkish-blue hover:border-turkish-gold transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎮</div>
              <div>
                <div className="text-white font-bold text-sm group-hover:text-turkish-gold transition-colors">
                  2D Moda Geç
                </div>
                <div className="text-white/60 text-xs">
                  Pixel Art Deneyimi
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Stats Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 left-4 space-y-2 pointer-events-none"
      >
        <div className="bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-turkish-red/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-turkish-gold to-turkish-red flex items-center justify-center text-white font-bold text-lg">
              25
            </div>
            <div>
              <div className="text-white font-bold text-sm">AhmetYılmaz</div>
              <div className="text-turkish-gold text-xs">Yazılımcı</div>
            </div>
          </div>

          {/* Health bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80">Sağlık</span>
              <span className="text-turkish-red font-bold">850/1000</span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-turkish-red to-red-400"
                style={{ width: "85%" }}
              />
            </div>
          </div>

          {/* Mana bar */}
          <div className="space-y-1 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80">Mana</span>
              <span className="text-turkish-blue font-bold">620/800</span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-turkish-blue to-blue-400"
                style={{ width: "77.5%" }}
              />
            </div>
          </div>

          {/* XP bar */}
          <div className="space-y-1 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80">Deneyim</span>
              <span className="text-turkish-gold font-bold">8450/10000</span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-turkish-gold to-yellow-400 animate-pulse"
                style={{ width: "84.5%" }}
              />
            </div>
          </div>
        </div>

        {/* Active Quests */}
        <div className="bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-turkish-gold/50">
          <div className="text-turkish-gold font-bold text-sm mb-2 flex items-center gap-2">
            <span>📜</span>
            Aktif Görevler
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="text-white/80">İstanbul'u Keşfet (3/5)</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="text-white/80">10 NPC ile Konuş (7/10)</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="text-white/80">Taksim Anıtını Bul (0/1)</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute bottom-4 right-4 w-80 bg-black/70 backdrop-blur-sm rounded-lg border border-turkish-blue/50 overflow-hidden"
      >
        <div className="px-4 py-2 bg-turkish-blue/20 border-b border-turkish-blue/50">
          <div className="text-white font-bold text-sm flex items-center gap-2">
            <span>💬</span>
            Sohbet
            <div className="ml-auto text-xs text-white/60">12 oyuncu</div>
          </div>
        </div>

        <div className="p-3 space-y-2 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-turkish-gold/50">
          {[
            { user: "MehmetDemir", msg: "Taksim'de birisi var mı?", time: "2 dk önce" },
            { user: "AyşeKara", msg: "Ben varım! Çay evi önündeyim", time: "1 dk önce" },
            { user: "FatihYılmaz", msg: "Geldim, görüşelim", time: "Az önce" }
          ].map((chat, i) => (
            <div key={i} className="text-xs">
              <div className="flex items-baseline gap-2">
                <span className="text-turkish-gold font-bold">{chat.user}:</span>
                <span className="text-white/80">{chat.msg}</span>
              </div>
              <div className="text-white/40 text-[10px] mt-0.5">{chat.time}</div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-turkish-blue/50">
          <input
            type="text"
            placeholder="Mesaj yaz..."
            className="w-full bg-black/50 text-white px-3 py-2 rounded-lg border border-white/10 focus:border-turkish-gold focus:outline-none text-sm placeholder-white/40"
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 flex gap-2"
      >
        <button className="bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-turkish-red/50 hover:border-turkish-red hover:scale-105 transition-all group">
          <div className="text-2xl mb-1">⚔️</div>
          <div className="text-white text-xs font-bold group-hover:text-turkish-red transition-colors">Saldır</div>
        </button>

        <button className="bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-turkish-blue/50 hover:border-turkish-blue hover:scale-105 transition-all group">
          <div className="text-2xl mb-1">🎒</div>
          <div className="text-white text-xs font-bold group-hover:text-turkish-blue transition-colors">Envanter</div>
        </button>

        <button className="bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-turkish-gold/50 hover:border-turkish-gold hover:scale-105 transition-all group">
          <div className="text-2xl mb-1">🗺️</div>
          <div className="text-white text-xs font-bold group-hover:text-turkish-gold transition-colors">Harita</div>
        </button>

        <button className="bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-green-500/50 hover:border-green-500 hover:scale-105 transition-all group">
          <div className="text-2xl mb-1">👥</div>
          <div className="text-white text-xs font-bold group-hover:text-green-500 transition-colors">Sosyal</div>
        </button>
      </motion.div>

      {/* Minimap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-20 right-4 w-48 h-48 bg-black/70 backdrop-blur-sm rounded-lg border border-turkish-gold/50 overflow-hidden"
      >
        <div className="px-3 py-2 bg-turkish-gold/20 border-b border-turkish-gold/50">
          <div className="text-white font-bold text-xs flex items-center gap-2">
            <span>🗺️</span>
            Mini Harita
          </div>
        </div>

        <div className="relative w-full h-full p-2">
          {/* Map background */}
          <div className="absolute inset-2 bg-gradient-to-br from-green-900/50 to-green-700/30 rounded" />

          {/* Player marker (center) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-turkish-blue rounded-full border-2 border-white animate-pulse" />
          </div>

          {/* Other players */}
          <div className="absolute top-1/3 left-1/3">
            <div className="w-2 h-2 bg-turkish-gold rounded-full" />
          </div>
          <div className="absolute top-2/3 left-2/3">
            <div className="w-2 h-2 bg-turkish-gold rounded-full" />
          </div>

          {/* Landmarks */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
            <div className="w-2 h-2 bg-turkish-red rounded-sm" title="Taksim Anıtı" />
          </div>

          {/* Compass */}
          <div className="absolute top-2 right-2 text-white/60 text-[10px] font-bold">
            N
          </div>
        </div>
      </motion.div>

      {/* FPS Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white/60 text-xs font-mono pointer-events-none">
        60 FPS | 3D Mode
      </div>
    </div>
  );
}
