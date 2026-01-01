/**
 * TURK DIJITAL METROPOL - Community Page
 * Discord, Forum, Leaderboard, Gallery, Events, Social Media
 */

'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageCircle,
  Trophy,
  Calendar,
  Image as ImageIcon,
  Twitter,
  Instagram,
  Youtube,
  TrendingUp,
  Users,
  Star,
  Crown,
  Award,
  Medal,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { leaderboardData, eventsData } from '@/lib/mock/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const forumCategories = [
  { name: 'Genel Sohbet', topics: 1234, posts: 45678, icon: '💬', color: 'from-blue-500 to-cyan-500' },
  { name: 'Rehberler & Ipuclari', topics: 456, posts: 12345, icon: '📚', color: 'from-green-500 to-emerald-500' },
  { name: 'Bug Raporlari', topics: 234, posts: 5678, icon: '🐛', color: 'from-red-500 to-orange-500' },
  { name: 'Oneriler', topics: 789, posts: 23456, icon: '💡', color: 'from-yellow-500 to-amber-500' },
  { name: 'Ticaret & Ekonomi', topics: 567, posts: 34567, icon: '💰', color: 'from-purple-500 to-pink-500' },
  { name: 'Guild Recruitment', topics: 123, posts: 4567, icon: '🏰', color: 'from-indigo-500 to-purple-500' },
];

const latestPosts = [
  { title: 'Yeni baslayanlar icin ekonomi rehberi', author: 'AhmetTrader', replies: 45, views: 1234, time: '5 dakika once' },
  { title: 'Guild Wars etkinligi taktikleri', author: 'PvPKing', replies: 32, views: 890, time: '15 dakika once' },
  { title: 'En iyi karakter sinifi hangisi?', author: 'NewbieTR', replies: 78, views: 2345, time: '30 dakika once' },
  { title: 'Istanbul haritasinda gizli yerler', author: 'Explorer99', replies: 23, views: 567, time: '1 saat once' },
  { title: 'Marketplace fiyat analizi', author: 'EconomistPro', replies: 56, views: 1890, time: '2 saat once' },
];

const galleryImages = [
  { id: 1, title: 'Taksim Meydani sunset', author: 'ScreenshotMaster', likes: 234 },
  { id: 2, title: 'Guild Wars epic battle', author: 'WarPhotographer', likes: 567 },
  { id: 3, title: 'Character customization showcase', author: 'DesignLover', likes: 345 },
  { id: 4, title: 'Marketplace timelapse', author: 'TimelapseKing', likes: 123 },
  { id: 5, title: 'Ramazan event celebration', author: 'EventHunter', likes: 456 },
  { id: 6, title: 'Rare item collection', author: 'Collector999', likes: 789 },
  { id: 7, title: 'Guild headquarters tour', author: 'GuildPro', likes: 234 },
  { id: 8, title: 'PvP tournament highlights', author: 'PvPLegend', likes: 890 },
];

export default function CommunityPage() {
  const [leaderboardFilter, setLeaderboardFilter] = useState<'overall' | 'weekly'>('overall');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E30A17]/10 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E30A17]/20 to-[#D4AF37]/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Users className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
                TOPLULUK
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white mb-2">50,000+</span>
              <span className="block bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] bg-clip-text text-transparent">
                Oyuncu Ailesi
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discorddan foruma, turnuvalardan galeri paylasimina,
              buyuk bir ailenin parcasi ol ve yeni arkadaslar edin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-1 bg-gradient-to-r from-[#5865F2] via-[#7289DA] to-[#5865F2] rounded-3xl"
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-16 text-center overflow-hidden">
              <div className="text-8xl mb-6">💬</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-[#5865F2] to-[#7289DA] bg-clip-text text-transparent">
                  Discord Sunucumuz
                </span>
              </h2>
              <p className="text-2xl text-gray-300 mb-6">
                25,000+ aktif uye, 7/24 canli sohbet, ozel etkinlikler
              </p>

              <div className="flex justify-center gap-8 mb-10">
                <div className="text-center">
                  <div className="text-4xl font-black text-[#5865F2] mb-2">25K+</div>
                  <div className="text-sm text-gray-400 uppercase">Uyeler</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-[#5865F2] mb-2">50+</div>
                  <div className="text-sm text-gray-400 uppercase">Kanallar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-[#5865F2] mb-2">7/24</div>
                  <div className="text-sm text-gray-400 uppercase">Aktif</div>
                </div>
              </div>

              <motion.a
                href="https://discord.gg/turkdijitalmetropol"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(88, 101, 242, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-6 text-2xl font-black bg-[#5865F2] text-white rounded-2xl shadow-2xl"
              >
                <MessageCircle className="w-8 h-8" />
                DISCORD\'A KATIL
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Forum Section */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Topluluk Forumu
              </span>
            </h2>
            <p className="text-xl text-gray-400">Tartis, payla, ogret</p>
          </motion.div>

          {/* Forum Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {forumCategories.map((category, index) => (
              <ForumCategoryCard key={index} category={category} index={index} />
            ))}
          </div>

          {/* Latest Posts */}
          <div className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
              Son Gonderiler
            </h3>

            <div className="space-y-4">
              {latestPosts.map((post, index) => (
                <ForumPostItem key={index} post={post} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#E30A17] to-[#D4AF37] bg-clip-text text-transparent">
                Liderlik Tablosu
              </span>
            </h2>
            <p className="text-xl text-gray-400">Top 100 oyuncu</p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setLeaderboardFilter('overall')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                leaderboardFilter === 'overall'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Genel Siralama
            </button>
            <button
              onClick={() => setLeaderboardFilter('weekly')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                leaderboardFilter === 'weekly'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Haftalik
            </button>
          </div>

          {/* Leaderboard Table */}
          <div className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-4 text-left text-sm text-gray-400 uppercase">Sira</th>
                    <th className="px-4 py-4 text-left text-sm text-gray-400 uppercase">Oyuncu</th>
                    <th className="px-4 py-4 text-left text-sm text-gray-400 uppercase">Sinif</th>
                    <th className="px-4 py-4 text-right text-sm text-gray-400 uppercase">Level</th>
                    <th className="px-4 py-4 text-right text-sm text-gray-400 uppercase">XP</th>
                    <th className="px-4 py-4 text-right text-sm text-gray-400 uppercase">Achievement</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.slice(0, 20).map((player, index) => (
                    <LeaderboardRow key={player.id} player={player} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Topluluk Galerisi
              </span>
            </h2>
            <p className="text-xl text-gray-400">En iyi screenshot'lar ve fanartlar</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <GalleryImageCard key={image.id} image={image} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#E30A17] to-[#D4AF37] bg-clip-text text-transparent">
                Etkinlikler
              </span>
            </h2>
            <p className="text-xl text-gray-400">Yaklaşan ve gecmis eventler</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {eventsData.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Bizi Takip Edin
              </span>
            </h2>
            <p className="text-xl text-gray-400">Tum guncellemeler icin sosyal medyada birlikteyiz</p>
          </motion.div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Twitter, name: 'Twitter', followers: '15K', color: '#1DA1F2', url: 'https://twitter.com' },
              { icon: Instagram, name: 'Instagram', followers: '20K', color: '#E4405F', url: 'https://instagram.com' },
              { icon: Youtube, name: 'YouTube', followers: '10K', color: '#FF0000', url: 'https://youtube.com' },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/30 transition-all"
                style={{ borderColor: `${social.color}40` }}
              >
                <social.icon className="w-16 h-16" style={{ color: social.color }} />
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{social.followers}</div>
                  <div className="text-sm text-gray-400">{social.name}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Forum Category Card
const ForumCategoryCard: React.FC<any> = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all group cursor-pointer"
    >
      <div className={`w-16 h-16 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color} text-3xl`}>
        {category.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
        {category.name}
      </h3>
      <div className="flex gap-4 text-sm text-gray-400">
        <span>{category.topics.toLocaleString()} konular</span>
        <span>·</span>
        <span>{category.posts.toLocaleString()} mesaj</span>
      </div>
    </motion.div>
  );
};

// Forum Post Item
const ForumPostItem: React.FC<any> = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
    >
      <div className="flex-1">
        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
          {post.title}
        </h4>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>👤 {post.author}</span>
          <span>·</span>
          <span>💬 {post.replies} cevap</span>
          <span>·</span>
          <span>👁️ {post.views} goruntulenme</span>
        </div>
      </div>
      <div className="text-sm text-gray-500">{post.time}</div>
    </motion.div>
  );
};

// Leaderboard Row
const LeaderboardRow: React.FC<any> = ({ player, index }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-[#FFD700]" fill="currentColor" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-[#C0C0C0]" fill="currentColor" />;
    if (rank === 3) return <Award className="w-6 h-6 text-[#CD7F32]" fill="currentColor" />;
    return null;
  };

  const getRankChange = (current: number, previous: number) => {
    if (previous === current) return null;
    if (previous > current) {
      return <ChevronUp className="w-5 h-5 text-green-400" />;
    }
    return <ChevronDown className="w-5 h-5 text-red-400" />;
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5 hover:bg-white/5 transition-colors"
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold ${index < 3 ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
            {player.rank}
          </span>
          {getRankIcon(player.rank)}
          {getRankChange(player.rank, player.previousRank)}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-xl">
            👤
          </div>
          <div>
            <div className="font-bold text-white">{player.displayName}</div>
            <div className="text-xs text-gray-400">@{player.username}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="px-3 py-1 bg-white/10 rounded-lg text-sm text-gray-300 capitalize">
          {player.characterClass}
        </span>
      </td>
      <td className="px-4 py-4 text-right">
        <span className="text-[#D4AF37] font-bold text-lg">{player.level}</span>
      </td>
      <td className="px-4 py-4 text-right">
        <span className="text-white font-mono">{player.experience.toLocaleString()}</span>
      </td>
      <td className="px-4 py-4 text-right">
        <span className="text-gray-400">{player.achievements}</span>
      </td>
    </motion.tr>
  );
};

// Gallery Image Card
const GalleryImageCard: React.FC<any> = ({ image, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="group relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-all cursor-pointer"
    >
      <div className="absolute inset-0 flex items-center justify-center text-6xl">
        📸
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="text-white font-bold mb-2">{image.title}</h4>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">👤 {image.author}</span>
            <span className="flex items-center gap-1 text-red-400">
              ❤️ {image.likes}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Event Card
const EventCard: React.FC<any> = ({ event, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all group"
    >
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
        {event.title}
      </h3>
      <p className="text-gray-400 mb-4">{event.description}</p>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <span>📅 {new Date(event.startDate).toLocaleDateString('tr-TR')}</span>
        <span>·</span>
        <span>👥 {event.participants.toLocaleString()} katilimci</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {event.rewards.map((reward: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8960F]/20 rounded-full text-xs text-gray-300 border border-[#D4AF37]/30">
            🎁 {reward}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
