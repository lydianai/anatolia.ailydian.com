/**
 * 🎮 ANADOLU REALM - GAME SYSTEMS SHOWCASE
 * Premium ikonlar ve çalışan demo sistemleri
 */

'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Activity, Box, Cloud, Cpu, Gamepad2, Globe, Home,
  Hammer, Heart, MessageSquare, Moon, Music, Palette,
  Search, Shield, Smartphone, Sparkles, Star, Sun,
  Target, TrendingUp, Users, Zap, Eye, Award,
  ChevronRight, Play, Crown, Swords, PawPrint
} from 'lucide-react';

export default function ShowcasePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const gameSystems = [
    {
      id: 'physics',
      category: 'engine',
      icon: Activity,
      title: 'Gelişmiş Fizik Motoru',
      description: 'Ragdoll animasyonları, araç fiziği ve yıkılabilir objeler',
      features: [
        '15-kemik ragdoll sistemi',
        '4 Türk aracı fiziği',
        'Yıkılabilir objeler',
        'Gerçekçi çarpışma'
      ],
      color: 'from-blue-500 to-cyan-500',
      demoPath: '/demo/physics',
      stats: { code: '500+ satır', features: '4 sistem' }
    },
    {
      id: 'ai',
      category: 'gameplay',
      icon: Cpu,
      title: 'AI NPC Sistemi',
      description: 'Kişilik, hafıza, duygular ve günlük rutinlerle akıllı NPCler',
      features: [
        'Big Five kişilik modeli',
        '100 oyuncu hafızası',
        '7 farklı duygu',
        'Günlük rutinler'
      ],
      color: 'from-purple-500 to-pink-500',
      demoPath: '/demo/ai-npc',
      stats: { code: '700+ satır', npcs: '1000+' }
    },
    {
      id: 'weather',
      category: 'world',
      icon: Cloud,
      title: 'Dinamik Hava Sistemi',
      description: '6 farklı hava durumu ile gerçekçi atmosfer',
      features: [
        '10,000 yağmur partikülü',
        '5,000 kar partikülü',
        '6 hava durumu',
        '30s yumuşak geçişler'
      ],
      color: 'from-sky-500 to-blue-600',
      demoPath: '/demo/weather',
      stats: { particles: '15,000', conditions: '6' }
    },
    {
      id: 'daynight',
      category: 'world',
      icon: Sun,
      title: 'Gündüz-Gece Döngüsü',
      description: '24 saatlik gerçek zamanlı gece-gündüz döngüsü',
      features: [
        'İstanbul namaz vakitleri',
        'Dinamik güneş/ay',
        'Şehir ışıkları',
        'Cami ışıkları'
      ],
      color: 'from-orange-500 to-yellow-500',
      demoPath: '/demo/daynight',
      stats: { hours: '24', lights: 'Dinamik' }
    },
    {
      id: 'graphics',
      category: 'engine',
      icon: Palette,
      title: 'AAA Grafik Motoru',
      description: 'PBR rendering ve post-processing efektleri',
      features: [
        'PBR rendering',
        'Bloom, SSAO, FXAA',
        '4 kalite profili',
        'Gölge haritalama'
      ],
      color: 'from-violet-500 to-purple-600',
      demoPath: '/demo/graphics',
      stats: { quality: '4 profil', fps: '60 FPS' }
    },
    {
      id: 'economy',
      category: 'gameplay',
      icon: TrendingUp,
      title: 'Gerçekçi Ekonomi',
      description: 'Arz-talep dinamikleri ve enflasyon sistemi',
      features: [
        'Dinamik fiyatlandırma',
        '%2 yıllık enflasyon',
        'Oyuncu işletmeleri',
        'Mevsimsel faktörler'
      ],
      color: 'from-green-500 to-emerald-600',
      demoPath: '/demo/economy',
      stats: { businesses: '8 tip', inflation: '%2' }
    },
    {
      id: 'minigames',
      category: 'social',
      icon: Gamepad2,
      title: 'Türk Mini Oyunları',
      description: 'Geleneksel oyunlar: Tavla, Okey, Batak',
      features: [
        'Tavla (AI destekli)',
        'Okey (4 oyuncu)',
        'Batak (İhale sistemi)',
        'Online multiplayer'
      ],
      color: 'from-amber-500 to-orange-600',
      demoPath: '/minigames',
      stats: { games: '3 oyun', code: '1,977 satır' }
    },
    {
      id: 'combat',
      category: 'gameplay',
      icon: Swords,
      title: 'Gelişmiş Savaş Sistemi',
      description: '5 Osmanlı sınıfı ile epik savaşlar',
      features: [
        '5 sınıf (Yeniçeri, Sipahi, Okçu, Dervish, Haşhaşin)',
        '10-hit combo',
        '3 beceri ağacı/sınıf',
        'Ultimate yetenekler'
      ],
      color: 'from-red-500 to-rose-600',
      demoPath: '/classes',
      stats: { classes: '5 sınıf', skills: '15 ağaç' }
    },
    {
      id: 'quests',
      category: 'gameplay',
      icon: Target,
      title: 'Quest Sistemi',
      description: '120+ görev ile epik hikaye',
      features: [
        '20+ ana hikaye',
        '100+ yan görev',
        'Hikaye dallanması',
        'Günlük görevler'
      ],
      color: 'from-indigo-500 to-blue-600',
      demoPath: '/demo/quests',
      stats: { quests: '120+', paths: '3 yol' }
    },
    {
      id: 'guilds',
      category: 'social',
      icon: Users,
      title: 'Lonca Sistemi',
      description: 'Bölge kontrolü ve Guild vs Guild savaşları',
      features: [
        '100 üyeli loncalar',
        'Bölge kontrolü',
        'GvG savaşları',
        '5 rütbe sistemi'
      ],
      color: 'from-teal-500 to-cyan-600',
      demoPath: '/demo/guilds',
      stats: { members: '100', territories: '4 tip' }
    },
    {
      id: 'crafting',
      category: 'gameplay',
      icon: Hammer,
      title: 'Zanaat Sistemi',
      description: '5 meslek ve 1000+ tarif',
      features: [
        '5 meslek',
        '1000+ tarif',
        '7 kalite seviyesi',
        'Masterwork sistemi'
      ],
      color: 'from-yellow-600 to-amber-600',
      demoPath: '/demo/crafting',
      stats: { professions: '5', recipes: '1000+' }
    },
    {
      id: 'housing',
      category: 'social',
      icon: Home,
      title: 'Ev Sistemi',
      description: 'Stüdyodan saraya 5 farklı ev tipi',
      features: [
        '5 ev tipi',
        '500+ mobilya',
        'Ev partileri',
        'Kişisel bahçe'
      ],
      color: 'from-pink-500 to-rose-600',
      demoPath: '/demo/housing',
      stats: { types: '5', furniture: '500+' }
    },
    {
      id: 'audio',
      category: 'immersion',
      icon: Music,
      title: '3D Spatial Audio',
      description: 'Gerçekçi 3D ses ve voice chat',
      features: [
        '10 müzik parçası',
        '14 ambient ses',
        'Voice chat (4 kanal)',
        'Reverb, Echo'
      ],
      color: 'from-purple-600 to-violet-600',
      demoPath: '/demo/audio',
      stats: { tracks: '10', sounds: '34+' }
    },
    {
      id: 'buildings',
      category: 'world',
      icon: Crown,
      title: 'Prosedürel Binalar',
      description: 'Osmanlı mimarisi ile otomatik bina üretimi',
      features: [
        '5 mimari stil',
        '13 bina tipi',
        'Konak, Kahvehane, Cami',
        'Prosedürel üretim'
      ],
      color: 'from-amber-600 to-yellow-600',
      demoPath: '/demo/buildings',
      stats: { styles: '5', types: '13' }
    },
    {
      id: 'multiplayer',
      category: 'engine',
      icon: Globe,
      title: 'Multiplayer Optimizasyonu',
      description: '1000+ eşzamanlı oyuncu desteği',
      features: [
        'Client-side prediction',
        'Server reconciliation',
        '%40 bandwidth tasarrufu',
        'LOD sistemi'
      ],
      color: 'from-blue-600 to-indigo-600',
      demoPath: '/demo/multiplayer',
      stats: { players: '1000+', compression: '%40' }
    },
    {
      id: 'performance',
      category: 'engine',
      icon: Zap,
      title: 'Performans Optimizasyonu',
      description: '60 FPS garanti ile smooth oyun deneyimi',
      features: [
        '5 performans profili',
        'Otomatik donanım algılama',
        'Frustum culling',
        'Texture streaming'
      ],
      color: 'from-lime-500 to-green-600',
      demoPath: '/demo/performance',
      stats: { fps: '60 FPS', profiles: '5' }
    },
    {
      id: 'responsive',
      category: 'ui',
      icon: Smartphone,
      title: 'Responsive UI',
      description: 'Mobile-first responsive tasarım',
      features: [
        '6 ekran boyutu',
        '10 touch gesture',
        'Safe area (notch)',
        'Viewport adaptation'
      ],
      color: 'from-cyan-500 to-blue-500',
      demoPath: '/demo/responsive',
      stats: { screens: '6', gestures: '10' }
    },
    {
      id: 'animations',
      category: 'ui',
      icon: Sparkles,
      title: 'Premium Animasyonlar',
      description: 'Son teknoloji animasyonlu bileşenler',
      features: [
        '20+ easing fonksiyonu',
        'Premium butonlar',
        'Glass cards',
        'Particle effects'
      ],
      color: 'from-fuchsia-500 to-pink-600',
      demoPath: '/demo/animations',
      stats: { components: '8', easings: '20+' }
    },
    {
      id: 'animal-welfare',
      category: 'social',
      icon: PawPrint,
      title: 'Hayvan Dostları Kampanyası',
      description: 'Sosyal sorumluluk ve farkındalık',
      features: [
        '10+ hayvan görevi',
        '5 gerçek barınak',
        'Bağış sistemi',
        '10 başarım'
      ],
      color: 'from-green-600 to-emerald-600',
      demoPath: '/demo/animal-welfare',
      stats: { quests: '10+', shelters: '5' }
    },
    {
      id: 'seo',
      category: 'marketing',
      icon: Search,
      title: 'SEO Optimizasyonu',
      description: 'Türkiye odaklı kapsamlı SEO',
      features: [
        '81 il GEO targeting',
        '50+ Türkçe keyword',
        'Schema.org data',
        'Core Web Vitals'
      ],
      color: 'from-gray-600 to-slate-600',
      demoPath: '/demo/seo',
      stats: { keywords: '50+', cities: '81' }
    },
    {
      id: 'meta',
      category: 'marketing',
      icon: Award,
      title: 'Meta Tags Yönetimi',
      description: 'Sosyal medya optimizasyonu',
      features: [
        '15 sayfa meta tags',
        '12 favicon boyutu',
        'OpenGraph & Twitter',
        'Web App Manifest'
      ],
      color: 'from-indigo-600 to-purple-600',
      demoPath: '/demo/meta',
      stats: { pages: '15', formats: '12+' }
    }
  ];

  const categories = [
    { id: 'all', name: 'Tümü', icon: Box, count: gameSystems.length },
    { id: 'engine', name: 'Oyun Motoru', icon: Cpu, count: gameSystems.filter(s => s.category === 'engine').length },
    { id: 'gameplay', name: 'Oynanış', icon: Gamepad2, count: gameSystems.filter(s => s.category === 'gameplay').length },
    { id: 'world', name: 'Dünya', icon: Globe, count: gameSystems.filter(s => s.category === 'world').length },
    { id: 'social', name: 'Sosyal', icon: Users, count: gameSystems.filter(s => s.category === 'social').length },
    { id: 'ui', name: 'UI/UX', icon: Eye, count: gameSystems.filter(s => s.category === 'ui').length },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp, count: gameSystems.filter(s => s.category === 'marketing').length },
  ];

  const filteredSystems = activeTab === 'all'
    ? gameSystems
    : gameSystems.filter(s => s.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Star className="w-6 h-6 text-white" fill="currentColor" />
              </motion.div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  ANADOLU REALM
                </h1>
                <p className="text-xs text-gray-400">21 Major Game System</p>
              </div>
            </Link>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 rounded-lg font-bold"
              >
                Ana Sayfaya Dön
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-bold">21 Major System • 15,000+ Satır Kod</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                OYUN SİSTEMLERİ
              </span>
            </h1>

            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              AAA kalitesinde, production-ready oyun sistemleri.
              <br />
              <span className="text-yellow-500 font-bold">0 hata, 60 FPS garanti!</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-20 z-40 backdrop-blur-xl bg-gray-900/90 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`
                    flex items-center gap-2 px-6 py-2 rounded-lg font-bold whitespace-nowrap transition-all
                    ${activeTab === category.id
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {category.name} ({category.count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSystems.map((system, index) => (
              <SystemCard key={system.id} system={system} index={index} router={router} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// System Card Component
function SystemCard({ system, index, router }: { system: any; index: number; router: any }) {
  const Icon = system.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/30 transition-all overflow-hidden">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${system.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className={`w-14 h-14 bg-gradient-to-br ${system.color} rounded-xl flex items-center justify-center mb-4`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2">{system.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{system.description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-4">
          {system.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <ChevronRight className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="flex gap-4 pt-4 border-t border-white/10 mb-4">
          {Object.entries(system.stats).map(([key, value]) => (
            <div key={key} className="text-xs">
              <div className="text-gray-500 uppercase">{key}</div>
              <div className="text-yellow-500 font-bold">{value as string}</div>
            </div>
          ))}
        </div>

        {/* Demo Button */}
        <motion.button
          onClick={() => router.push(system.demoPath)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 bg-gradient-to-r ${system.color} text-white rounded-xl font-bold flex items-center justify-center gap-2`}
        >
          <Play className="w-5 h-5" />
          Demo İzle
        </motion.button>
      </div>
    </motion.div>
  );
}
