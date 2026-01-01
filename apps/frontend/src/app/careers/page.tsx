/**
 * ANADOLU REALM - Kariyer Sayfası
 * Ekibimize katılın!
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Heart,
  Zap,
  Coffee,
  Trophy,
  Code,
  Palette,
  Headphones,
  BarChart,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const benefits = [
  {
    icon: Coffee,
    title: 'Esnek Çalışma',
    description: 'Hibrit çalışma modeli ve esnek saatler'
  },
  {
    icon: Heart,
    title: 'Sağlık Sigortası',
    description: 'Özel sağlık sigortası ve yaşam sigortası'
  },
  {
    icon: Zap,
    title: 'Gelişim Fırsatları',
    description: 'Eğitim ve sertifikasyon desteği'
  },
  {
    icon: Trophy,
    title: 'Bonus Sistemi',
    description: 'Performansa dayalı bonus ve prim'
  },
  {
    icon: Users,
    title: 'Ekip Aktiviteleri',
    description: 'Aylık team building etkinlikleri'
  },
  {
    icon: Code,
    title: 'Modern Teknoloji',
    description: 'En yeni teknolojilerle çalışma'
  }
];

const openPositions = [
  {
    id: 1,
    title: 'Senior Game Developer',
    department: 'Yazılım',
    location: 'İstanbul / Hibrit',
    type: 'Tam Zamanlı',
    icon: Code,
    requirements: [
      'Unity veya Unreal Engine deneyimi',
      'C# veya C++ programlama bilgisi',
      'Multiplayer oyun geliştirme tecrübesi',
      '3+ yıl oyun geliştirme deneyimi'
    ]
  },
  {
    id: 2,
    title: '3D Character Artist',
    department: 'Sanat',
    location: 'İstanbul / Hibrit',
    type: 'Tam Zamanlı',
    icon: Palette,
    requirements: [
      'Blender veya Maya deneyimi',
      'Karakter modelleme ve texturing',
      'PBR workflow bilgisi',
      'Portfolio gereklidir'
    ]
  },
  {
    id: 3,
    title: 'Community Manager',
    department: 'Topluluk',
    location: 'İstanbul / Hibrit',
    type: 'Tam Zamanlı',
    icon: Headphones,
    requirements: [
      'Sosyal medya yönetimi deneyimi',
      'Mükemmel Türkçe ve İngilizce',
      'Gaming community deneyimi',
      'Discord ve Twitch bilgisi'
    ]
  },
  {
    id: 4,
    title: 'Game Designer',
    department: 'Tasarım',
    location: 'İstanbul / Hibrit',
    type: 'Tam Zamanlı',
    icon: BarChart,
    requirements: [
      'MMORPG game design deneyimi',
      'Ekonomi ve progression systems',
      'Excel ve data analysis',
      '2+ yıl game design tecrübesi'
    ]
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Ekibimize Katıl
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Türkiye'nin en büyük MMORPG projesinde yer al. Dijital Anadolu'yu birlikte inşa edelim.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#E30A17]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Açık Pozisyonlar
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Sana uygun pozisyonu bul ve başvur
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((position, index) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:border-[#D4AF37]/30 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#E30A17]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-[#D4AF37]" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                          {position.title}
                        </h3>

                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-sm">{position.department}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{position.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{position.type}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-300">Aranan Özellikler:</p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {position.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
                    >
                      Başvur
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#D4AF37]/10 to-[#E30A17]/10 border border-[#D4AF37]/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              Aradığın pozisyonu bulamadın mı?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              CV'ni bizimle paylaş, uygun bir pozisyon açıldığında sana haber verelim.
            </p>
            <motion.a
              href="mailto:kariyer@anatolurealm.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-xl font-black text-lg shadow-2xl hover:shadow-[#D4AF37]/50 transition-shadow"
            >
              CV Gönder
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
