/**
 * TURK DIJITAL METROPOL - Terms of Service Page
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      <section className="relative min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <FileText className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#E30A17] to-[#D4AF37] bg-clip-text text-transparent">
                Kullanim Kosullari
              </span>
            </h1>
            <p className="text-gray-400">Son guncelleme: 31 Aralik 2024</p>
          </motion.div>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">1. Kabul Edilebilir Kullanim</h2>
              <p className="text-gray-300 leading-relaxed">
                Oyunumuzu kullanarak bu kosullari kabul etmis sayilirsiniz...
              </p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">2. Kullanici Sorumlulukları</h2>
              <p className="text-gray-300 leading-relaxed">
                Hesabinizin guvenligi sizin sorumlulugunuzdadir...
              </p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">3. Yasak Davranislar</h2>
              <p className="text-gray-300 leading-relaxed">
                Hile, spam, hakaret gibi davranislar kesinlikle yasaktir...
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
