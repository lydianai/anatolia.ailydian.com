/**
 * ANADOLU REALM - Basın Kiti
 * Medya ve basın için materyaller
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Image as ImageIcon,
  Video,
  Award,
  Globe,
  Mail,
  ExternalLink,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

const pressReleases = [
  {
    date: '15 Aralık 2024',
    title: 'Anadolu Realm Beta Testi Başladı',
    description: '10,000+ oyuncunun katıldığı beta test başarıyla başlatıldı.',
    downloadUrl: '#'
  },
  {
    date: '1 Kasım 2024',
    title: 'Türkiye\'nin İlk MMORPG\'si Duyuruldu',
    description: 'Anadolu Realm projesi resmi olarak tanıtıldı.',
    downloadUrl: '#'
  },
  {
    date: '20 Ekim 2024',
    title: '5 Milyon TL Yatırım Aldı',
    description: 'Türk teknoloji yatırımcılarından rekor yatırım.',
    downloadUrl: '#'
  }
];

const mediaAssets = [
  {
    title: 'Logo Paketleri',
    description: 'PNG, SVG ve AI formatlarında logolar',
    icon: ImageIcon,
    size: '15 MB',
    downloadUrl: '#'
  },
  {
    title: 'Ekran Görüntüleri',
    description: 'Yüksek çözünürlüklü oyun ekran görüntüleri',
    icon: ImageIcon,
    size: '45 MB',
    downloadUrl: '#'
  },
  {
    title: 'Tanıtım Videoları',
    description: '4K çözünürlükte tanıtım videoları',
    icon: Video,
    size: '320 MB',
    downloadUrl: '#'
  },
  {
    title: 'Karakter Görselleri',
    description: 'Karakter konsept ve 3D render görselleri',
    icon: ImageIcon,
    size: '28 MB',
    downloadUrl: '#'
  },
  {
    title: 'Basın Dosyası',
    description: 'Şirket bilgileri ve fact sheet (PDF)',
    icon: FileText,
    size: '2 MB',
    downloadUrl: '#'
  },
  {
    title: 'Başarılar & Ödüller',
    description: 'Kazanılan ödüller ve sertifikalar',
    icon: Award,
    size: '5 MB',
    downloadUrl: '#'
  }
];

const stats = [
  { label: 'Kayıtlı Oyuncu', value: '50,000+', icon: Users },
  { label: 'Günlük Aktif Kullanıcı', value: '15,000+', icon: TrendingUp },
  { label: 'Topluluk Üyesi', value: '25,000+', icon: Globe },
  { label: 'Beta Test Süresi', value: '3 Ay', icon: Calendar }
];

const facts = [
  'Türkiye\'nin ilk yerli MMORPG projesi',
  'İstanbul, Ankara, İzmir gibi gerçek şehirler',
  'Türk kültürü ve tarihini yansıtan içerik',
  'Next.js 15 ve React 19 ile geliştirildi',
  'Gerçek zamanlı multiplayer deneyim',
  '100+ Türk mitolojisi karakteri',
  'Dinamik ekonomi sistemi',
  'Guild ve lonca sistemi'
];

export default function PressPage() {
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
                <FileText className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Basın Kiti
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Medya ve basın için tüm materyaller. Görseller, videolar ve basın bültenleri.
            </p>

            <motion.a
              href="mailto:basin@anatolurealm.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Basın İletişim
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center"
                >
                  <Icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                  <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Assets */}
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
                Medya Materyalleri
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Yüksek kaliteli görseller ve videolar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaAssets.map((asset, index) => {
              const Icon = asset.icon;
              return (
                <motion.div
                  key={asset.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#E30A17]/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {asset.size}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {asset.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{asset.description}</p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    İndir
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Basın Bültenleri
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-[#D4AF37] mb-2">{release.date}</div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-gray-400">{release.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#D4AF37]/10 to-[#E30A17]/10 border border-[#D4AF37]/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Hızlı Bilgiler
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">{fact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              Daha fazla bilgiye mi ihtiyacınız var?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Basın ekibimiz size yardımcı olmaktan mutluluk duyar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:basin@anatolurealm.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-xl font-black text-lg shadow-2xl hover:shadow-[#D4AF37]/50 transition-shadow"
              >
                <Mail className="w-5 h-5" />
                İletişime Geç
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
