"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getNPCDialogSystem, NPC, Dialog } from "@/lib/npc/NPCDialogSystem";

/**
 * NPC DIALOG PANEL - ANADOLU REALM
 
 *
 * Features:
 * - Interactive Turkish NPC conversations
 * - Dialog tree navigation
 * - Relationship tracking
 * - Quest integration
 * - Authentic Turkish expressions
 */

export function NPCDialogPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNPC, setCurrentNPC] = useState<NPC | null>(null);
  const [currentDialog, setCurrentDialog] = useState<Dialog | null>(null);
  const [nearbyNPCs, setNearbyNPCs] = useState<NPC[]>([]);

  const dialogSystem = getNPCDialogSystem();

  useEffect(() => {
    // Load nearby NPCs (mock - will be replaced with actual distance calculation)
    const npcs = dialogSystem.getNPCsByLocation('zone_istanbul_taksim');
    setNearbyNPCs(npcs);

    // Set up dialog update callback
    dialogSystem.setDialogUpdateCallback((npc, dialog) => {
      setCurrentNPC(npc);
      setCurrentDialog(dialog);
    });
  }, []);

  const handleStartConversation = (npcId: string) => {
    const npc = dialogSystem.getNPC(npcId);
    const dialog = dialogSystem.startConversation(npcId);

    if (npc && dialog) {
      setCurrentNPC(npc);
      setCurrentDialog(dialog);
      setIsOpen(true);
    }
  };

  const handleSelectOption = (optionId: string) => {
    const nextDialog = dialogSystem.selectOption(optionId);

    if (!nextDialog) {
      // Conversation ended
      setTimeout(() => {
        setIsOpen(false);
        setCurrentNPC(null);
        setCurrentDialog(null);
      }, 500);
    } else {
      setCurrentDialog(nextDialog);
    }
  };

  const getEmotionEmoji = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'surprised': return '😲';
      case 'thinking': return '🤔';
      case 'excited': return '🤩';
      case 'funny': return '😄';
      default: return '😐';
    }
  };

  const getRelationshipColor = (relationship: number) => {
    if (relationship >= 80) return 'text-green-400';
    if (relationship >= 50) return 'text-turkish-gold';
    if (relationship >= 20) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRelationshipText = (relationship: number) => {
    if (relationship >= 80) return 'Yakın Arkadaş';
    if (relationship >= 50) return 'Dost';
    if (relationship >= 20) return 'Tanıdık';
    return 'Yabancı';
  };

  return (
    <>
      {/* NPC List Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 bottom-32 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-green-500 hover:border-white transition-all z-40 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">👥</span>
          <div className="text-left">
            <div className="text-white font-bold text-sm group-hover:text-green-500 transition-colors">
              NPC'ler
            </div>
            <div className="text-green-500 text-xs">
              {nearbyNPCs.length} yakında
            </div>
          </div>
        </div>
      </motion.button>

      {/* NPC Dialog Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!currentDialog) {
                  setIsOpen(false);
                }
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Dialog Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-gradient-to-br from-turkish-gold/10 to-turkish-red/10 backdrop-blur-md rounded-2xl border-2 border-turkish-gold/50 overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-turkish-gold/20 to-turkish-red/20 px-6 py-4 border-b border-turkish-gold/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {currentNPC ? (
                      <>
                        <div className="text-4xl">{currentNPC.avatar}</div>
                        <div>
                          <h3 className="text-white font-orbitron font-bold text-xl">
                            {currentNPC.name}
                          </h3>
                          <p className="text-turkish-gold text-sm">{currentNPC.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`text-xs ${getRelationshipColor(currentNPC.relationship)}`}>
                              ❤️ {getRelationshipText(currentNPC.relationship)} ({currentNPC.relationship}/100)
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <h3 className="text-white font-orbitron font-bold text-xl">
                          Yakındaki NPC'ler
                        </h3>
                        <p className="text-turkish-gold text-sm">Konuşmak için birini seç</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (currentDialog) {
                        dialogSystem.endConversation();
                        setCurrentDialog(null);
                        setCurrentNPC(null);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="text-white/60 hover:text-white text-3xl leading-none transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-turkish-gold/50">
                {!currentNPC || !currentDialog ? (
                  // NPC List
                  <div className="space-y-3">
                    {nearbyNPCs.length === 0 ? (
                      <div className="text-center py-12 text-white/60">
                        <div className="text-6xl mb-4">👻</div>
                        <p>Yakında kimse yok.</p>
                        <p className="text-sm mt-2">Biraz dolaş, belki birileriyle karşılaşırsın!</p>
                      </div>
                    ) : (
                      nearbyNPCs.map((npc) => (
                        <motion.div
                          key={npc.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => handleStartConversation(npc.id)}
                          className="bg-black/50 backdrop-blur-sm border border-turkish-gold/30 hover:border-turkish-gold rounded-lg p-4 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-5xl">{npc.avatar}</div>
                            <div className="flex-1">
                              <div className="text-white font-bold text-lg group-hover:text-turkish-gold transition-colors">
                                {npc.name}
                              </div>
                              <div className="text-white/70 text-sm">{npc.title}</div>
                              <div className="text-white/50 text-xs mt-1">{npc.occupation}</div>

                              {/* Relationship */}
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-white/60">İlişki</span>
                                  <span className={getRelationshipColor(npc.relationship)}>
                                    {getRelationshipText(npc.relationship)}
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-turkish-gold to-green-400 transition-all"
                                    style={{ width: `${npc.relationship}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="text-turkish-gold text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                              💬
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                ) : (
                  // Active Dialog
                  <div className="space-y-6">
                    {/* Dialog Text */}
                    <motion.div
                      key={currentDialog.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/50 backdrop-blur-sm border border-turkish-gold/30 rounded-lg p-6"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="text-3xl">{getEmotionEmoji(currentDialog.emotion)}</div>
                        <div className="flex-1">
                          <p className="text-white text-lg leading-relaxed">
                            "{currentDialog.text}"
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Dialog Options */}
                    <div className="space-y-3">
                      <div className="text-turkish-gold text-sm font-bold mb-2">
                        💭 Ne söylemek istersin?
                      </div>

                      {currentDialog.options.map((option, index) => (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectOption(option.id)}
                          className="w-full text-left bg-gradient-to-r from-turkish-blue/20 to-turkish-blue/10 hover:from-turkish-gold/20 hover:to-turkish-gold/10 border border-turkish-blue/50 hover:border-turkish-gold rounded-lg p-4 transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <div className="w-2 h-2 rounded-full bg-turkish-blue group-hover:bg-turkish-gold transition-colors" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm group-hover:text-turkish-gold transition-colors">
                                {option.text}
                              </p>

                              {/* Show indicators */}
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                {option.questTrigger && (
                                  <span className="text-xs px-2 py-0.5 bg-green-500/20 border border-green-500/50 rounded-full text-green-400">
                                    📜 Görev Başlar
                                  </span>
                                )}
                                {option.relationshipChange && option.relationshipChange > 0 && (
                                  <span className="text-xs px-2 py-0.5 bg-pink-500/20 border border-pink-500/50 rounded-full text-pink-400">
                                    ❤️ +{option.relationshipChange}
                                  </span>
                                )}
                                {option.relationshipChange && option.relationshipChange < 0 && (
                                  <span className="text-xs px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded-full text-red-400">
                                    💔 {option.relationshipChange}
                                  </span>
                                )}
                                {option.endConversation && (
                                  <span className="text-xs px-2 py-0.5 bg-gray-500/20 border border-gray-500/50 rounded-full text-gray-400">
                                    🚪 Konuşma Biter
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-turkish-gold text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-turkish-gold/10 to-turkish-red/10 px-6 py-3 border-t border-turkish-gold/30">
                <p className="text-white/60 text-xs text-center">
                  powered by Lydian • ANADOLU REALM
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
