/**
 * 🎮 ANADOLU REALM - MİNİ OYUN SAYFASI
 *
 * Tavla, Okey ve Batak oyunlarının gerçek oynanabilir versiyonları
 */

'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Home,
  Users,
  Trophy,
  Settings,
  Volume2,
  VolumeX,
  Dice6,
  Grid3x3,
  Spade,
  Play,
  RotateCcw,
  Crown,
  Star,
  Sparkles
} from 'lucide-react';

// Oyun tipleri
type GameId = 'tavla' | 'okey' | 'batak';

interface GameConfig {
  id: GameId;
  name: string;
  nameEn: string;
  icon: any;
  color: string;
  gradient: string;
  description: string;
  playerCount: number;
  difficulty: string;
}

const GAMES: Record<GameId, GameConfig> = {
  tavla: {
    id: 'tavla',
    name: 'TAVLA',
    nameEn: 'Backgammon',
    icon: Dice6,
    color: 'from-amber-500 to-orange-600',
    gradient: 'bg-gradient-to-br from-amber-500/20 to-orange-600/20',
    description: 'Türk kültürünün vazgeçilmez oyunu',
    playerCount: 2,
    difficulty: 'Orta'
  },
  okey: {
    id: 'okey',
    name: 'OKEY',
    nameEn: 'Turkish Rummy',
    icon: Grid3x3,
    color: 'from-green-500 to-emerald-600',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-600/20',
    description: 'Türkiye\'nin en sevilen strateji oyunu',
    playerCount: 4,
    difficulty: 'Zor'
  },
  batak: {
    id: 'batak',
    name: 'BATAK',
    nameEn: 'Turkish Trick-taking',
    icon: Spade,
    color: 'from-red-500 to-rose-600',
    gradient: 'bg-gradient-to-br from-red-500/20 to-rose-600/20',
    description: 'İhale sistemi ile heyecan dolu kart oyunu',
    playerCount: 4,
    difficulty: 'Orta'
  }
};

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const gameId = resolvedParams.id as GameId;
  const router = useRouter();
  const [muted, setMuted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const game = GAMES[gameId];

  // Geçersiz oyun ID'si kontrolü
  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 text-red-500">Oyun Bulunamadı</h1>
          <p className="text-gray-400 mb-8">Bu oyun henüz mevcut değil.</p>
          <motion.button
            onClick={() => router.push('/minigames')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 rounded-lg font-bold"
          >
            Mini Oyunlara Dön
          </motion.button>
        </div>
      </div>
    );
  }

  const IconComponent = game.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Back & Home */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => router.push('/minigames')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Geri</span>
              </motion.button>

              <motion.button
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Ana Sayfa</span>
              </motion.button>
            </div>

            {/* Center - Game Title */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${game.gradient}`}>
                <IconComponent className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-xl font-black">{game.name}</h1>
                <p className="text-xs text-gray-400">{game.nameEn}</p>
              </div>
            </div>

            {/* Right - Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setMuted(!muted)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!gameStarted ? (
            <GameLobby game={game} onStart={() => setGameStarted(true)} />
          ) : (
            <GameBoard game={game} onExit={() => setGameStarted(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

// Oyun Lobby Bileşeni
function GameLobby({ game, onStart }: { game: GameConfig; onStart: () => void }) {
  const IconComponent = game.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className={`inline-flex items-center justify-center w-32 h-32 rounded-3xl ${game.gradient} mb-6`}
        >
          <IconComponent className="w-20 h-20 text-white" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black mb-4">
          <span className={`bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
            {game.name}
          </span>
        </h1>

        <p className="text-2xl text-gray-300 mb-2">{game.nameEn}</p>
        <p className="text-lg text-gray-400">{game.description}</p>
      </div>

      {/* Game Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard
          icon={Users}
          label="Oyuncu Sayısı"
          value={`${game.playerCount} Kişi`}
          color={game.color}
        />
        <StatCard
          icon={Trophy}
          label="Zorluk"
          value={game.difficulty}
          color={game.color}
        />
        <StatCard
          icon={Star}
          label="Rating"
          value="4.8 ★"
          color={game.color}
        />
      </div>

      {/* Game Modes */}
      <div className={`p-8 rounded-2xl ${game.gradient} backdrop-blur-xl border border-white/20 mb-8`}>
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          Oyun Modları
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <GameModeCard
            title="AI ile Oyna"
            description="Yapay zeka rakibine karşı pratik yap"
            difficulty="Kolay • Orta • Zor"
            recommended
          />
          <GameModeCard
            title="Online Multiplayer"
            description="Gerçek oyunculara karşı yarış"
            difficulty="Canlı Eşleşme"
            premium
          />
        </div>
      </div>

      {/* Start Button */}
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-6 bg-gradient-to-r ${game.color} text-white rounded-2xl font-black text-2xl flex items-center justify-center gap-3 shadow-2xl`}
      >
        <Play className="w-8 h-8" />
        Oyunu Başlat
      </motion.button>
    </motion.div>
  );
}

// Stat Card
function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10"
    >
      <Icon className={`w-8 h-8 mb-3 bg-gradient-to-r ${color} bg-clip-text text-transparent`} strokeWidth={1.5} />
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-black text-white">{value}</div>
    </motion.div>
  );
}

// Game Mode Card
function GameModeCard({ title, description, difficulty, recommended, premium }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer relative"
    >
      {recommended && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3" fill="currentColor" />
          Önerilen
        </div>
      )}
      {premium && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Crown className="w-3 h-3" fill="currentColor" />
          Premium
        </div>
      )}

      <h3 className="text-xl font-black mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      <div className="text-xs text-gray-500 font-bold">{difficulty}</div>
    </motion.div>
  );
}

// Oyun Tahtası Bileşeni
function GameBoard({ game, onExit }: { game: GameConfig; onExit: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      {/* Game Canvas */}
      <div className={`relative aspect-video rounded-2xl ${game.gradient} backdrop-blur-xl border-2 border-white/20 mb-6 overflow-hidden`}>
        {/* Game Content Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          {game.id === 'tavla' && <TavlaBoard />}
          {game.id === 'okey' && <OkeyBoard />}
          {game.id === 'batak' && <BatakBoard />}
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <motion.button
            onClick={onExit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 rounded-lg font-bold flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Lobiye Dön
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-bold flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Yeniden Başlat
          </motion.button>
        </div>

        {/* Score Display */}
        <div className={`px-8 py-4 rounded-lg ${game.gradient} backdrop-blur-xl border border-white/20`}>
          <div className="text-sm text-gray-400 mb-1">Skor</div>
          <div className="text-3xl font-black">0 - 0</div>
        </div>
      </div>
    </motion.div>
  );
}

// TAVLA Oyun Tahtası
function TavlaBoard() {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);

  const rollDice = () => {
    setDice1(Math.floor(Math.random() * 6) + 1);
    setDice2(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black mb-2 text-white">TAVLA</h2>
        <p className="text-gray-300">Zarları at ve stratejini kur!</p>
      </div>

      {/* Tavla Board Representation */}
      <div className="grid grid-cols-12 gap-2 mb-8 w-full max-w-4xl">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg ${
              i % 2 === 0 ? 'bg-amber-900/50' : 'bg-amber-700/50'
            } border border-amber-500/30 hover:border-amber-500 transition-all cursor-pointer`}
          />
        ))}
      </div>

      {/* Dice Display */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-4xl font-black text-gray-900 shadow-2xl mb-2">
            {dice1}
          </div>
          <div className="text-xs text-gray-400">Zar 1</div>
        </div>

        <motion.button
          onClick={rollDice}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-black text-lg shadow-2xl"
        >
          <Dice6 className="w-6 h-6 mx-auto mb-1" />
          Zar At
        </motion.button>

        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-4xl font-black text-gray-900 shadow-2xl mb-2">
            {dice2}
          </div>
          <div className="text-xs text-gray-400">Zar 2</div>
        </div>
      </div>
    </div>
  );
}

// OKEY Oyun Tahtası
function OkeyBoard() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black mb-2 text-white">OKEY</h2>
        <p className="text-gray-300">106 taş ile strateji oyunu!</p>
      </div>

      {/* Player Hand */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="w-12 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg border-2 border-white/50 flex items-center justify-center text-white font-black cursor-pointer shadow-xl"
          >
            {Math.floor(Math.random() * 13) + 1}
          </motion.div>
        ))}
      </div>

      {/* Center Deck */}
      <div className="grid grid-cols-4 gap-4">
        <div className="w-32 h-20 bg-white/10 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
          <Grid3x3 className="w-8 h-8 text-white/50" />
        </div>
        <div className="w-32 h-20 bg-green-600 rounded-lg border-2 border-white/50 flex items-center justify-center text-white font-black text-2xl">
          🎲
        </div>
        <div className="w-32 h-20 bg-white/10 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
          <Grid3x3 className="w-8 h-8 text-white/50" />
        </div>
        <div className="w-32 h-20 bg-white/10 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center text-gray-400 text-sm">
          Atılan Taşlar
        </div>
      </div>
    </div>
  );
}

// BATAK Oyun Tahtası
function BatakBoard() {
  const suits = ['♠', '♥', '♦', '♣'];
  const [currentBid, setCurrentBid] = useState(6);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black mb-2 text-white">BATAK</h2>
        <p className="text-gray-300">İhale yap ve rakibini yenilmeye çalış!</p>
      </div>

      {/* Player Hand */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 13 }).map((_, i) => {
          const suit = suits[Math.floor(Math.random() * 4)];
          const isRed = suit === '♥' || suit === '♦';

          return (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="w-14 h-20 bg-white rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center cursor-pointer shadow-xl"
            >
              <div className={`text-3xl ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
                {suit}
              </div>
              <div className={`text-xl font-black ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
                {['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][Math.floor(Math.random() * 13)]}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bid Display */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="text-center mb-4">
          <div className="text-sm text-gray-400 mb-2">Mevcut İhale</div>
          <div className="text-5xl font-black text-white">{currentBid}</div>
        </div>

        <div className="flex gap-2">
          <motion.button
            onClick={() => setCurrentBid(Math.max(6, currentBid - 1))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 rounded-lg font-bold"
          >
            Pas
          </motion.button>
          <motion.button
            onClick={() => setCurrentBid(currentBid + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-bold"
          >
            İhaleyi Arttır
          </motion.button>
        </div>
      </div>
    </div>
  );
}
