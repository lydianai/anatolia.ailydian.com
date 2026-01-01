"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getQuestEngine, Quest, QuestType } from "@/lib/quest/QuestEngine";

/**
 * QUEST PANEL - ANADOLU REALM
 
 *
 * Features:
 * - Main story quests tracker
 * - Side quests list
 * - Daily quests with timers
 * - Quest objectives progress
 * - Reward preview
 * - Turkish-themed UI
 */

export function QuestPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<QuestType>('main');
  const [quests, setQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const questEngine = getQuestEngine();

  useEffect(() => {
    // Load quests
    loadQuests();

    // Set up quest update callback
    questEngine.setQuestUpdateCallback((quest) => {
      loadQuests();
    });
  }, [activeTab]);

  const loadQuests = () => {
    const allQuests = questEngine.getQuestsByType(activeTab);
    setQuests(allQuests);
  };

  const handleAcceptQuest = (questId: string) => {
    if (questEngine.acceptQuest(questId)) {
      loadQuests();
    }
  };

  const handleAbandonQuest = (questId: string) => {
    questEngine.abandonQuest(questId);
    loadQuests();
    setSelectedQuest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 border-green-400';
      case 'active': return 'text-turkish-gold border-turkish-gold';
      case 'completed': return 'text-blue-400 border-blue-400';
      case 'locked': return 'text-gray-500 border-gray-500';
      default: return 'text-white border-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Mevcut';
      case 'active': return 'Aktif';
      case 'completed': return 'Tamamlandı';
      case 'locked': return 'Kilitli';
      default: return status;
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-32 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-turkish-gold hover:border-white transition-all z-40 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">📜</span>
          <div className="text-left">
            <div className="text-white font-bold text-sm group-hover:text-turkish-gold transition-colors">
              Görevler
            </div>
            <div className="text-turkish-gold text-xs">
              {questEngine.getActiveQuests().length} aktif
            </div>
          </div>
        </div>
      </motion.button>

      {/* Quest Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-4 top-52 w-96 max-h-[600px] bg-black/90 backdrop-blur-md rounded-lg border border-turkish-gold/50 overflow-hidden z-40 shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-turkish-gold/20 to-turkish-red/20 px-4 py-3 border-b border-turkish-gold/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-orbitron font-bold text-lg">Görev Defteri</h3>
                  <p className="text-turkish-gold text-xs mt-1">powered by Lydian</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-turkish-gold/30 bg-black/50">
              {[
                { type: 'main' as QuestType, label: 'Ana Hikaye', icon: '📖' },
                { type: 'side' as QuestType, label: 'Yan Görevler', icon: '⭐' },
                { type: 'daily' as QuestType, label: 'Günlük', icon: '📅' }
              ].map((tab) => (
                <button
                  key={tab.type}
                  onClick={() => {
                    setActiveTab(tab.type);
                    setSelectedQuest(null);
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-bold transition-all ${
                    activeTab === tab.type
                      ? 'bg-turkish-gold/20 text-turkish-gold border-b-2 border-turkish-gold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quest List */}
            <div className="overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-turkish-gold/50">
              {quests.length === 0 ? (
                <div className="p-8 text-center text-white/60">
                  <div className="text-4xl mb-2">🎯</div>
                  <p>Şu an {activeTab === 'main' ? 'ana hikaye' : activeTab === 'side' ? 'yan' : 'günlük'} görevi yok.</p>
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  {quests.map((quest) => (
                    <motion.div
                      key={quest.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedQuest(quest)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedQuest?.id === quest.id
                          ? 'bg-turkish-gold/10 border-turkish-gold'
                          : 'bg-black/50 border-white/10 hover:border-turkish-gold/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{quest.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-bold text-sm truncate">
                              {quest.title}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(quest.status)}`}>
                              {getStatusText(quest.status)}
                            </span>
                          </div>
                          <p className="text-white/70 text-xs line-clamp-2 mb-2">
                            {quest.description}
                          </p>

                          {/* Progress */}
                          {quest.status === 'active' && (
                            <div className="space-y-1">
                              {quest.objectives.map((obj) => (
                                <div key={obj.id} className="text-xs">
                                  <div className="flex items-center justify-between text-white/80 mb-1">
                                    <span className="truncate">{obj.description}</span>
                                    <span className="text-turkish-gold ml-2">
                                      {obj.current}/{obj.required}
                                    </span>
                                  </div>
                                  <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-turkish-gold to-yellow-400 transition-all"
                                      style={{ width: `${(obj.current / obj.required) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Level */}
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <span className="text-white/60">Level:</span>
                            <span className="text-turkish-gold font-bold">{quest.level}</span>

                            {quest.timeLimit && quest.status === 'active' && (
                              <>
                                <span className="text-white/60 ml-2">⏱️</span>
                                <span className="text-red-400 font-bold">
                                  {Math.floor((quest.timeLimit - (Date.now() - (quest.startedAt || 0))) / 1000 / 60 / 60)}s kaldı
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Quest Details */}
            <AnimatePresence>
              {selectedQuest && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-black/95 backdrop-blur-sm overflow-y-auto scrollbar-thin scrollbar-thumb-turkish-gold/50"
                >
                  <div className="p-4">
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedQuest(null)}
                      className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none"
                    >
                      ←
                    </button>

                    {/* Icon */}
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{selectedQuest.icon}</div>
                      <h3 className="text-white font-orbitron font-bold text-xl mb-1">
                        {selectedQuest.title}
                      </h3>
                      <div className={`inline-block text-xs px-3 py-1 rounded-full border ${getStatusColor(selectedQuest.status)}`}>
                        {getStatusText(selectedQuest.status)}
                      </div>
                    </div>

                    {/* Story */}
                    <div className="bg-turkish-gold/10 border border-turkish-gold/30 rounded-lg p-4 mb-4">
                      <p className="text-white/90 text-sm leading-relaxed italic">
                        "{selectedQuest.story}"
                      </p>
                    </div>

                    {/* Objectives */}
                    <div className="mb-4">
                      <h4 className="text-turkish-gold font-bold text-sm mb-2">📋 Hedefler:</h4>
                      <div className="space-y-2">
                        {selectedQuest.objectives.map((obj) => (
                          <div
                            key={obj.id}
                            className={`p-3 rounded-lg border ${
                              obj.completed
                                ? 'bg-green-500/10 border-green-500/30'
                                : 'bg-black/50 border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={obj.completed}
                                readOnly
                                className="w-4 h-4"
                              />
                              <span className="text-white text-sm flex-1">{obj.description}</span>
                              <span className="text-turkish-gold text-sm font-bold">
                                {obj.current}/{obj.required}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rewards */}
                    <div className="mb-4">
                      <h4 className="text-turkish-gold font-bold text-sm mb-2">🎁 Ödüller:</h4>
                      <div className="bg-black/50 border border-turkish-gold/30 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/80">Deneyim (XP):</span>
                          <span className="text-blue-400 font-bold">+{selectedQuest.rewards.xp}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/80">Altın:</span>
                          <span className="text-turkish-gold font-bold">+{selectedQuest.rewards.gold}</span>
                        </div>
                        {selectedQuest.rewards.items && (
                          <div>
                            <span className="text-white/80 text-sm">Eşyalar:</span>
                            <div className="mt-1 space-y-1">
                              {selectedQuest.rewards.items.map((item, i) => (
                                <div key={i} className="text-sm text-green-400">
                                  • {item.id} x{item.quantity}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedQuest.rewards.title && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/80">Unvan:</span>
                            <span className="text-purple-400 font-bold">"{selectedQuest.rewards.title}"</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      {selectedQuest.status === 'available' && (
                        <button
                          onClick={() => handleAcceptQuest(selectedQuest.id)}
                          className="w-full bg-gradient-to-r from-turkish-gold to-yellow-600 text-black font-bold py-3 rounded-lg hover:scale-105 transition-all"
                        >
                          Görevi Kabul Et
                        </button>
                      )}
                      {selectedQuest.status === 'active' && (
                        <button
                          onClick={() => handleAbandonQuest(selectedQuest.id)}
                          className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 rounded-lg hover:scale-105 transition-all"
                        >
                          Görevi Bırak
                        </button>
                      )}
                      {selectedQuest.status === 'locked' && (
                        <div className="w-full bg-gray-700 text-white/60 font-bold py-3 rounded-lg text-center">
                          🔒 Kilitli - Önce diğer görevleri tamamla
                        </div>
                      )}
                      {selectedQuest.status === 'completed' && (
                        <div className="w-full bg-green-600 text-white font-bold py-3 rounded-lg text-center">
                          ✅ Tamamlandı
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
