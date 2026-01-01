/**
 * TÜRK DİJİTAL METROPOL - Quest Tracker HUD
 *
 * Expandable quest list with checkmark animations
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle, MapPin } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  location?: string;
  rewards: {
    gold?: number;
    experience?: number;
  };
}

interface QuestTrackerProps {
  quests: Quest[];
}

export const QuestTracker: React.FC<QuestTrackerProps> = ({ quests }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 w-96 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8960F] rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold">Görevler</h3>
            <p className="text-gray-400 text-sm">{quests.length} aktif görev</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      {/* Quest List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10"
          >
            <div className="max-h-96 overflow-y-auto p-4 space-y-3">
              {quests.map((quest, index) => (
                <QuestItem key={quest.id} quest={quest} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Quest Item Component
interface QuestItemProps {
  quest: Quest;
  index: number;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, index }) => {
  const isCompleted = quest.progress >= quest.maxProgress;
  const progressPercent = (quest.progress / quest.maxProgress) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
    >
      {/* Quest Header */}
      <div className="flex items-start gap-3 mb-2">
        <motion.div
          animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          ) : (
            <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
          )}
        </motion.div>
        <div className="flex-1">
          <h4 className={`font-semibold ${isCompleted ? 'text-green-500 line-through' : 'text-white'}`}>
            {quest.title}
          </h4>
          <p className="text-gray-400 text-sm mt-1">{quest.description}</p>
        </div>
      </div>

      {/* Location */}
      {quest.location && (
        <div className="flex items-center gap-2 text-[#0097D7] text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{quest.location}</span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white text-sm">İlerleme</span>
          <span className="text-gray-400 text-sm">
            {quest.progress} / {quest.maxProgress}
          </span>
        </div>
        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-[#D4AF37] to-[#B8960F]'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Rewards */}
      {(quest.rewards.gold || quest.rewards.experience) && (
        <div className="flex items-center gap-4 text-sm">
          {quest.rewards.gold && (
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <span className="font-bold">+{quest.rewards.gold}</span>
              <span>Altın</span>
            </div>
          )}
          {quest.rewards.experience && (
            <div className="flex items-center gap-1 text-blue-400">
              <span className="font-bold">+{quest.rewards.experience}</span>
              <span>XP</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
