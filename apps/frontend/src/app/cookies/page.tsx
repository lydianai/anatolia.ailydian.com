/**
 * ANADOLU REALM - Çerez Politikası
 * Cookie kullanımı ve gizlilik
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Eye, Settings, Check } from 'lucide-react';

const cookieTypes = [
  {
    icon: Shield,
    name: 'Zorunlu Çerezler',
    description: 'Sitemizin çalışması için gerekli temel çerezler',
    examples: ['Oturum yönetimi', 'Güvenlik', 'Dil tercihi'],
    canDisable: false
  },
  {
    icon: Eye,
    name: 'Analitik Çerezler',
    description: 'Site performansını ölçmek ve iyileştirmek için kullanılır',
    examples: ['Google Analytics', 'Sayfa görüntüleme', 'Kullanıcı davranışı'],
    canDisable: true
  },
  {
    icon: Settings,
    name: 'İşlevsel Çerezler',
    description: 'Gelişmiş özellikler ve kişiselleştirme için kullanılır',
    examples: ['Tema tercihi', 'Oyuncu ayarları', 'Bildirim tercihleri'],
    canDisable: true
  }
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Cookie className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Çerez Politikası
              </span>
            </h1>

            <p className="text-lg text-gray-400">
              Son güncelleme: 31 Aralık 2024
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Çerezler Nedir?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınıza gönderilen küçük metin
              dosyalarıdır. Bu dosyalar, sitemizde daha iyi bir deneyim yaşamanızı sağlamak için kullanılır.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Anadolu Realm olarak, kullanıcı deneyimini iyileştirmek, site performansını ölçmek ve
              kişiselleştirilmiş içerik sunmak amacıyla çerezler kullanmaktayız.
            </p>
          </motion.div>

          {/* Cookie Types */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Kullandığımız Çerez Türleri
              </span>
            </h2>

            {cookieTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#E30A17]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{type.name}</h3>
                        {!type.canDisable && (
                          <span className="text-xs bg-[#E30A17]/20 text-[#E30A17] px-3 py-1 rounded-full font-semibold">
                            Zorunlu
                          </span>
                        )}
                      </div>

                      <p className="text-gray-300 mb-3">{type.description}</p>

                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-2">Örnekler:</p>
                        <div className="flex flex-wrap gap-2">
                          {type.examples.map((example) => (
                            <span
                              key={example}
                              className="text-xs bg-white/5 text-gray-300 px-3 py-1 rounded-full"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cookie Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12 overflow-x-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Çerez Detayları</h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-[#D4AF37] font-semibold">Çerez Adı</th>
                  <th className="pb-3 text-[#D4AF37] font-semibold">Amaç</th>
                  <th className="pb-3 text-[#D4AF37] font-semibold">Süre</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="py-3 font-mono text-sm">session_id</td>
                  <td className="py-3">Kullanıcı oturumu yönetimi</td>
                  <td className="py-3">24 saat</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 font-mono text-sm">user_preferences</td>
                  <td className="py-3">Kullanıcı tercihlerini kaydetme</td>
                  <td className="py-3">1 yıl</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 font-mono text-sm">analytics_token</td>
                  <td className="py-3">Site analizi ve performans ölçümü</td>
                  <td className="py-3">2 yıl</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 font-mono text-sm">theme</td>
                  <td className="py-3">Tema tercihi (açık/koyu mod)</td>
                  <td className="py-3">1 yıl</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* User Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#D4AF37]/10 to-[#E30A17]/10 border border-[#D4AF37]/20 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Çerez Yönetimi ve Haklarınız</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  Tarayıcı ayarlarınızdan çerezleri kabul etmeme veya silme seçeneğini kullanabilirsiniz.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  Analitik ve işlevsel çerezleri devre dışı bırakabilirsiniz (zorunlu çerezler hariç).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  Çerez tercihlerinizi istediğiniz zaman değiştirebilirsiniz.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  Çerezleri engellerseniz, bazı site özellikleri düzgün çalışmayabilir.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Sorularınız mı var?</h2>
            <p className="text-gray-300 mb-6">
              Çerez kullanımı hakkında daha fazla bilgi için bizimle iletişime geçebilirsiniz.
            </p>
            <motion.a
              href="mailto:gizlilik@anatolurealm.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              İletişime Geç
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
