/**
 * TURK DIJITAL METROPOL - How to Play Page
 * Step-by-step Guide + Interactive Tutorial
 */

'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  UserPlus,
  User,
  Map,
  MessageSquare,
  Target,
  Coins,
  Play,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Keyboard
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: 'Kayit Ol',
    description: 'Ucretsiz hesap olustur ve maceraya basla',
    details: [
      'Email adresinizi girin',
      'Guvenli bir sifre secin',
      'Benzersiz bir kullanici adi belirleyin',
      'Email dogrulamasini tamamlayin'
    ],
    screenshot: '📧',
    color: 'from-blue-500 to-cyan-500',
    keys: []
  },
  {
    id: 2,
    icon: User,
    title: 'Karakterini Yarat',
    description: '5 siniftan birini sec ve karakterini ozellestir',
    details: [
      'Is Adami, Yazilimci, Tasarimci, Pazarlamaci veya Tuccar sec',
      'Karakter gorunumunu ozellestir',
      'Baslangic sehirini belirle',
      'Ilk ekipmanini al'
    ],
    screenshot: '👤',
    color: 'from-purple-500 to-pink-500',
    keys: []
  },
  {
    id: 3,
    icon: Map,
    title: 'Dunyayi Kesfet',
    description: 'WASD ile hareket et, Istanbul\'u ve Anadolu\'yu kesfet',
    details: [
      'W-A-S-D tuslari ile karakterini hareket ettir',
      'Fare ile kameraayi cevir',
      'E tusu ile NPC\'lerle konusma',
      'Tab tusu ile envanter ve haritayi ac'
    ],
    screenshot: '🗺️',
    color: 'from-green-500 to-emerald-500',
    keys: ['W', 'A', 'S', 'D', 'E', 'Tab']
  },
  {
    id: 4,
    icon: MessageSquare,
    title: 'Sosyalles',
    description: 'Arkadas edin, guild kur, sohbet et',
    details: [
      'Enter tusu ile chat\'i ac',
      'Oyunculara arkadaklik istegi gonder',
      'Bir guild\'e katil veya kendi guildini kur',
      'Sesli sohbet ozelligini kullan'
    ],
    screenshot: '💬',
    color: 'from-pink-500 to-rose-500',
    keys: ['Enter']
  },
  {
    id: 5,
    icon: Target,
    title: 'Gorevleri Tamamla',
    description: 'Quest\'leri bitir, XP kazan, level atla',
    details: [
      'Ana hikaye gorevlerini takip et',
      'Yan gorevleri tamamla',
      'Gunluk ve haftalik quest\'lere katil',
      'Achievement\'lari unlockla'
    ],
    screenshot: '📜',
    color: 'from-yellow-500 to-amber-500',
    keys: ['Q']
  },
  {
    id: 6,
    icon: Coins,
    title: 'Ekonomiye Katil',
    description: 'Ticaret yap, zengin ol, empire kur',
    details: [
      'Item\'lari al-sat yap',
      'Marketplace\'de esya listele',
      'Auction house\'a katil',
      'Kendi isini kur ve buyut'
    ],
    screenshot: '💰',
    color: 'from-orange-500 to-red-500',
    keys: ['M']
  }
];

const controls = [
  { key: 'W', action: 'Ileri git' },
  { key: 'A', action: 'Sola git' },
  { key: 'S', action: 'Geri git' },
  { key: 'D', action: 'Saga git' },
  { key: 'E', action: 'Etkilesim' },
  { key: 'Q', action: 'Quest menu' },
  { key: 'I', action: 'Envanter' },
  { key: 'M', action: 'Harita' },
  { key: 'Tab', action: 'Skorboard' },
  { key: 'Enter', action: 'Chat' },
  { key: 'Esc', action: 'Menu' },
  { key: 'Space', action: 'Zipla' },
];

const tips = [
  {
    title: 'Gunluk Bonuslar',
    description: 'Her gun giris yap ve gunluk bonuslarini al. 7 gun ust uste giris yaparak mega bonuslar kazan!',
    icon: '🎁'
  },
  {
    title: 'Guild Avantajlari',
    description: 'Bir guild\'e katilarak ekstra XP, ozel gorevler ve sosyal bonuslar kazan.',
    icon: '🏰'
  },
  {
    title: 'Mini Oyunlar',
    description: 'Tavla, Okey ve diger mini oyunlari oynayarak hem eglence hem de oduller kazan.',
    icon: '🎮'
  },
  {
    title: 'Marketplace Stratejileri',
    description: 'Fiyatlari takip et, ucuzken al, pahali olunca sat. Ekonomik zeka guc demektir!',
    icon: '📈'
  },
  {
    title: 'Event\'lere Katil',
    description: 'Ozel etkinlikler sirasinda rare item\'lar ve benzersiz oduller kazanma sansi!',
    icon: '🎉'
  },
  {
    title: 'Arkadas Sistemi',
    description: 'Arkadaslarinla birlikte quest yaparak %50 daha fazla XP kazan.',
    icon: '👥'
  }
];

export default function HowToPlayPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent" />
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37]/20 to-[#E30A17]/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Play className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
                NASIL OYNANIR
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white mb-2">Baslamak Icin</span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#E30A17] to-[#0097D7] bg-clip-text text-transparent">
                Rehber
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              6 basit adimda Turk Dijital Metropol\'e nasil baslanir,
              nasil oynanir ogren ve maceraya atil!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Guide */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Step Navigation */}
            <div>
              <h2 className="text-4xl font-black text-white mb-8">Adim Adim Rehber</h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <StepNavigationItem
                    key={step.id}
                    step={step}
                    index={index}
                    isActive={activeStep === step.id}
                    onClick={() => setActiveStep(step.id)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Active Step Details */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <StepDetails step={steps.find(s => s.id === activeStep)!} />
            </div>
          </div>
        </div>
      </section>

      {/* Controls Guide */}
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
                Kontroller
              </span>
            </h2>
            <p className="text-xl text-gray-400">Klavye kisayollari ve komutlar</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {controls.map((control, index) => (
              <ControlCard key={index} control={control} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Tricks */}
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
                Ipuclari & Hileler
              </span>
            </h2>
            <p className="text-xl text-gray-400">Pro gibi oynamak icin tuyolar</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <TipCard key={index} tip={tip} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorial (Mock) */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Video Rehber
              </span>
            </h2>
            <p className="text-xl text-gray-400">Detayli anlatimli video egitim</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-[#D4AF37] overflow-hidden shadow-2xl shadow-[#D4AF37]/20"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] rounded-full flex items-center justify-center shadow-2xl"
              >
                <Play className="w-12 h-12 text-gray-900 ml-2" fill="currentColor" />
              </motion.button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">Yeni Baslayanlar Icin Komple Rehber</h3>
              <p className="text-gray-300">15 dakika · Turkish · HD 1080p</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Step Navigation Item
interface StepNavigationItemProps {
  step: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const StepNavigationItem: React.FC<StepNavigationItemProps> = ({
  step,
  index,
  isActive,
  onClick,
}) => {
  const Icon = step.icon;

  return (
    <motion.button
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      whileHover={{ x: 5 }}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
        isActive
          ? 'bg-gradient-to-r from-[#E30A17]/20 to-[#D4AF37]/20 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
          : 'bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/30'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      <div className="flex-1">
        <h3 className={`text-lg font-bold mb-1 ${isActive ? 'text-[#D4AF37]' : 'text-white'}`}>
          {step.title}
        </h3>
        <p className="text-sm text-gray-400">{step.description}</p>
      </div>

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isActive ? 'bg-[#D4AF37]' : 'bg-white/10'
        }`}
      >
        <span className={`font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
          {step.id}
        </span>
      </div>
    </motion.button>
  );
};

// Step Details Component
interface StepDetailsProps {
  step: any;
}

const StepDetails: React.FC<StepDetailsProps> = ({ step }) => {
  const Icon = step.icon;

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl border border-white/10"
    >
      {/* Screenshot (Mock) */}
      <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 flex items-center justify-center text-8xl">
        {step.screenshot}
      </div>

      {/* Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="text-sm text-[#D4AF37] font-bold mb-1">Adim {step.id}</div>
          <h3 className="text-3xl font-black text-white">{step.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-300 mb-6">{step.description}</p>

      {/* Details Checklist */}
      <div className="space-y-3 mb-6">
        {step.details.map((detail: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">{detail}</span>
          </motion.div>
        ))}
      </div>

      {/* Keyboard Shortcuts */}
      {step.keys.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-[#D4AF37]" />
            Kisayol Tuslari
          </h4>
          <div className="flex flex-wrap gap-2">
            {step.keys.map((key: string, index: number) => (
              <kbd
                key={index}
                className="px-4 py-2 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-lg text-white font-mono font-bold shadow-lg"
              >
                {key}
              </kbd>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Control Card Component
interface ControlCardProps {
  control: { key: string; action: string };
  index: number;
}

const ControlCard: React.FC<ControlCardProps> = ({ control, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05 }}
      className="p-4 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-xl border border-white/10 text-center hover:border-[#D4AF37]/30 transition-all"
    >
      <kbd className="inline-block mb-3 px-6 py-3 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-lg text-white font-mono font-bold text-xl shadow-lg">
        {control.key}
      </kbd>
      <p className="text-sm text-gray-400">{control.action}</p>
    </motion.div>
  );
};

// Tip Card Component
interface TipCardProps {
  tip: { title: string; description: string; icon: string };
  index: number;
}

const TipCard: React.FC<TipCardProps> = ({ tip, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all group"
    >
      <div className="text-5xl mb-4">{tip.icon}</div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
        {tip.title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{tip.description}</p>
    </motion.div>
  );
};
