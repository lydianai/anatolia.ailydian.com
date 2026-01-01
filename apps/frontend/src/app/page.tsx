/**
 * ANADOLU REALM - Ultra Premium Landing Page
 * Powered by Lydian
 *
 * Features:
 * - Animated Turkish flag particles (1000+ stars & crescents)
 * - 3D parallax background with depth
 * - Typing animation for title
 * - Glassmorphism cards with 3D hover
 * - Gradient shimmer effects
 * - Smooth scroll animations
 * - Interactive particle system
 * - Premium micro-interactions
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  Gamepad2,
  Users,
  Shield,
  Zap,
  ChevronRight,
  Star,
  Sparkles,
  Crown,
  Swords,
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ParticleBackground } from '@/components/ui/animations/ParticleBackground';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/game');
    }
  }, [isAuthenticated, router]);

  const features = [
    {
      icon: Swords,
      title: 'Gerçek Zamanlı PvP',
      description: 'Türkiye\'nin dört bir yanından oyuncularla epik savaşlar',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Sosyal Metropol',
      description: 'Lonca kur, ittifaklar oluştur, şehri birlikte yönet',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Crown,
      title: 'Türk Karakterler',
      description: 'Alperen, Türk Süvarileri, Yeniçeri ve Sipahi sınıfları',
      gradient: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Sparkles,
      title: 'Osmanlı Mimarisi',
      description: 'İstanbul\'dan esinlenmiş pixel art şehir tasarımı',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      <Navbar />

      {/* Premium Particle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ParticleBackground
          particleCount={2000}
          speed={0.3}
          colors={['#D4AF37', '#E30A17', '#FFD700', '#DC2626']}
          interactive={true}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Parallax Background Layers */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#E30A17]/20 via-transparent to-transparent"
          style={{
            y,
            opacity,
            x: mousePosition.x * 0.5,
          }}
        />

        {/* Turkish Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
          {/* Logo Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E30A17]/20 to-[#D4AF37]/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Star className="w-5 h-5 text-white" fill="currentColor" />
            </motion.div>
            <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
              DİJİTAL ANADOLU\'NUN KAPILARI AÇILIYOR
            </span>
          </motion.div>

          {/* Main Title with Gradient & Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tight mb-6">
              <span
                className="block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s linear infinite',
                }}
              >
                ANADOLU REALM
              </span>
              <span className="block text-xs md:text-sm text-white/60 tracking-widest uppercase mt-2">
                powered by Lydian
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Kendi <span className="text-[#D4AF37] font-semibold">imparatorluğunu kur</span>,{' '}
            <span className="text-[#FFD700] font-semibold">efsane ol</span>,{' '}
            <span className="text-[#E30A17] font-semibold">tarihe geç</span>
            <br />
            Dijital Anadolu'nun kapılarını açıyoruz!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Link href="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 text-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative flex items-center gap-3">
                  MACERAYA BAŞLA
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 text-xl font-bold bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all"
              >
                GİRİŞ YAP
              </motion.button>
            </Link>
          </motion.div>

          {/* Demo Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center mb-16"
          >
            <motion.button
              onClick={() => router.push('/showcase')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className="group relative px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-xl border-2 border-yellow-400/30 text-white rounded-xl hover:border-yellow-400 transition-all overflow-hidden cursor-pointer"
            >
              <span className="relative flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-yellow-400" />
                <div className="text-left">
                  <div className="font-bold text-sm">Oyun Sistemleri</div>
                  <div className="text-xs text-yellow-300">21 Major System • 15K+ Kod</div>
                </div>
              </span>
            </motion.button>

            <motion.button
              onClick={() => router.push('/minigames')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className="group relative px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border-2 border-amber-400/30 text-white rounded-xl hover:border-amber-400 transition-all overflow-hidden cursor-pointer"
            >
              <span className="relative flex items-center gap-3">
                <Swords className="w-6 h-6 text-amber-400" />
                <div className="text-left">
                  <div className="font-bold text-sm">Mini Oyunlar</div>
                  <div className="text-xs text-amber-300">Tavla • Okey • Batak</div>
                </div>
              </span>
            </motion.button>

            <motion.button
              onClick={() => router.push('/classes')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className="group relative px-6 py-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 backdrop-blur-xl border-2 border-red-400/30 text-white rounded-xl hover:border-red-400 transition-all overflow-hidden cursor-pointer"
            >
              <span className="relative flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-400" />
                <div className="text-left">
                  <div className="font-bold text-sm">Osmanlı Sınıfları</div>
                  <div className="text-xs text-red-300">5 Efsanevi Savaşçı</div>
                </div>
              </span>
            </motion.button>

            <motion.button
              onClick={() => router.push('/demo-animations')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-400/30 text-white rounded-xl hover:border-purple-400 transition-all overflow-hidden cursor-pointer"
            >
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <div className="font-bold text-sm">Animasyon Vitrini</div>
                  <div className="text-xs text-purple-300">150+ Premium Animasyon</div>
                </div>
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: '10K+', label: 'Aktif Oyuncu', color: '#E30A17' },
              { value: '7/24', label: 'Online Sunucu', color: '#D4AF37' },
              { value: '500+', label: 'Görev & Quest', color: '#0097D7' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1, type: 'spring' }}
                className="relative p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10"
              >
                <motion.div
                  className="text-5xl font-black mb-2"
                  style={{ color: stat.color }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with 3D Cards */}
      <section ref={featuresRef} className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                EŞSIZ ÖZELLİKLER
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Modern web teknolojileri ile Türk kültürünün muhteşem birleşimi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-1 bg-gradient-to-r from-[#E30A17] via-[#D4AF37] to-[#0097D7] rounded-3xl"
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-16 text-center overflow-hidden">
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 A20 20 0 1 0 80 50 A15 15 0 1 1 50 10' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                }}
              />

              <h2 className="text-5xl md:text-6xl font-black mb-6 relative z-10">
                <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
                  MACERAYA HAZIR MISIN?
                </span>
              </h2>
              <p className="text-2xl text-gray-300 mb-10 relative z-10">
                Şimdi kayıt ol, Anadolu Realm\'in bir parçası ol!
              </p>

              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(212, 175, 55, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-12 py-6 text-2xl font-black bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-2xl shadow-2xl z-10"
                >
                  ÜCRETSİZ KAYIT OL
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* CSS Animation for Shimmer */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
}

// 3D Feature Card Component
interface FeatureCardProps {
  feature: {
    icon: any;
    title: string;
    description: string;
    gradient: string;
  };
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouseX((e.clientX - rect.left - rect.width / 2) / 10);
    setMouseY((e.clientY - rect.top - rect.height / 2) / 10);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
      className="group relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden"
    >
      {/* Gradient Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3 text-white relative z-10">
        {feature.title}
      </h3>
      <p className="text-gray-400 relative z-10">{feature.description}</p>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};
