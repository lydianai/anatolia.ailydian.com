/**
 * ANADOLU REALM - Karakterlerim (My Characters)
 * User's character management page
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Character {
  id: string;
  name: string;
  class: 'Yeniçeri' | 'Sipahi' | 'Akıncı' | 'Medrese' | 'Ahi';
  level: number;
  xp: number;
  xpNext: number;
  location: string;
  playTime: string;
  lastPlayed: string;
  avatar: string;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
  };
  equipment: {
    weapon?: string;
    armor?: string;
    accessory?: string;
  };
}

// Mock character data
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Fatih Sultan',
    class: 'Yeniçeri',
    level: 25,
    xp: 8450,
    xpNext: 10000,
    location: 'Istanbul - Topkapı Sarayı',
    playTime: '48s 23dk',
    lastPlayed: '2 saat önce',
    avatar: '/avatars/yeniceri.png',
    stats: {
      strength: 85,
      agility: 62,
      intelligence: 45,
      vitality: 78
    },
    equipment: {
      weapon: 'Osmanlı Kılıcı +5',
      armor: 'Yeniçeri Zırhı',
      accessory: 'Tuğra Kolyesi'
    }
  },
  {
    id: '2',
    name: 'Kara Murat',
    class: 'Sipahi',
    level: 18,
    xp: 5200,
    xpNext: 7500,
    location: 'Edirne - Atlı Meydan',
    playTime: '32s 15dk',
    lastPlayed: '1 gün önce',
    avatar: '/avatars/sipahi.png',
    stats: {
      strength: 72,
      agility: 88,
      intelligence: 38,
      vitality: 65
    },
    equipment: {
      weapon: 'Süvari Kılıcı +3',
      armor: 'Süvari Zırhı',
      accessory: 'At Nalı Tılsımı'
    }
  },
  {
    id: '3',
    name: 'Nasreddin Hoca',
    class: 'Medrese',
    level: 22,
    xp: 6800,
    xpNext: 9000,
    location: 'Konya - Medrese',
    playTime: '41s 10dk',
    lastPlayed: '3 gün önce',
    avatar: '/avatars/medrese.png',
    stats: {
      strength: 35,
      agility: 42,
      intelligence: 95,
      vitality: 58
    },
    equipment: {
      weapon: 'Bilgelik Asası',
      armor: 'Alim Cübbesi',
      accessory: 'İlim Gözlüğü'
    }
  }
];

const classColors = {
  'Yeniçeri': 'from-red-500 to-orange-600',
  'Sipahi': 'from-blue-500 to-cyan-600',
  'Akıncı': 'from-green-500 to-emerald-600',
  'Medrese': 'from-purple-500 to-pink-600',
  'Ahi': 'from-yellow-500 to-amber-600'
};

export default function CharactersPage() {
  const [selectedChar, setSelectedChar] = useState<Character | null>(mockCharacters[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Karakterlerim
        </h1>
        <p className="text-gray-400">Osmanlı İmparatorluğu kahramanlarınız</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Character List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-yellow-400">⚔️</span>
              Karakterler ({mockCharacters.length}/5)
            </h2>

            <div className="space-y-3">
              {mockCharacters.map((char, index) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedChar(char)}
                  className={`
                    p-4 rounded-lg cursor-pointer transition-all
                    ${selectedChar?.id === char.id
                      ? 'bg-gradient-to-r ' + classColors[char.class] + ' scale-105'
                      : 'bg-slate-700/50 hover:bg-slate-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center text-2xl">
                      {char.class === 'Yeniçeri' ? '🛡️' : char.class === 'Sipahi' ? '🐎' : char.class === 'Medrese' ? '📚' : '⚔️'}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">{char.name}</div>
                      <div className="text-sm opacity-80">{char.class} - Seviye {char.level}</div>
                    </div>
                  </div>

                  {/* XP Bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all"
                        style={{ width: `${(char.xp / char.xpNext) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs mt-1 text-center opacity-70">
                      {char.xp.toLocaleString()} / {char.xpNext.toLocaleString()} XP
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Create New Character Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all"
            >
              + Yeni Karakter Oluştur
            </motion.button>
          </div>
        </div>

        {/* Character Details */}
        {selectedChar && (
          <div className="lg:col-span-2">
            <motion.div
              key={selectedChar.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30"
            >
              {/* Character Header */}
              <div className={`bg-gradient-to-r ${classColors[selectedChar.class]} p-6 rounded-lg mb-6`}>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-black/30 flex items-center justify-center text-5xl">
                    {selectedChar.class === 'Yeniçeri' ? '🛡️' : selectedChar.class === 'Sipahi' ? '🐎' : selectedChar.class === 'Medrese' ? '📚' : '⚔️'}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedChar.name}</h2>
                    <p className="text-xl opacity-90">{selectedChar.class} - Seviye {selectedChar.level}</p>
                    <p className="text-sm opacity-75 mt-1">📍 {selectedChar.location}</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Oyun Süresi</div>
                  <div className="text-2xl font-bold text-yellow-400">{selectedChar.playTime}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Son Giriş</div>
                  <div className="text-2xl font-bold text-green-400">{selectedChar.lastPlayed}</div>
                </div>
              </div>

              {/* Character Stats */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📊</span> Karakter İstatistikleri
                </h3>
                <div className="space-y-3">
                  {Object.entries(selectedChar.stats).map(([stat, value]) => (
                    <div key={stat}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">
                          {stat === 'strength' ? '💪 Güç' :
                           stat === 'agility' ? '⚡ Çeviklik' :
                           stat === 'intelligence' ? '🧠 Zeka' :
                           '❤️ Dayanıklılık'}
                        </span>
                        <span className="font-bold">{value}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            stat === 'strength' ? 'bg-red-500' :
                            stat === 'agility' ? 'bg-green-500' :
                            stat === 'intelligence' ? 'bg-blue-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>⚔️</span> Donanım
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-4 rounded-lg border border-amber-500/50">
                    <div className="text-sm text-gray-400 mb-2">Silah</div>
                    <div className="font-bold">{selectedChar.equipment.weapon || '—'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/50">
                    <div className="text-sm text-gray-400 mb-2">Zırh</div>
                    <div className="font-bold">{selectedChar.equipment.armor || '—'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/50">
                    <div className="text-sm text-gray-400 mb-2">Aksesuar</div>
                    <div className="font-bold">{selectedChar.equipment.accessory || '—'}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors"
                >
                  🎮 Oyuna Gir
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
                >
                  ✏️ Düzenle
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
                >
                  🗑️ Sil
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
