'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Gamepad2, Swords, Shield, Sparkles, Users,
  Menu, X, ChevronDown, LogIn, UserPlus, Settings,
  BookOpen, HelpCircle, Mail
} from 'lucide-react';

export function Navigation() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: 'Ana Sayfa',
      icon: Home,
      path: '/',
    },
    {
      label: 'Oyun',
      icon: Gamepad2,
      path: '/game',
      dropdown: [
        { label: 'Oyunu Başlat', path: '/game', icon: Gamepad2 },
        { label: 'Nasıl Oynanır', path: '/how-to-play', icon: HelpCircle },
        { label: 'Dünya', path: '/world', icon: Sparkles },
      ]
    },
    {
      label: 'Sistemler',
      icon: Settings,
      path: '/showcase',
      dropdown: [
        { label: 'Tüm Sistemler', path: '/showcase', icon: Settings },
        { label: 'Mini Oyunlar', path: '/minigames', icon: Swords },
        { label: 'Osmanlı Sınıfları', path: '/classes', icon: Shield },
        { label: 'Animasyon Vitrini', path: '/demo-animations', icon: Sparkles },
      ]
    },
    {
      label: 'Topluluk',
      icon: Users,
      path: '/community',
      dropdown: [
        { label: 'Topluluk', path: '/community', icon: Users },
        { label: 'Blog', path: '/blog', icon: BookOpen },
        { label: 'Destek', path: '/support', icon: HelpCircle },
      ]
    },
    {
      label: 'Hakkında',
      icon: BookOpen,
      path: '/about',
      dropdown: [
        { label: 'Hakkımızda', path: '/about', icon: BookOpen },
        { label: 'İletişim', path: '/contact', icon: Mail },
        { label: 'SSS', path: '/faq', icon: HelpCircle },
      ]
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-yellow-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-black text-white hidden md:block">
              ANADOLU REALM
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <button
                        key={dropdownItem.path}
                        onClick={() => handleNavigate(dropdownItem.path)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <dropdownItem.icon className="w-4 h-4" />
                        <span>{dropdownItem.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate('/auth/login')}
              className="flex items-center gap-2 px-4 py-2 text-white hover:text-red-500 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Giriş
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate('/auth/register')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold"
            >
              <UserPlus className="w-4 h-4" />
              Kayıt Ol
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800 border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>

                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.path}
                          onClick={() => handleNavigate(dropdownItem.path)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          <dropdownItem.icon className="w-4 h-4" />
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => handleNavigate('/auth/login')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Giriş Yap
                </button>
                <button
                  onClick={() => handleNavigate('/auth/register')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold"
                >
                  <UserPlus className="w-4 h-4" />
                  Kayıt Ol
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
