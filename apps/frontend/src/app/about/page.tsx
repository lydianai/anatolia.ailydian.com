/**
 * TURK DIJITAL METROPOL - About Page
 * Vision, Mission, Team, Timeline, Stats, Press
 */

'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Target,
  Eye,
  Users,
  Trophy,
  Calendar,
  TrendingUp,
  Star,
  Award,
  Zap,
  Heart,
  Globe,
  Shield
} from 'lucide-react';
import { teamMembers } from '@/lib/mock/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const stats = [
  { value: '50K+', label: 'Aktif Kullanici', icon: Users, color: '#E30A17' },
  { value: '100+', label: 'Benzersiz Karakter', icon: Star, color: '#D4AF37' },
  { value: '7/24', label: 'Online Sunucu', icon: Globe, color: '#0097D7' },
  { value: '99.9%', label: 'Uptime', icon: Shield, color: '#00D084' },
];

const timeline = [
  {
    year: '2023',
    quarter: 'Q1',
    title: 'Proje Baslatildi',
    description: 'Ilk konsept ve prototype gelistirme baslatildi',
    icon: Zap,
  },
  {
    year: '2023',
    quarter: 'Q2',
    title: 'Alpha Surumu',
    description: 'Kapali alpha test 100 oyuncuyla baslatildi',
    icon: Users,
  },
  {
    year: '2023',
    quarter: 'Q4',
    title: 'Beta Lansmani',
    description: 'Acik beta 10,000+ oyuncu katilimi',
    icon: Trophy,
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Resmi Lansman',
    description: 'Tam surumle yayina girdi, 50K+ aktif oyuncu',
    icon: Award,
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'Mobil Surumu',
    description: 'iOS ve Android platformlari icin lansmanplanli',
    icon: TrendingUp,
  },
];

const pressLogos = [
  { name: 'TechCrunch', logo: '/press/techcrunch.svg' },
  { name: 'Hurriyet', logo: '/press/hurriyet.svg' },
  { name: 'Milliyet', logo: '/press/milliyet.svg' },
  { name: 'Webrazzi', logo: '/press/webrazzi.svg' },
  { name: 'Shiftdelete', logo: '/press/shiftdelete.svg' },
  { name: 'Donanim Haber', logo: '/press/donanımhaber.svg' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
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
              <Star className="w-6 h-6 text-[#D4AF37]" fill="currentColor" />
              <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
                HAKKIMIZDA
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white mb-2">Turkiye'nin Ilk</span>
              <span className="block bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] bg-clip-text text-transparent">
                Dijital Metropolu
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Osmanli ihtisami ile modern web teknolojilerinin muhteşem
              bulusmasinda, binlerce oyuncunun bir araya gelerek yeni bir
              dijital dunya yarattigi platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <VisionMissionCard
              icon={Eye}
              title="Vizyonumuz"
              description="Turkiye'nin ve dunya Turk diasporasinin bir araya gelip sosyallestigi, eglenirken ogrendigi, rekabet ederken is birligi yaptigi en buyuk dijital metropol olmak."
              gradient="from-[#E30A17] to-[#D4AF37]"
              delay={0}
            />
            <VisionMissionCard
              icon={Target}
              title="Misyonumuz"
              description="Turk kulturunu, tarihini ve degerlerini modern oyun mekanigiyle harmanlayarak dunya capinda taninir bir marka yaratmak ve teknoloji ile eglenceyi birlikte sunmak."
              gradient="from-[#D4AF37] to-[#0097D7]"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
                Rakamlarla TDM
              </span>
            </h2>
            <p className="text-xl text-gray-400">Gururla paylastigimiz basarilarimiz</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
                Ekibimiz
              </span>
            </h2>
            <p className="text-xl text-gray-400">Hayalleri gercege donusturenler</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Yolculugumuz
              </span>
            </h2>
            <p className="text-xl text-gray-400">Fikrinden bugun bugune</p>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E30A17] via-[#D4AF37] to-[#0097D7]" />

            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
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
                Basinda Biz
              </span>
            </h2>
            <p className="text-xl text-gray-400">Medyada yer alan haberlerimiz</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {pressLogos.map((press, index) => (
              <motion.div
                key={press.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400 mb-2">📰</div>
                  <div className="text-sm text-gray-500">{press.name}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Vision/Mission Card Component
interface VisionMissionCardProps {
  icon: any;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

const VisionMissionCard: React.FC<VisionMissionCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient,
  delay,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/30 transition-all group overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div
        className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-3xl font-bold mb-4 text-white relative z-10">{title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed relative z-10">{description}</p>
    </motion.div>
  );
};

// Stat Card Component
interface StatCardProps {
  stat: {
    value: string;
    label: string;
    icon: any;
    color: string;
  };
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
      className="relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 text-center group hover:border-white/30 transition-all"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${stat.color}20` }}
      >
        <Icon className="w-8 h-8" style={{ color: stat.color }} />
      </motion.div>

      <motion.div
        className="text-5xl font-black mb-2"
        style={{ color: stat.color }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      >
        {stat.value}
      </motion.div>

      <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
    </motion.div>
  );
};

// Team Member Card Component
interface TeamMemberCardProps {
  member: {
    id: number;
    name: string;
    role: string;
    avatar: string;
    bio: string;
    quote: string;
    social: {
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all group"
    >
      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full"
        />
        <div className="absolute inset-1 bg-gray-800 rounded-full flex items-center justify-center text-4xl">
          👤
        </div>
      </div>

      <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
      <p className="text-[#D4AF37] text-sm font-medium text-center mb-4">{member.role}</p>
      <p className="text-gray-400 text-sm text-center mb-4 leading-relaxed">{member.bio}</p>

      <div className="p-4 bg-white/5 rounded-xl border-l-4 border-[#D4AF37] mb-4">
        <p className="text-white text-sm italic">&ldquo;{member.quote}&rdquo;</p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-3">
        {['twitter', 'linkedin', 'github'].map((platform) => (
          <motion.a
            key={platform}
            href={`https://${platform}.com${member.social[platform as keyof typeof member.social]}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#D4AF37]/20 rounded-lg transition-colors"
          >
            <span className="text-lg">🔗</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

// Timeline Item Component
interface TimelineItemProps {
  item: {
    year: string;
    quarter: string;
    title: string;
    description: string;
    icon: any;
  };
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-center gap-8 mb-12 ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div className="flex-1">
        <div
          className={`p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 ${
            isLeft ? 'text-right' : 'text-left'
          }`}
        >
          <div className="text-[#D4AF37] font-bold text-sm mb-2">
            {item.year} {item.quarter}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>

      {/* Center Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
        className="relative z-10"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />
    </motion.div>
  );
};
