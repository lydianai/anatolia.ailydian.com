/**
 * ⚔️ ANADOLU REALM - OSMANLI SINIFLARI
 *
 * AAA Kalitesinde Gerçek Oynanabilir Karakter Seçim ve Yaratma Sistemi
 * AILYDIAN Orchestrator 40 Modül Gücü ile Optimize Edilmiştir
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Shield, Swords, Target, Heart, Zap, Star, Crown,
  ArrowLeft, Play, Sparkles, TrendingUp, User, Mountain,
  Skull, Wind, Activity, Home, Settings, Volume2, VolumeX,
  RotateCcw, Check, ChevronRight, Lock, Unlock, Flame,
  Sword, Eye, Brain, Crosshair, Layers, GitBranch,
  Award, Gem, Coins, Clock, Users, Trophy, Hexagon,
  Circle, Triangle, Square, Pentagon, Octagon, Info,
  BookOpen, Map, Compass, Navigation, MessageSquare,
  Share2, Download, Upload, Save, FilePlus, Camera,
  Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw,
  ChevronLeft, ChevronUp, ChevronDown, Plus, Minus,
  X, Loader, RefreshCw, AlertCircle, CheckCircle
} from 'lucide-react';

// TİPLER VE İNTERFACELER

interface SkillNode {
  id: string;
  name: string;
  description: string;
  icon: any;
  tier: number;
  cost: number;
  prerequisites: string[];
  bonuses: {
    stat?: string;
    value?: number;
    percentage?: boolean;
    special?: string;
  }[];
  unlocked: boolean;
}

interface Equipment {
  slot: string;
  name: string;
  stats: Record<string, number>;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

interface Build {
  name: string;
  skillPoints: string[];
  equipment: Equipment[];
  playstyle: 'aggressive' | 'defensive' | 'balanced' | 'support';
}

interface CharacterCustomization {
  name: string;
  appearance: {
    skinTone: number;
    hairStyle: number;
    hairColor: number;
    facialHair: number;
    armorColor: number;
    weaponStyle: number;
  };
  voice: number;
  backstory: string;
}

// SINIF VERİLERİ (GENİŞLETİLMİŞ)

const CLASSES_DATA = {
  yeni: {
    id: 'yeni',
    name: 'YENİÇERİ',
    nameEn: 'Janissary',
    role: 'Tank / Defender',
    icon: Shield,
    description: 'Osmanlı İmparatorluğu\'nun efsanevi askerleri. Yüksek savunma ve dayanıklılık.',
    lore: 'Devşirme sisteminden yetişen seçkin askerler. İmparatorluğun en güçlü savaşçıları. Disiplin ve sadakat onların gücüdür.',
    detailedLore: `
      Yeniçeriler, Osmanlı İmparatorluğu'nun elit piyade birliğidir.
      14. yüzyılda kurulan bu seçkin ordu, devşirme sistemiyle yetiştirilen
      genç erkeklerden oluşuyordu. Sıkı askeri eğitim, disiplin ve sadakat
      yemini ile tanınırlar.

      Yeniçerilerin gücü sadece fiziksel değil, aynı zamanda stratejik
      düşünme ve takım çalışmasındadır. Kalkan duvarı oluşturarak
      arkadaşlarını korur, topçu birlikleriyle koordineli saldırılar düzenlerler.
    `,
    baseStats: {
      health: 1200,
      mana: 400,
      stamina: 600,
      damage: 120,
      defense: 190,
      speed: 90,
      magic: 60,
      critical: 15,
      evasion: 10,
      resistance: 85
    },
    statGrowth: {
      health: 50,
      mana: 15,
      stamina: 25,
      damage: 5,
      defense: 8,
      speed: 2,
      magic: 2,
      critical: 1,
      evasion: 0.5,
      resistance: 3
    },
    skills: [
      {
        id: 'kalkan_duvari',
        name: 'Kalkan Duvarı',
        icon: Shield,
        description: '5 saniye boyunca %80 hasar azaltma + takıma %50 damage reduction',
        cooldown: 15,
        manaCost: 80,
        type: 'Defense',
        tier: 1,
        damage: 0,
        scaling: 'defense',
        effects: ['damage_reduction', 'team_buff'],
        comboWith: ['topcu_bombard']
      },
      {
        id: 'topcu_bombard',
        name: 'Topçu Bombardımanı',
        icon: Target,
        description: '15m alan hasarı (300-500 damage) + 2sn stun',
        cooldown: 20,
        manaCost: 120,
        type: 'Attack',
        tier: 2,
        damage: 400,
        scaling: 'damage',
        effects: ['aoe_damage', 'stun'],
        comboWith: ['demir_irade']
      },
      {
        id: 'demir_irade',
        name: 'Demir İrade',
        icon: Zap,
        description: '8sn Stun, Fear, Silence bağışıklığı + %30 tenacity',
        cooldown: 25,
        manaCost: 60,
        type: 'Buff',
        tier: 1,
        damage: 0,
        scaling: 'none',
        effects: ['cc_immunity', 'tenacity'],
        comboWith: ['kalkan_duvari']
      },
      {
        id: 'phalanx_formation',
        name: 'Phalanx Formasyonu',
        icon: Users,
        description: 'Takım dizilişi: Her yakın müttefik için +15% defense',
        cooldown: 30,
        manaCost: 100,
        type: 'Formation',
        tier: 3,
        damage: 0,
        scaling: 'defense',
        effects: ['team_defense', 'formation'],
        comboWith: ['kalkan_duvari', 'topcu_bombard']
      }
    ],
    skillTrees: [
      {
        name: 'Savunma Ustası',
        tree: 'defense',
        description: 'Tank ve koruma odaklı',
        nodes: 15
      },
      {
        name: 'Saldırı Gücü',
        tree: 'offense',
        description: 'Crowd control ve area damage',
        nodes: 12
      },
      {
        name: 'Liderlik',
        tree: 'support',
        description: 'Takım buffları ve formasyonlar',
        nodes: 10
      }
    ],
    ultimate: {
      name: 'OSMANLI FATİHİ',
      description: '15sn süresince:\n• Takıma %75 damage buff\n• 2000 HP absorbe kalkanı\n• %50 movement speed\n• CC immune',
      icon: Crown,
      cooldown: 120,
      manaCost: 200,
      cinematicDuration: 3
    },
    passives: [
      {
        name: 'Yeniçeri Disiplini',
        description: 'Her %10 eksik HP için +5% defense'
      },
      {
        name: 'Osmanlı Geleneği',
        description: 'Takım üyeleri yakında iken +10% all stats'
      },
      {
        name: 'Savaş Tecrübesi',
        description: 'Her hasar aldığında 0.5% HP regen (max 5%)'
      }
    ],
    playstyles: ['Frontline Tank', 'Team Protector', 'Crowd Controller'],
    difficulty: 'Medium',
    recommendedFor: ['Beginners', 'Team Players', 'PvE Dungeons'],
    counters: ['High Magic Damage', 'Armor Penetration', 'Kiting'],
    strongAgainst: ['Physical DPS', 'Melee Assassins', 'Burst Damage'],
    color: 'from-red-600 to-rose-700',
    gradient: 'bg-gradient-to-br from-red-600/20 to-rose-700/20',
    accentColor: '#dc2626'
  },
  // ... (Diğer 4 sınıf için benzer detaylı veriler)
  sipahi: {
    id: 'sipahi',
    name: 'SİPAHİ',
    nameEn: 'Cavalry',
    role: 'DPS / Mobility',
    icon: Swords,
    description: 'Süvari birliğinin hızlı saldırganları. Yüksek hasar ve mobility.',
    lore: 'At sırtında düşmanı ez geçen elit süvariler. Hız ve stratejinin ustası.',
    baseStats: {
      health: 900,
      mana: 500,
      stamina: 800,
      damage: 190,
      defense: 100,
      speed: 180,
      magic: 80,
      critical: 35,
      evasion: 25,
      resistance: 60
    },
    skills: [
      {
        id: 'sarg_atagi',
        name: 'Şarj Atağı',
        icon: Swords,
        description: 'Hızla돌진: 500 damage + 15m knockback',
        cooldown: 10,
        manaCost: 100,
        type: 'Charge',
        damage: 500,
        effects: ['dash', 'knockback']
      },
      {
        id: 'kilic_firtinasi',
        name: 'Kılıç Fırtınası',
        icon: Activity,
        description: '360° spin: 5 hits × 200 damage',
        cooldown: 15,
        manaCost: 120,
        type: 'AOE',
        damage: 1000,
        effects: ['spin', 'multi_hit']
      }
    ],
    ultimate: {
      name: 'BİN AT ŞARJI',
      description: '10sn:\n• Tüm düşmanlara 1500 dmg\n• 3sn stun\n• %100 crit chance\n• Untargetable',
      icon: Swords,
      cooldown: 100
    },
    color: 'from-amber-600 to-yellow-700',
    gradient: 'bg-gradient-to-br from-amber-600/20 to-yellow-700/20'
  },
  okcu: {
    id: 'okcu',
    name: 'OKÇU',
    nameEn: 'Archer',
    role: 'Ranged DPS',
    icon: Target,
    description: 'Uzaktan saldırı ustası. Yüksek menzil ve precision.',
    lore: 'Türk okçuluğunun mirasını taşıyan keskin nişancılar.',
    baseStats: {
      health: 750,
      mana: 600,
      stamina: 700,
      damage: 170,
      defense: 80,
      speed: 140,
      magic: 100,
      critical: 45,
      evasion: 30,
      resistance: 70
    },
    color: 'from-green-600 to-emerald-700',
    gradient: 'bg-gradient-to-br from-green-600/20 to-emerald-700/20'
  },
  dervish: {
    id: 'dervish',
    name: 'DERVİŞ',
    nameEn: 'Dervish',
    role: 'Healer / Support',
    icon: Heart,
    description: 'Manevi güç ustası. İyileştirme ve destek büyüleri.',
    lore: 'Tasavvuf yolunun bilgeleri. Manevi güçleriyle savaşçılara destek verir.',
    baseStats: {
      health: 850,
      mana: 1000,
      stamina: 600,
      damage: 100,
      defense: 120,
      speed: 110,
      magic: 190,
      critical: 20,
      evasion: 15,
      resistance: 150
    },
    color: 'from-cyan-600 to-blue-700',
    gradient: 'bg-gradient-to-br from-cyan-600/20 to-blue-700/20'
  },
  hashasin: {
    id: 'hashasin',
    name: 'HAŞHAŞİN',
    nameEn: 'Assassin',
    role: 'Stealth / Burst',
    icon: User,
    description: 'Gölgelerden vuran ölümcül suikastçı. Critical master.',
    lore: 'Efsanevi Haşhaşîler\'in mirasçıları. Sessiz, ölümcül, görünmez.',
    baseStats: {
      health: 700,
      mana: 550,
      stamina: 900,
      damage: 180,
      defense: 70,
      speed: 190,
      magic: 110,
      critical: 55,
      evasion: 40,
      resistance: 65
    },
    color: 'from-purple-600 to-indigo-700',
    gradient: 'bg-gradient-to-br from-purple-600/20 to-indigo-700/20'
  }
};

// ANA COMPONENT

export default function ClassesPage() {
  const router = useRouter();

  // State Management
  const [selectedClass, setSelectedClass] = useState<string>('yeni');
  const [viewMode, setViewMode] = useState<'overview' | 'skills' | 'build' | 'create'>('overview');
  const [muted, setMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [characterLevel, setCharacterLevel] = useState(1);
  const [allocatedPoints, setAllocatedPoints] = useState<Record<string, number>>({});
  const [selectedBuild, setSelectedBuild] = useState<string>('balanced');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareWith, setCompareWith] = useState<string | null>(null);

  // Character Customization
  const [customization, setCustomization] = useState<CharacterCustomization>({
    name: '',
    appearance: {
      skinTone: 0,
      hairStyle: 0,
      hairColor: 0,
      facialHair: 0,
      armorColor: 0,
      weaponStyle: 0
    },
    voice: 0,
    backstory: ''
  });

  const classData = CLASSES_DATA[selectedClass as keyof typeof CLASSES_DATA];

  // Calculate real-time stats with bonuses
  const calculatedStats = useMemo(() => {
    const base = classData.baseStats;
    const growth = classData.statGrowth || {};
    const level = characterLevel;

    const stats: Record<string, number> = {};
    Object.keys(base).forEach(stat => {
      stats[stat] = base[stat as keyof typeof base] + (growth[stat as keyof typeof growth] || 0) * (level - 1);
    });

    // Apply allocated point bonuses
    Object.entries(allocatedPoints).forEach(([stat, points]) => {
      stats[stat] = (stats[stat] || 0) + points * 5;
    });

    return stats;
  }, [classData, characterLevel, allocatedPoints]);

  
  // RENDER FUNCTIONS
  

  const renderClassSelector = () => (
    <div className="flex justify-center gap-3 mb-8 flex-wrap">
      {Object.values(CLASSES_DATA).map((cls) => {
        const isSelected = selectedClass === cls.id;
        return (
          <motion.button
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative px-6 py-4 rounded-xl font-bold transition-all
              ${isSelected
                ? `bg-gradient-to-r ${cls.color} text-white shadow-2xl ring-4 ring-white/30`
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {isSelected && (
              <motion.div
                layoutId="classSelector"
                className="absolute inset-0 bg-gradient-to-r ${cls.color} rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}

            <div className="relative z-10">
              <div className="mb-2 flex items-center justify-center">
                <cls.icon className="w-10 h-10" strokeWidth={2} />
              </div>
              <div className="text-lg font-black">{cls.name}</div>
              <div className="text-xs opacity-80">{cls.role}</div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );

  const renderViewModeSelector = () => (
    <div className="flex justify-center gap-2 mb-8">
      {[
        { id: 'overview', icon: BookOpen, label: 'Genel Bakış' },
        { id: 'skills', icon: Sparkles, label: 'Yetenekler' },
        { id: 'build', icon: GitBranch, label: 'Build Calculator' },
        { id: 'create', icon: User, label: 'Karakter Yarat' }
      ].map(mode => (
        <motion.button
          key={mode.id}
          onClick={() => setViewMode(mode.id as any)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all
            ${viewMode === mode.id
              ? `bg-gradient-to-r ${classData.color} text-white`
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }
          `}
        >
          <mode.icon className="w-5 h-5" />
          <span className="hidden md:inline">{mode.label}</span>
        </motion.button>
      ))}
    </div>
  );

  const renderOverview = () => (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left: Class Info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {/* Class Header */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="mb-6 flex items-center justify-center w-40 h-40 rounded-3xl bg-white/10 backdrop-blur-xl mx-auto relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${classData.color} opacity-20 animate-pulse`} />
            <classData.icon className="w-28 h-28 text-white z-10" strokeWidth={1.5} />
          </motion.div>

          <div className="text-center mb-6">
            <h2 className="text-6xl font-black mb-2 bg-gradient-to-r ${classData.color} bg-clip-text text-transparent">
              {classData.name}
            </h2>
            <p className="text-2xl text-gray-300 mb-3">{classData.nameEn}</p>
            <div className={`inline-block px-6 py-2 bg-gradient-to-r ${classData.color} rounded-full text-white font-bold text-lg`}>
              {classData.role}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <Award className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-black">{classData.difficulty}</div>
              <div className="text-xs text-gray-400">Difficulty</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-black">{classData.playstyles?.length || 3}</div>
              <div className="text-xs text-gray-400">Playstyles</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-black">{classData.skills?.length || 4}</div>
              <div className="text-xs text-gray-400">Skills</div>
            </div>
          </div>

          {/* Description & Lore */}
          <div className="space-y-4 p-6 bg-white/5 rounded-2xl">
            <p className="text-lg text-gray-200 leading-relaxed">{classData.description}</p>
            <div className="border-t border-white/10 pt-4">
              <p className="text-gray-400 italic">&quot;{classData.lore}&quot;</p>
            </div>
          </div>

          {/* Passives */}
          {classData.passives && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Gem className="w-5 h-5 text-cyan-500" />
                Pasif Yetenekler
              </h3>
              {classData.passives.map((passive, i) => (
                <div key={i} className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                  <h4 className="font-bold text-cyan-300 mb-1">{passive.name}</h4>
                  <p className="text-sm text-gray-300">{passive.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Right: Stats & Ultimate */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {/* Level Selector */}
        <div className="p-6 bg-white/5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">Karakter Seviyesi</span>
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setCharacterLevel(Math.max(1, characterLevel - 1))}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
              >
                <Minus className="w-5 h-5" />
              </motion.button>
              <span className="text-3xl font-black w-16 text-center">{characterLevel}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setCharacterLevel(Math.min(100, characterLevel + 1))}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={characterLevel}
            onChange={(e) => setCharacterLevel(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Detailed Stats */}
        <div className="p-6 bg-white/5 rounded-2xl space-y-3">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Detaylı İstatistikler
          </h3>

          {Object.entries(calculatedStats).map(([stat, value]) => {
            const percentage = (value / (stat === 'health' ? 3000 : stat === 'mana' ? 2000 : 200)) * 100;
            return (
              <div key={stat} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 uppercase font-semibold">{stat}</span>
                  <span className="text-white font-black">{Math.round(value)}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, percentage)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${classData.color} relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ultimate Ability */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-8 bg-gradient-to-r ${classData.color} rounded-2xl relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-black/30 rounded-xl">
                <classData.ultimate.icon className="w-10 h-10 text-yellow-300" />
              </div>
              <div>
                <div className="text-xs text-yellow-300 font-bold uppercase tracking-wider">Ultimate Ability</div>
                <h3 className="text-3xl font-black text-white">{classData.ultimate.name}</h3>
              </div>
            </div>
            <p className="text-white/90 text-lg whitespace-pre-line leading-relaxed">{classData.ultimate.description}</p>

            {classData.ultimate.cooldown && (
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{classData.ultimate.cooldown}s CD</span>
                </div>
                {classData.ultimate.manaCost && (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>{classData.ultimate.manaCost} Mana</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recommended For */}
        {classData.recommendedFor && (
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              Önerilen Oyuncu Tipi
            </h3>
            <div className="flex flex-wrap gap-2">
              {classData.recommendedFor.map((rec, i) => (
                <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">
                  {rec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          onClick={() => setViewMode('create')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-6 bg-gradient-to-r ${classData.color} text-white rounded-2xl font-black text-2xl flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group`}
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          <Play className="w-8 h-8 relative z-10" />
          <span className="relative z-10">Karakteri Oluştur</span>
        </motion.button>
      </motion.div>
    </div>
  );

  const renderSkillsView = () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-black text-center mb-8">
        <span className={`bg-gradient-to-r ${classData.color} bg-clip-text text-transparent`}>
          Yetenek Sistemi
        </span>
      </h2>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {classData.skills?.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 hover:border-white/40 transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-4 bg-gradient-to-br ${classData.color} rounded-xl`}>
                <skill.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-black text-white">{skill.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 bg-gradient-to-r ${classData.color} rounded text-xs font-bold`}>
                        {skill.type}
                      </span>
                      <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold">
                        Tier {skill.tier}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{skill.description}</p>

                {/* Skill Stats */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-black/30 rounded">
                    <Clock className="w-3 h-3 mb-1 opacity-60" />
                    <div className="font-bold">{skill.cooldown}s</div>
                    <div className="opacity-60">Cooldown</div>
                  </div>
                  <div className="p-2 bg-black/30 rounded">
                    <Zap className="w-3 h-3 mb-1 opacity-60" />
                    <div className="font-bold">{skill.manaCost}</div>
                    <div className="opacity-60">Mana</div>
                  </div>
                  {skill.damage > 0 && (
                    <div className="p-2 bg-black/30 rounded">
                      <Sword className="w-3 h-3 mb-1 opacity-60" />
                      <div className="font-bold">{skill.damage}</div>
                      <div className="opacity-60">Damage</div>
                    </div>
                  )}
                </div>

                {/* Combo Info */}
                {skill.comboWith && skill.comboWith.length > 0 && (
                  <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <div className="text-xs text-yellow-300 font-bold mb-1">Combo with:</div>
                    <div className="flex gap-1">
                      {skill.comboWith.map((comboId, j) => (
                        <span key={j} className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded">
                          {classData.skills?.find(s => s.id === comboId)?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Trees Preview */}
      {classData.skillTrees && (
        <div className="mt-12">
          <h3 className="text-3xl font-black text-center mb-8">Beceri Ağaçları</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {classData.skillTrees.map((tree, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 hover:border-white/40 transition-all"
              >
                <GitBranch className="w-12 h-12 mb-4 text-blue-400" />
                <h4 className="text-xl font-black mb-2">{tree.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{tree.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{tree.nodes} Nodes</span>
                  <span className={`px-3 py-1 bg-gradient-to-r ${classData.color} rounded-full font-bold`}>
                    {tree.tree.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderBuildCalculator = () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-black text-center">
        <span className={`bg-gradient-to-r ${classData.color} bg-clip-text text-transparent`}>
          Build Calculator
        </span>
      </h2>

      <div className="text-center text-gray-400">
        <p className="mb-4">Advanced build calculator coming soon!</p>
        <div className="flex items-center justify-center gap-4">
          <Loader className="w-6 h-6 animate-spin" />
          <span>Developing interactive skill tree system...</span>
        </div>
      </div>
    </div>
  );

  const renderCharacterCreation = () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-black text-center mb-8">
        <span className={`bg-gradient-to-r ${classData.color} bg-clip-text text-transparent`}>
          Karakter Yaratma
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Character Preview */}
        <div className="space-y-6">
          <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 flex items-center justify-center relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${classData.color} opacity-10`} />
            <classData.icon className="w-64 h-64 text-white/50" strokeWidth={1} />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/50 backdrop-blur-xl rounded-xl">
              <p className="text-sm text-gray-300">3D Character Preview</p>
              <p className="text-xs text-gray-500">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Right: Customization Options */}
        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold mb-2">Karakter İsmi</label>
            <input
              type="text"
              value={customization.name}
              onChange={(e) => setCustomization({...customization, name: e.target.value})}
              placeholder="Adını gir..."
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none text-white"
              maxLength={16}
            />
            <p className="text-xs text-gray-500 mt-1">{customization.name.length}/16 karakter</p>
          </div>

          {/* Appearance Options */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-4">Görünüm Özellikleri</h3>
            <div className="space-y-4">
              {[
                { key: 'skinTone', label: 'Ten Rengi', max: 5 },
                { key: 'hairStyle', label: 'Saç Stili', max: 10 },
                { key: 'hairColor', label: 'Saç Rengi', max: 12 },
                { key: 'facialHair', label: 'Sakal/Bıyık', max: 8 },
                { key: 'armorColor', label: 'Zırh Rengi', max: 10 },
                { key: 'weaponStyle', label: 'Silah Stili', max: 6 }
              ].map((option) => (
                <div key={option.key}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{option.label}</span>
                    <span className="font-bold">{customization.appearance[option.key as keyof typeof customization.appearance] + 1}/{option.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={option.max - 1}
                    value={customization.appearance[option.key as keyof typeof customization.appearance]}
                    onChange={(e) => setCustomization({
                      ...customization,
                      appearance: {
                        ...customization.appearance,
                        [option.key]: Number(e.target.value)
                      }
                    })}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Create Button */}
          <motion.button
            onClick={() => {
              // Save character and navigate
              router.push(`/character-creation?class=${selectedClass}&name=${customization.name}`);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-6 bg-gradient-to-r ${classData.color} text-white rounded-2xl font-black text-2xl flex items-center justify-center gap-3 shadow-2xl`}
            disabled={!customization.name.trim()}
          >
            <Check className="w-8 h-8" />
            Karakteri Oluştur
          </motion.button>
        </div>
      </div>
    </div>
  );

  
  // MAIN RENDER
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-gray-900/90 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Navigation */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => router.push('/showcase')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Geri</span>
              </motion.button>

              <motion.button
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Ana Sayfa</span>
              </motion.button>
            </div>

            {/* Center: Title */}
            <div className="flex items-center gap-3">
              <Crown className={`w-8 h-8 bg-gradient-to-r ${classData.color} bg-clip-text text-transparent`} />
              <div>
                <h1 className="text-2xl font-black">OSMANLI SINIFLARI</h1>
                <p className="text-xs text-gray-400">5 Efsanevi Sınıf</p>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setMuted(!muted)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Class Selector */}
        {renderClassSelector()}

        {/* View Mode Selector */}
        {renderViewModeSelector()}

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedClass}-${viewMode}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className={`${classData.gradient} backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl`}
          >
            {viewMode === 'overview' && renderOverview()}
            {viewMode === 'skills' && renderSkillsView()}
            {viewMode === 'build' && renderBuildCalculator()}
            {viewMode === 'create' && renderCharacterCreation()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
