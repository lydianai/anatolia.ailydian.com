/**
 * ANADOLU REALM - Başarımlarım (My Achievements)
 * User's achievements and accomplishments page
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'combat' | 'exploration' | 'social' | 'games' | 'quests' | 'rare';
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  progressMax?: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

const mockAchievements: Achievement[] = [
  // Combat
  {
    id: 'first_kill',
    name: 'İlk Zafer',
    description: 'İlk düşmanını yendin',
    icon: '⚔️',
    category: 'combat',
    points: 10,
    unlocked: true,
    unlockedDate: '3 gün önce',
    rarity: 'common'
  },
  {
    id: 'kill_100',
    name: 'Yüzbaşı',
    description: '100 düşman yenildi',
    icon: '🎖️',
    category: 'combat',
    points: 50,
    unlocked: true,
    unlockedDate: '1 gün önce',
    progress: 100,
    progressMax: 100,
    rarity: 'uncommon'
  },
  {
    id: 'kill_1000',
    name: 'Binbaşı',
    description: '1000 düşman yenildi',
    icon: '🏅',
    category: 'combat',
    points: 200,
    unlocked: false,
    progress: 347,
    progressMax: 1000,
    rarity: 'rare'
  },

  // Exploration
  {
    id: 'visit_istanbul',
    name: 'İstanbul Gezgini',
    description: 'İstanbul\'un tüm bölgelerini keşfettin',
    icon: '🕌',
    category: 'exploration',
    points: 30,
    unlocked: true,
    unlockedDate: '2 saat önce',
    rarity: 'uncommon'
  },
  {
    id: 'explore_anatolia',
    name: 'Anadolu Kaşifi',
    description: 'Anadolu\'nun 50 farklı şehrini ziyaret ettin',
    icon: '🗺️',
    category: 'exploration',
    points: 100,
    unlocked: false,
    progress: 23,
    progressMax: 50,
    rarity: 'rare'
  },

  // Social
  {
    id: 'first_friend',
    name: 'Yoldaş',
    description: 'İlk arkadaşını ekledin',
    icon: '👥',
    category: 'social',
    points: 10,
    unlocked: true,
    unlockedDate: '1 hafta önce',
    rarity: 'common'
  },
  {
    id: 'guild_master',
    name: 'Lonca Lideri',
    description: 'Bir lonca kurdun',
    icon: '🛡️',
    category: 'social',
    points: 150,
    unlocked: false,
    rarity: 'epic'
  },

  // Games
  {
    id: 'tavla_win',
    name: 'Tavla Ustası',
    description: 'İlk tavla maçını kazandın',
    icon: '🎲',
    category: 'games',
    points: 20,
    unlocked: true,
    unlockedDate: '5 gün önce',
    rarity: 'common'
  },
  {
    id: 'tavla_100',
    name: 'Kahvehane Şampiyonu',
    description: '100 tavla maçı kazandın',
    icon: '🏆',
    category: 'games',
    points: 100,
    unlocked: false,
    progress: 47,
    progressMax: 100,
    rarity: 'rare'
  },
  {
    id: 'okey_master',
    name: 'Okey Dehası',
    description: 'Okey\'de 10 kez peşpeşe kazandın',
    icon: '🀄',
    category: 'games',
    points: 75,
    unlocked: false,
    progress: 3,
    progressMax: 10,
    rarity: 'uncommon'
  },

  // Quests
  {
    id: 'first_quest',
    name: 'Görev Başlangıcı',
    description: 'İlk görevini tamamladın',
    icon: '📜',
    category: 'quests',
    points: 15,
    unlocked: true,
    unlockedDate: '4 gün önce',
    rarity: 'common'
  },
  {
    id: 'main_story',
    name: 'Efsane Kahramanı',
    description: 'Ana hikayeyi tamamladın',
    icon: '🌟',
    category: 'quests',
    points: 500,
    unlocked: false,
    progress: 12,
    progressMax: 50,
    rarity: 'legendary'
  },

  // Rare
  {
    id: 'secret_room',
    name: 'Gizli Oda',
    description: 'Topkapı Sarayı\'ndaki gizli odayı keşfettin',
    icon: '🔑',
    category: 'rare',
    points: 250,
    unlocked: true,
    unlockedDate: 'Bugün',
    rarity: 'legendary'
  }
];

const categories = [
  { id: 'all', name: 'Tümü', icon: '🎯' },
  { id: 'combat', name: 'Savaş', icon: '⚔️' },
  { id: 'exploration', name: 'Keşif', icon: '🗺️' },
  { id: 'social', name: 'Sosyal', icon: '👥' },
  { id: 'games', name: 'Oyunlar', icon: '🎲' },
  { id: 'quests', name: 'Görevler', icon: '📜' },
  { id: 'rare', name: 'Nadir', icon: '💎' }
];

const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  uncommon: 'from-green-500 to-green-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-600'
};

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  const filteredAchievements = mockAchievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const unlockedMatch = !showOnlyUnlocked || achievement.unlocked;
    return categoryMatch && unlockedMatch;
  });

  const totalPoints = mockAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const maxPoints = mockAchievements.reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = mockAchievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Başarımlarım
        </h1>
        <p className="text-gray-400">Anadolu Diyarı kahramanlıklarınız</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-lg"
        >
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-3xl font-bold">{unlockedCount}/{mockAchievements.length}</div>
          <div className="text-sm opacity-90">Başarım Kazanıldı</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 rounded-lg"
        >
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
          <div className="text-sm opacity-90">Toplam Puan</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg"
        >
          <div className="text-4xl mb-2">📊</div>
          <div className="text-3xl font-bold">{Math.round((unlockedCount / mockAchievements.length) * 100)}%</div>
          <div className="text-sm opacity-90">Tamamlanma</div>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                px-4 py-2 rounded-lg font-bold transition-all
                ${selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50'
                  : 'bg-slate-700 hover:bg-slate-600'
                }
              `}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </motion.button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="showUnlocked"
            checked={showOnlyUnlocked}
            onChange={(e) => setShowOnlyUnlocked(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="showUnlocked" className="text-sm cursor-pointer">
            Sadece kazanılanları göster
          </label>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              rounded-lg p-6 border-2 transition-all
              ${achievement.unlocked
                ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} border-white/30`
                : 'bg-slate-800/50 border-slate-700 opacity-60 grayscale'
              }
            `}
          >
            {/* Achievement Icon */}
            <div className="text-6xl mb-4 text-center">{achievement.icon}</div>

            {/* Achievement Name */}
            <h3 className="text-xl font-bold text-center mb-2">{achievement.name}</h3>

            {/* Description */}
            <p className="text-sm text-center mb-4 opacity-90">{achievement.description}</p>

            {/* Progress Bar (if not unlocked) */}
            {!achievement.unlocked && achievement.progress !== undefined && (
              <div className="mb-4">
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{ width: `${(achievement.progress / (achievement.progressMax || 100)) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-center mt-1">
                  {achievement.progress} / {achievement.progressMax}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div className={`text-xs font-bold uppercase ${
                achievement.rarity === 'legendary' ? 'text-yellow-300' :
                achievement.rarity === 'epic' ? 'text-purple-300' :
                achievement.rarity === 'rare' ? 'text-blue-300' :
                achievement.rarity === 'uncommon' ? 'text-green-300' :
                'text-gray-300'
              }`}>
                {achievement.rarity}
              </div>
              <div className="text-sm font-bold">
                {achievement.points} <span className="text-yellow-400">⭐</span>
              </div>
            </div>

            {/* Unlocked Date */}
            {achievement.unlocked && achievement.unlockedDate && (
              <div className="text-xs text-center mt-2 opacity-75">
                🔓 {achievement.unlockedDate}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl">Bu kategoride başarım bulunamadı</p>
        </div>
      )}
    </div>
  );
}
