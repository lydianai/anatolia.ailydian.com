/**
 * ANADOLU REALM - Premium Footer
 * 4 Column Layout + Social + Newsletter
 * Powered by Lydian
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Send,
  ArrowUp,
  Heart
} from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'Hakkimizda', href: '/about' },
    { label: 'Takim', href: '/about#team' },
    { label: 'Kariyer', href: '/careers' },
    { label: 'Basin Kiti', href: '/press' },
  ],
  game: [
    { label: 'Ozellikler', href: '/features' },
    { label: 'Karakterler', href: '/characters' },
    { label: 'Dunya', href: '/world' },
    { label: 'Nasil Oynanir', href: '/how-to-play' },
  ],
  community: [
    { label: 'Topluluk', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'SSS', href: '/faq' },
    { label: 'Destek', href: '/support' },
  ],
  legal: [
    { label: 'Gizlilik Politikasi', href: '/privacy' },
    { label: 'Kullanim Kosullari', href: '/terms' },
    { label: 'Cerez Politikasi', href: '/cookies' },
    { label: 'KVKK', href: '/kvkk' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/turkdijitalm', label: 'Twitter', color: '#1DA1F2' },
  { icon: Facebook, href: 'https://facebook.com/turkdijitalmetropol', label: 'Facebook', color: '#4267B2' },
  { icon: Instagram, href: 'https://instagram.com/turkdijitalmetropol', label: 'Instagram', color: '#E4405F' },
  { icon: Youtube, href: 'https://youtube.com/@turkdijitalmetropol', label: 'YouTube', color: '#FF0000' },
  { icon: Github, href: 'https://github.com/turkdijitalmetropol', label: 'GitHub', color: '#333' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-950 to-black border-t border-white/10">
      {/* Turkish Pattern Background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg"
              >
                <Star className="w-6 h-6 text-white" fill="currentColor" />
              </motion.div>
              <div>
                <div className="text-xl font-black text-white tracking-wider"
                  style={{
                    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ANADOLU REALM
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider -mt-1">
                  powered by Lydian
                </div>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Dijital Anadolu'nun kapilarini aciyoruz. Kendi imparatorlugunu kur,
              efsane ol, tarihe gec.
            </p>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-bold mb-3">Guncel Kalmak Ister Misin?</h3>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email adresin"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                    disabled={isSubscribed}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubscribed}
                  className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-2">
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Tesekkurler!
                    </span>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-bold mb-4">Sirket</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Oyun</h3>
            <ul className="space-y-3">
              {footerLinks.game.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Topluluk</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-bold mb-4">Yasal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D4AF37] group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group"
                  title={social.label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 mb-1">
              &copy; 2025 ANADOLU REALM. Tum haklari saklidir.
            </p>
            <p className="text-xs text-gray-600">
              powered by Lydian • Made with <Heart className="inline w-3 h-3 text-red-500" fill="currentColor" /> in Istanbul, Turkiye
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-shadow z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </motion.button>

      {/* Turkish Flag Footer Accent */}
      <div className="h-2 bg-gradient-to-r from-[#E30A17] via-white to-[#E30A17]" />
    </footer>
  );
}
