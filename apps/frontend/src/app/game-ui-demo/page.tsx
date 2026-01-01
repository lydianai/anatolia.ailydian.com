"use client";

/**
 * GAME UI DEMO - Complete Game Interface Showcase
 * Turkish Digital Metropol - Interactive Game Dashboard
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedInventory, EXAMPLE_ITEMS } from "@/components/game/AnimatedInventory";
import { AnimatedChatBox, EXAMPLE_MESSAGES } from "@/components/game/AnimatedChatBox";
import { CharacterCard } from "@/components/ui/animations/AnimatedCard";
import { ToastProvider, useToast } from "@/components/ui/animations/Toast";
import { ProgressBar } from "@/components/ui/animations/LoadingAnimations";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

// PLAYER STATS PANEL

const PlayerStatsPanel = () => {
  const [health, setHealth] = useState(85);
  const [mana, setMana] = useState(60);
  const [xp, setXp] = useState(75);

  return (
    <motion.div
      className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      {/* Player Info */}
      <div className="mb-6 flex items-center gap-4">
        {/* Avatar with level ring */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-red-600 bg-gradient-to-br from-red-500 to-red-700">
            <div className="flex h-full items-center justify-center text-4xl">⚔️</div>
          </div>

          {/* Level badge */}
          <motion.div
            className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 text-sm font-bold text-white shadow-lg"
            animate={{
              boxShadow: [
                "0 0 10px rgba(245, 158, 11, 0.5)",
                "0 0 20px rgba(245, 158, 11, 0.8)",
                "0 0 10px rgba(245, 158, 11, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            45
          </motion.div>

          {/* Rotating ring */}
          <motion.div
            className="pointer-events-none absolute -inset-2 rounded-full border-2 border-dashed border-yellow-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Name & Title */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">OsmanlıAslanı</h2>
          <p className="text-sm text-gray-400">Yeniçeri Savaşçısı</p>
        </div>

        {/* Settings button */}
        <motion.button
          className="rounded-lg bg-slate-700 p-3 text-white hover:bg-slate-600"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ⚙️
        </motion.button>
      </div>

      {/* Stats Bars */}
      <div className="space-y-4">
        {/* Health */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-semibold text-red-400">Can</span>
            <motion.span
              className="font-bold text-white"
              key={health}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {health}/100
            </motion.span>
          </div>
          <ProgressBar progress={health} color="#ef4444" showLabel={false} animated />
        </div>

        {/* Mana */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-semibold text-blue-400">Mana</span>
            <motion.span
              className="font-bold text-white"
              key={mana}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {mana}/100
            </motion.span>
          </div>
          <ProgressBar progress={mana} color="#3b82f6" showLabel={false} animated />
        </div>

        {/* XP */}
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-semibold text-yellow-400">Deneyim</span>
            <motion.span
              className="font-bold text-white"
              key={xp}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {xp}%
            </motion.span>
          </div>
          <ProgressBar progress={xp} color="#f59e0b" showLabel={false} animated />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[
          { label: "Savaş", icon: "⚔️", color: "bg-red-600" },
          { label: "İksir", icon: "🧪", color: "bg-green-600" },
          { label: "Beceri", icon: "✨", color: "bg-purple-600" },
          { label: "Büyü", icon: "🔮", color: "bg-blue-600" },
        ].map((action, i) => (
          <motion.button
            key={i}
            className={`flex items-center justify-center gap-2 rounded-lg ${action.color} py-3 font-semibold text-white`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (action.label === "İksir") {
                setHealth(Math.min(100, health + 15));
              } else if (action.label === "Beceri") {
                setMana(Math.max(0, mana - 20));
              }
            }}
          >
            <span className="text-xl">{action.icon}</span>
            {action.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// MINI MAP

const MiniMap = () => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-2xl"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <h3 className="mb-3 text-lg font-bold text-white">Mini Harita</h3>

      {/* Map */}
      <div className="relative h-40 overflow-hidden rounded-lg bg-slate-700/50">
        {/* Grid */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>
              <div
                className="absolute border-t border-slate-600/30"
                style={{ top: `${i * 10}%`, width: "100%" }}
              />
              <div
                className="absolute border-l border-slate-600/30"
                style={{ left: `${i * 10}%`, height: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* Player marker */}
        <motion.div
          className="absolute z-10 flex h-4 w-4 items-center justify-center"
          style={{
            left: `${playerPos.x}%`,
            top: `${playerPos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg" />
          <motion.div
            className="absolute h-6 w-6 rounded-full border-2 border-red-500"
            animate={{
              scale: [1, 2, 2],
              opacity: [0.8, 0, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Enemy markers */}
        {[
          { x: 30, y: 40 },
          { x: 70, y: 60 },
          { x: 50, y: 20 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-orange-500"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Quest marker */}
        <motion.div
          className="absolute flex h-6 w-6 items-center justify-center"
          style={{ left: "80%", top: "30%" }}
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xl">📍</span>
        </motion.div>
      </div>

      {/* Compass */}
      <motion.div
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-red-500">N</span>
      </motion.div>
    </motion.div>
  );
};

// QUEST PANEL

const QuestPanel = () => {
  const { success } = useToast();

  const quests = [
    { id: 1, title: "Yeniçeri Ordusuna Katıl", progress: 3, total: 5, reward: "500 XP" },
    { id: 2, title: "Osmanlı Hazinesini Koru", progress: 1, total: 3, reward: "1000 Gold" },
    { id: 3, title: "5 Düşmanı Yok Et", progress: 5, total: 5, reward: "Epic Item" },
  ];

  return (
    <motion.div
      className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <h3 className="mb-4 text-lg font-bold text-white">Görevler</h3>

      <div className="space-y-3">
        {quests.map((quest, index) => {
          const isComplete = quest.progress >= quest.total;

          return (
            <motion.div
              key={quest.id}
              className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
              variants={scaleIn}
              whileHover={{ scale: 1.02, borderColor: "#dc2626" }}
            >
              <div className="mb-2 flex items-start justify-between">
                <h4 className="flex-1 font-semibold text-white">{quest.title}</h4>
                {isComplete && (
                  <motion.span
                    className="text-xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring" }}
                  >
                    ✅
                  </motion.span>
                )}
              </div>

              <div className="mb-2">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-400">İlerleme</span>
                  <span className="font-bold text-white">
                    {quest.progress}/{quest.total}
                  </span>
                </div>
                <ProgressBar
                  progress={(quest.progress / quest.total) * 100}
                  height={6}
                  showLabel={false}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-400">🎁 {quest.reward}</span>
                {isComplete && (
                  <motion.button
                    className="rounded bg-green-600 px-3 py-1 text-xs font-semibold text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => success(`${quest.reward} kazandınız!`)}
                  >
                    Al
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// MAIN DASHBOARD

export default function GameUIDemo() {
  const [showInventory, setShowInventory] = useState(true);
  const [showChat, setShowChat] = useState(true);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-6">
        {/* Header */}
        <motion.div
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-4xl font-black text-transparent">
            TÜRK DİJİTAL METROPOL
          </h1>

          {/* Toggle buttons */}
          <div className="flex gap-2">
            <motion.button
              className={`rounded-lg px-4 py-2 font-semibold ${
                showInventory ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300"
              }`}
              onClick={() => setShowInventory(!showInventory)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎒 Envanter
            </motion.button>
            <motion.button
              className={`rounded-lg px-4 py-2 font-semibold ${
                showChat ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300"
              }`}
              onClick={() => setShowChat(!showChat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 Sohbet
            </motion.button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6">
            <PlayerStatsPanel />
            <MiniMap />
            <QuestPanel />
          </div>

          {/* Middle Column - Inventory */}
          <AnimatePresence mode="wait">
            {showInventory && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <AnimatedInventory items={EXAMPLE_ITEMS} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Column - Chat */}
          <AnimatePresence mode="wait">
            {showChat && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
              >
                <AnimatedChatBox messages={EXAMPLE_MESSAGES} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToastProvider>
  );
}
