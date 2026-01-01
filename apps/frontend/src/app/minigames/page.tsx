/**
 * 🎮 ANADOLU REALM - MİNİ OYUNLAR SHOWCASE
 *
 * Tavla, Okey ve Batak oyunlarının interaktif tanıtımı
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gamepad2, Users, Trophy, Star, Play, ArrowLeft, Sparkles, Dice6, Grid3x3, Spade } from 'lucide-react';

export default function MiniGamesPage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'tavla',
      name: 'TAVLA',
      nameEn: 'Backgammon',
      icon: Dice6,
      description: 'Türk kültürünün vazgeçilmez oyunu. Zar at, stratejini kur, rakibini yen!',
      features: [
        'AI Rakip Desteği (3 zorluk)',
        'Online Multiplayer (2 oyuncu)',
        'Mars ve normal oyun',
        'Zar animasyonları',
        'Gerçek zamanlı chat'
      ],
      stats: {
        code: '555 satır',
        difficulty: '3 seviye',
        modes: '2 mod'
      },
      color: 'from-amber-500 to-orange-600',
      gradient: 'bg-gradient-to-br from-amber-500/20 to-orange-600/20'
    },
    {
      id: 'okey',
      name: 'OKEY',
      nameEn: 'Turkish Rummy',
      icon: Grid3x3,
      description: 'Türkiye\'nin en sevilen strateji oyunu. 4 oyuncu, 106 taş, sonsuz strateji!',
      features: [
        '4 Oyuncu multiplayer',
        'Gösterge taşı sistemi',
        'Çift okey ve sahte okey',
        'Taş animasyonları',
        'Otomatik sıralama'
      ],
      stats: {
        code: '634 satır',
        players: '4 oyuncu',
        tiles: '106 taş'
      },
      color: 'from-green-500 to-emerald-600',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-600/20'
    },
    {
      id: 'batak',
      name: 'BATAK',
      nameEn: 'Turkish Trick-taking',
      icon: Spade,
      description: 'İhale sistemi ile heyecan dolu bir kart oyunu. 4 oyuncu, 13 el, stratejik düşünme!',
      features: [
        '4 Oyuncu multiplayer',
        'İhale sistemi',
        'Koz belirleme',
        '52 kart deste',
        'Puan takibi'
      ],
      stats: {
        code: '788 satır',
        players: '4 oyuncu',
        cards: '52 kart'
      },
      color: 'from-red-500 to-rose-600',
      gradient: 'bg-gradient-to-br from-red-500/20 to-rose-600/20'
    }
  ];

  const selectedGameData = games.find(g => g.id === selectedGame);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/showcase" className="flex items-center gap-3">
              <ArrowLeft className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-black">MİNİ OYUNLAR</h1>
                <p className="text-xs text-gray-400">Tavla • Okey • Batak</p>
              </div>
            </Link>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 rounded-lg font-bold"
              >
                Ana Sayfa
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-2 mb-6">
              <Gamepad2 className="w-5 h-5 text-amber-500" />
              <span className="text-amber-500 font-bold">3 Geleneksel Türk Oyunu • 1,977 Satır Kod</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                MİNİ OYUNLAR
              </span>
            </h1>

            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Türk kültürünün efsanevi oyunları dijital dünyada!
              <br />
              <span className="text-amber-500 font-bold">Online multiplayer • AI destekli • Gerçek zamanlı</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {games.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                index={index}
                isSelected={selectedGame === game.id}
                onSelect={() => setSelectedGame(game.id === selectedGame ? null : game.id)}
              />
            ))}
          </div>

          {/* Detailed View */}
          {selectedGameData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className={`p-8 ${selectedGameData.gradient} backdrop-blur-xl rounded-2xl border border-white/20`}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4 flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10">
                      <selectedGameData.icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-4xl font-black mb-2">{selectedGameData.name}</h2>
                    <p className="text-xl text-gray-300 mb-6">{selectedGameData.nameEn}</p>
                    <p className="text-lg text-gray-200 mb-8">{selectedGameData.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {Object.entries(selectedGameData.stats).map(([key, value]) => (
                        <div key={key} className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="text-2xl font-black text-white">{value}</div>
                          <div className="text-xs text-gray-300 uppercase">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                      Özellikler
                    </h3>
                    <ul className="space-y-3">
                      {selectedGameData.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                        >
                          <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" />
                          <span className="text-gray-200">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      onClick={() => router.push(`/game/${selectedGameData.id}`)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-8 w-full py-4 bg-gradient-to-r ${selectedGameData.color} text-white rounded-xl font-black text-lg flex items-center justify-center gap-2 cursor-pointer`}
                    >
                      <Play className="w-5 h-5" />
                      Oyunu Başlat
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom Stats */}
      <section className="py-20 bg-gradient-to-t from-gray-950 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                TOPLAM İSTATİSTİKLER
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <StatCard title="Toplam Kod" value="1,977" unit="satır" color="from-blue-500 to-cyan-500" />
            <StatCard title="Oyun Sayısı" value="3" unit="oyun" color="from-purple-500 to-pink-500" />
            <StatCard title="Max Oyuncu" value="4" unit="kişi" color="from-green-500 to-emerald-500" />
            <StatCard title="Multiplayer" value="100%" unit="ready" color="from-yellow-500 to-amber-500" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Game Card Component
function GameCard({ game, index, isSelected, onSelect }: any) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Eğer kart zaten seçiliyse, oyunu başlat
    if (isSelected) {
      e.stopPropagation();
      router.push(`/game/${game.id}`);
    } else {
      // Değilse, detayları göster (kartı seç)
      onSelect();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="cursor-pointer group"
    >
      <div className={`
        relative p-8 rounded-2xl border-2 transition-all
        ${isSelected
          ? `${game.gradient} border-white/40 shadow-2xl`
          : 'bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-white/30'
        }
      `}>
        {/* Icon Badge */}
        <div
          onClick={onSelect}
          className="mb-6 flex items-center justify-center w-20 h-20 rounded-xl bg-white/10 transform group-hover:scale-110 transition-transform"
        >
          <game.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 onClick={onSelect} className="text-3xl font-black mb-2">{game.name}</h3>
        <p onClick={onSelect} className="text-sm text-gray-400 mb-4">{game.nameEn}</p>

        {/* Description */}
        <p onClick={onSelect} className="text-gray-300 mb-6">{game.description}</p>

        {/* Quick Stats */}
        <div onClick={onSelect} className="flex gap-2 mb-4">
          {Object.values(game.stats).map((stat: any, i: number) => (
            <div key={i} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold">
              {stat}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleCardClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 bg-gradient-to-r ${game.color} text-white rounded-xl font-bold flex items-center justify-center gap-2`}
        >
          {isSelected ? (
            <>
              <Play className="w-5 h-5" />
              Oyunu Başlat
            </>
          ) : (
            <>
              <Trophy className="w-5 h-5" />
              Detayları Gör
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// Stat Card
function StatCard({ title, value, unit, color }: { title: string; value: string; unit: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10"
    >
      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">{title}</div>
      <div className={`text-5xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="text-xs text-gray-500 uppercase mt-1">{unit}</div>
    </motion.div>
  );
}
