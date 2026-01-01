/**
 * TURK DIJITAL METROPOL - FAQ Page
 */

'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const categories = [
  {
    name: 'Genel',
    faqs: [
      { q: 'Oyun ucretsiz mi?', a: 'Evet, tamamen ucretsizdir.' },
      { q: 'Mobil destegi var mi?', a: 'iOS ve Android uygulamalari yolda.' },
      { q: 'Sistem gereksinimleri nedir?', a: 'Modern bir web tarayicisi yeterlidir.' },
    ]
  },
  {
    name: 'Oynanis',
    faqs: [
      { q: 'Nasil baslarim?', a: 'Kayit ol, karakter yarat, oyna!' },
      { q: 'Kontroller nelerdir?', a: 'WASD hareket, E etkilesim, Tab menu.' },
      { q: 'PvP zorunlu mu?', a: 'Hayir, tamamen opsiyoneldir.' },
    ]
  },
  {
    name: 'Teknik',
    faqs: [
      { q: 'Hangi tarayicilar destekleniyor?', a: 'Chrome, Firefox, Safari, Edge.' },
      { q: 'Lag sorunu yasiyorum?', a: 'Ayarlardan grafik kalitesini dusurun.' },
      { q: 'Hesabimi nasil silerim?', a: 'Ayarlar > Hesap > Hesabi Sil.' },
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      <section className="relative min-h-screen pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <HelpCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Sik Sorulan Sorular
              </span>
            </h1>
            <p className="text-xl text-gray-400">Merak ettikleriniz burada</p>
          </motion.div>

          <div className="space-y-12">
            {categories.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-3xl font-bold text-white mb-6">{category.name}</h2>
                <div className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const FAQItem: React.FC<any> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-bold text-white">{faq.q}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-gray-400">{faq.a}</p>
      </motion.div>
    </motion.div>
  );
};
