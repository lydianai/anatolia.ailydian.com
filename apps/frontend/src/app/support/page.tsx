/**
 * ANADOLU REALM - Destek Sayfası
 * Oyuncu desteği ve yardım merkezi
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Headphones,
  MessageCircle,
  Book,
  Search,
  Send,
  Mail,
  Clock,
  CheckCircle2,
  HelpCircle,
  Zap,
  Shield,
  Gamepad2,
  CreditCard,
  User,
  AlertCircle
} from 'lucide-react';

const supportCategories = [
  {
    icon: Gamepad2,
    title: 'Oyun İçi Sorunlar',
    description: 'Karakter, görev ve oyun mekaniği sorunları',
    articles: 15
  },
  {
    icon: User,
    title: 'Hesap Yönetimi',
    description: 'Giriş, şifre ve hesap güvenliği',
    articles: 12
  },
  {
    icon: CreditCard,
    title: 'Ödeme & Premium',
    description: 'Satın alma, premium üyelik ve faturalar',
    articles: 8
  },
  {
    icon: Shield,
    title: 'Güvenlik',
    description: 'Hesap güvenliği ve spam raporlama',
    articles: 10
  },
  {
    icon: Zap,
    title: 'Teknik Sorunlar',
    description: 'Bağlantı, performans ve bug raporları',
    articles: 20
  },
  {
    icon: HelpCircle,
    title: 'Genel Sorular',
    description: 'SSS ve genel bilgiler',
    articles: 25
  }
];

const popularArticles = [
  'Nasıl kayıt olabilirim?',
  'Şifremi unuttum, ne yapmalıyım?',
  'Premium üyelik avantajları nelerdir?',
  'Oyun donma sorunu çözümü',
  'Karakter nasıl oluşturulur?',
  'Guild (Lonca) nasıl kurulur?',
  'Ekonomi sistemi nasıl çalışır?',
  'PvP arena kuralları'
];

const contactOptions = [
  {
    icon: Mail,
    title: 'E-posta Desteği',
    description: 'destek@anatolurealm.com',
    responseTime: '24 saat içinde',
    color: 'from-blue-500 to-blue-700'
  },
  {
    icon: MessageCircle,
    title: 'Canlı Destek',
    description: 'Anlık sohbet desteği',
    responseTime: 'Ortalama 5 dakika',
    color: 'from-green-500 to-green-700'
  },
  {
    icon: Book,
    title: 'Yardım Merkezi',
    description: 'Detaylı rehberler ve makaleler',
    responseTime: 'Anında erişim',
    color: 'from-purple-500 to-purple-700'
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

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
                <Headphones className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Nasıl Yardımcı Olabiliriz?
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Sorularınız için buradayız. Aradığınızı bulmak için aşağıdaki kategorilere göz atın.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#D4AF37]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Sorunuzu veya konuyu arayın..."
                  className="w-full pl-14 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:border-[#D4AF37]/30 transition-all text-center cursor-pointer group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-400 mb-3">{option.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-[#D4AF37]">
                    <Clock className="w-4 h-4" />
                    {option.responseTime}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
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
                Yardım Kategorileri
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#E30A17]/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {category.articles} makale
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Popüler Konular
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/30 rounded-lg transition-all cursor-pointer group"
              >
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors">{article}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Bizimle İletişime Geçin
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Sorunuzu bulamadınız mı? Bize yazın
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  İsim
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  placeholder="Adınız Soyadınız"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Konu
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  placeholder="Konuyu kısaca açıklayın"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Mesajınız
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none"
                  placeholder="Lütfen sorununuzu detaylı bir şekilde açıklayın..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitted}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-xl font-black text-lg shadow-2xl hover:shadow-[#D4AF37]/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Mesaj Gönderildi!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Gönder
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Status Banner */}
      <section className="py-12 bg-gradient-to-r from-green-900/20 to-green-800/20 border-y border-green-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <p className="text-green-400 font-semibold">
              Tüm sistemler çalışıyor • Ortalama yanıt süresi: 2 saat
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
