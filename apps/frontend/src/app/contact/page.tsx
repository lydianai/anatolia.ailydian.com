/**
 * TURK DIJITAL METROPOL - Contact Page
 * Contact Form + Info Cards + FAQ + Map
 */

'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  Twitter,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  Phone,
  Clock,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@turkdijitalmetropol.com',
    link: 'mailto:info@turkdijitalmetropol.com',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    value: 'discord.gg/tdm',
    link: 'https://discord.gg/turkdijitalmetropol',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Twitter,
    title: 'Twitter',
    value: '@TurkDijitalM',
    link: 'https://twitter.com/turkdijitalm',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: MapPin,
    title: 'Adres',
    value: 'Istanbul, Turkiye',
    link: null,
    color: 'from-red-500 to-orange-500'
  }
];

const faqs = [
  {
    question: 'Oyun ucretsiz mi?',
    answer: 'Evet! Turk Dijital Metropol tamamen ucretsiz bir oyundur. Premium opsiyonel kozmetik itemler mevcuttur ama oyun deneyimi icin gerekli degildir.'
  },
  {
    question: 'Mobil cihazlarda oynanabiliyor mu?',
    answer: 'Simdiye web tarayicida oynanabiliyor. iOS ve Android uygulamalari 2024 Q3\'te yayinlanacak.'
  },
  {
    question: 'Hangi tarayicilar destekleniyor?',
    answer: 'Chrome, Firefox, Safari ve Edge\'in en son versiyonlari destekleniyor. En iyi deneyim icin Chrome onerilir.'
  },
  {
    question: 'Karakter sinifini degistirebilir miyim?',
    answer: 'Evet, Level 20\'den sonra karakter sinifini degistirebilirsiniz. Bu islem premium currency gerektirir.'
  },
  {
    question: 'Guild nasil kurulur?',
    answer: 'Level 15\'e ulastiktan sonra guild kurabilirsiniz. 10,000 gold ve 5 kurucu uye gereklidir.'
  },
  {
    question: 'Hesabimi nasil silebilirim?',
    answer: 'Ayarlar > Hesap > Hesabi Sil menusunden hesabinizi kalici olarak silebilirsiniz.'
  },
  {
    question: 'PvP zorunlu mu?',
    answer: 'Hayir, PvP tamamen opsiyoneldir. Safe zone\'larda kalmak isteyenler icin PvE content bolca var.'
  },
  {
    question: 'Ekonomi sistemi nasil calisiyor?',
    answer: 'Player-driven ekonomi sistemi var. Fiyatlar arz-talep dengesiyle belirlenir. Marketplace ve auction house mevcuttur.'
  },
  {
    question: 'Report ve destek sistemi var mi?',
    answer: 'Evet, oyun icinde report butonu ve 7/24 Discord destek kanali mevcuttur. Ciddi durumlar icin email gonderebilirsiniz.'
  },
  {
    question: 'Gelecek guncellemeler neler?',
    answer: 'Roadmap sayfamizda tum gelecek ozellikleri gorebilirsiniz. Aylik major update ve haftalik content patch\'ler yayinliyoruz.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0097D7]/10 via-transparent to-transparent" />
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0097D7]/20 to-[#D4AF37]/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Mail className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#D4AF37] font-bold text-lg tracking-wider">
                ILETISIM
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="block text-white mb-2">Bizimle</span>
              <span className="block bg-gradient-to-r from-[#0097D7] via-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Iletisime Gecin
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Sorulariniz, onerileriniz veya geri bildirimleriniz icin
              bize ulasabilirsiniz. 24 saat icinde cevap veriyoruz!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <ContactInfoCard key={index} info={info} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Mesaj Gonderin
              </span>
            </h2>
            <p className="text-xl text-gray-400">Size en kisa surede donecegiz</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Isim
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitted}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all disabled:opacity-50"
                  placeholder="Adiniz ve soyadiniz"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitted}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all disabled:opacity-50"
                  placeholder="ornek@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Konu
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitted}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all disabled:opacity-50"
                >
                  <option value="" className="bg-gray-900">Konu secin...</option>
                  <option value="support" className="bg-gray-900">Teknik Destek</option>
                  <option value="bug" className="bg-gray-900">Bug Raporu</option>
                  <option value="suggestion" className="bg-gray-900">Oneri</option>
                  <option value="partnership" className="bg-gray-900">Is Birligi</option>
                  <option value="other" className="bg-gray-900">Diger</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mesaj
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitted}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none disabled:opacity-50"
                  placeholder="Mesajinizi buraya yazin..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitted || isSubmitting}
                whileHover={!isSubmitted && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitted && !isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 hover:shadow-lg hover:shadow-[#D4AF37]/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-3 border-gray-900 border-t-transparent rounded-full"
                    />
                    Gonderiliyor...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Gonderildi!
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Gonder
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#E30A17] to-[#D4AF37] bg-clip-text text-transparent">
                Sik Sorulan Sorular
              </span>
            </h2>
            <p className="text-xl text-gray-400">Merak edilenler burada</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#E30A17] bg-clip-text text-transparent">
                Bizi Bulun
              </span>
            </h2>
            <p className="text-xl text-gray-400">Istanbul, Turkiye</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-4 border-[#D4AF37] overflow-hidden shadow-2xl shadow-[#D4AF37]/20"
          >
            {/* Mock Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-24 h-24 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Istanbul, Turkiye</h3>
                <p className="text-gray-400">Tam adres yakin zamanda paylailacak</p>
              </div>
            </div>
          </motion.div>

          {/* Office Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Calisma Saatleri</h3>
                <div className="space-y-1 text-gray-400">
                  <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p>Cumartesi: 10:00 - 14:00</p>
                  <p>Pazar: Kapali</p>
                </div>
                <p className="mt-3 text-sm text-[#D4AF37]">
                  Discord desteği 7/24 aktif!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Contact Info Card
interface ContactInfoCardProps {
  info: any;
  index: number;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ info, index }) => {
  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/30 transition-all text-center group"
    >
      <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${info.color}`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
      {info.link ? (
        <a
          href={info.link}
          target={info.link.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="text-[#D4AF37] hover:text-[#B8960F] transition-colors break-all"
        >
          {info.value}
        </a>
      ) : (
        <p className="text-gray-400">{info.value}</p>
      )}
    </motion.div>
  );
};

// FAQ Item Component
interface FAQItemProps {
  faq: { question: string; answer: string };
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <div className="flex items-start gap-3 flex-1">
          <HelpCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
          <h3 className="text-lg font-bold text-white">{faq.question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-4 ml-9 text-gray-400 leading-relaxed">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
};
