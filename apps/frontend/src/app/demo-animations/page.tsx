"use client";

/**
 * PREMIUM LANDING PAGE - Ultra Hareketli Demo
 * Turkish Digital Metropol Animation Showcase
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link, Sword, Moon, Users, ArrowLeft, Home } from "lucide-react";
import { AnimatedButton, TurkishButton } from "@/components/ui/animations/AnimatedButton";
import { AnimatedCard, CharacterCard } from "@/components/ui/animations/AnimatedCard";
import { ParticleBackground } from "@/components/ui/animations/ParticleBackground";
import { CustomCursor } from "@/components/ui/animations/CustomCursor";
import {
  CrescentSpinner,
  StarSpinner,
  DotsSpinner,
  ProgressBar,
  SkeletonCard,
} from "@/components/ui/animations/LoadingAnimations";
import { ToastProvider, useToast, ConfettiEffect } from "@/components/ui/animations/Toast";
import { useScrollReveal, useCounter, useParallax } from "@/lib/animations/scroll-animations";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  crescentReveal,
} from "@/lib/animations/variants";
import { useRouter } from "next/navigation";

// HERO SECTION

const HeroSection = () => {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });
  const [showConfetti, setShowConfetti] = useState(false);
  const { success } = useToast();

  const handleCTAClick = () => {
    setShowConfetti(true);
    success("Hoş geldiniz! Türk Dijital Metropol'e katıldınız!");
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground particleCount={2000} speed={0.3} interactive />

      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Premium Icon */}
        <motion.div
          variants={crescentReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <div className="relative w-32 h-32">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-turkish-red to-turkish-gold rounded-full blur-2xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="relative z-10 mx-auto">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="#dc2626"
              />
              <path
                d="M12 2l1.5 4.5L18 8l-4 3 1 5-5-3-5 3 1-5-4-3 4.5-1.5L12 2z"
                fill="#fbbf24"
              />
            </svg>
          </div>
        </motion.div>

        {/* Main Title - Animated Gradient */}
        <motion.h1
          className="mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              backgroundSize: "200% 100%",
              background: "linear-gradient(90deg, #dc2626, #ef4444, #fbbf24, #dc2626)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TÜRK DİJİTAL
          </motion.span>
          <br />
          <motion.span
            className="text-white"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            METROPOL
          </motion.span>
        </motion.h1>

        {/* Typewriter Effect */}
        <TypewriterText
          text="Türkiye'nin İlk Web3 MMORPG Oyunu"
          isVisible={isInView}
        />

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col gap-4 sm:flex-row"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp}>
            <TurkishButton
              size="lg"
              withRipple
              onClick={handleCTAClick}
              className="shadow-2xl"
            >
              Şimdi Başla
            </TurkishButton>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <AnimatedButton size="lg" variant="ghost" className="border-2 border-white text-white hover:bg-white/10">
              Daha Fazla Bilgi
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

// TYPEWRITER COMPONENT

const TypewriterText = ({ text, isVisible }: { text: string; isVisible: boolean }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isVisible]);

  return (
    <div className="text-xl text-white md:text-2xl">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block h-6 w-0.5 bg-red-500"
      />
    </div>
  );
};

// STATS SECTION (Counter Animation)

const StatsSection = () => {
  const { ref, isInView } = useScrollReveal({ threshold: 0.5 });

  const stats = [
    { label: "Aktif Oyuncu", end: 50000, suffix: "+" },
    { label: "Toplam Karakter", end: 120000, suffix: "+" },
    { label: "Günlük Savaş", end: 10000, suffix: "+" },
    { label: "Online Rekoru", end: 5000, suffix: "" },
  ];

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} isVisible={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({
  label,
  end,
  suffix,
  isVisible,
}: {
  label: string;
  end: number;
  suffix: string;
  isVisible: boolean;
}) => {
  const { ref, count } = useCounter({ end, duration: 2 });

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      className="rounded-xl bg-white/5 p-6 text-center backdrop-blur-sm"
    >
      <motion.div
        className="mb-2 text-4xl font-bold text-red-500"
        animate={isVisible ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {Math.round(count).toLocaleString()}{suffix}
      </motion.div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
};

// FEATURES SECTION (3D Cards)

const FeaturesSection = () => {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });

  const features = [
    {
      title: "Web3 Entegrasyonu",
      description: "NFT karakterler, blockchain tabanlı ekonomi",
      icon: Link,
      color: "#dc2626",
    },
    {
      title: "Gerçek Zamanlı PvP",
      description: "Anlık savaşlar, ranking sistemi",
      icon: Sword,
      color: "#ef4444",
    },
    {
      title: "Türk Mitolojisi",
      description: "Osmanlı temalı dünya ve karakterler",
      icon: Moon,
      color: "#fbbf24",
    },
    {
      title: "Sosyal Özellikler",
      description: "Klanlar, arkadaşlık, sohbet",
      icon: Users,
      color: "#f87171",
    },
  ];

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-5xl font-bold text-gray-900"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Özellikler
        </motion.h2>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={index} variants={scaleIn}>
                <AnimatedCard variant="3d" intensity={0.8} glowColor={feature.color}>
                  <div className="text-center">
                    <motion.div
                      className="mb-4 flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-16 h-16" style={{ color: feature.color }} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// CHARACTER SHOWCASE

const CharacterShowcase = () => {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2 });

  const characters = [
    {
      name: "Yeniçeri Savaşçı",
      level: 45,
      rarity: "legendary" as const,
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop",
      stats: [
        { label: "Güç", value: 95 },
        { label: "Savunma", value: 85 },
        { label: "Hız", value: 70 },
      ],
    },
    {
      name: "Osmanlı Okçusu",
      level: 38,
      rarity: "epic" as const,
      image: "https://images.unsplash.com/photo-1551750703-1c8f8c628b14?w=400&h=300&fit=crop",
      stats: [
        { label: "Güç", value: 80 },
        { label: "Savunma", value: 60 },
        { label: "Hız", value: 95 },
      ],
    },
    {
      name: "Derviş Büyücü",
      level: 42,
      rarity: "rare" as const,
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
      stats: [
        { label: "Güç", value: 90 },
        { label: "Savunma", value: 50 },
        { label: "Hız", value: 75 },
      ],
    },
  ];

  return (
    <section ref={ref} className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-5xl font-bold text-white"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Karakterler
        </motion.h2>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {characters.map((character, index) => (
            <motion.div key={index} variants={scaleIn}>
              <CharacterCard {...character} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// LOADING SHOWCASE

const LoadingShowcase = () => {
  const { ref, isInView } = useScrollReveal();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-5xl font-bold text-gray-900"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Loading Animasyonları
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Spinners */}
          <div className="text-center">
            <h3 className="mb-6 text-xl font-bold">Spinners</h3>
            <div className="flex justify-center gap-8">
              <CrescentSpinner size={50} />
              <StarSpinner size={50} />
              <DotsSpinner />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="text-center">
            <h3 className="mb-6 text-xl font-bold">Progress Bar</h3>
            <ProgressBar progress={progress} animated />
          </div>

          {/* Skeleton */}
          <div className="text-center">
            <h3 className="mb-6 text-xl font-bold">Skeleton</h3>
            <SkeletonCard />
          </div>
        </div>
      </div>
    </section>
  );
};

// MAIN PAGE

export default function AnimationsDemo() {
  const router = useRouter();

  return (
    <ToastProvider>
      <main className="relative overflow-hidden">
        {/* Navigation Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold">Geri</span>
            </button>

            <h1 className="text-xl font-black text-white">ANİMASYON VİTRİNİ</h1>

            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              <Home className="w-5 h-5" />
              Ana Sayfa
            </button>
          </div>
        </header>

        {/* Add padding top to account for fixed header */}
        <div className="pt-16">
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Sections */}
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <CharacterShowcase />
          <LoadingShowcase />
        </div>
      </main>
    </ToastProvider>
  );
}
