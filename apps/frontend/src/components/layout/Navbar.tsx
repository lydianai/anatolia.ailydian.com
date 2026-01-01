/**
 * ANADOLU REALM - ELITE Gaming Header
 * RPG/MMO Style Premium Navbar with Turkish Theme
 * Features: Glassmorphism, Dropdowns, Badges, Animations
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Map,
  Sparkles,
  BookOpen,
  MessageSquare,
  Info,
  User,
  MessageCircle,
  Bell,
  Gamepad2,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  Trophy,
  Shield,
  Backpack,
  Search,
  Globe2,
  Zap,
  Star
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

// Mock Data
import {
  mockUser,
  mockNotifications,
  mockChatMessages,
  profileMenuItems,
  getUnreadNotificationsCount,
  getUnreadChatCount,
  getXPPercentage
} from '@/lib/mock/headerData';

// Navigation Links - Gaming Style
const navLinks = [
  { href: '/characters', label: 'Karakterler', icon: Users },
  { href: '/world', label: 'Dunya', icon: Map },
  { href: '/features', label: 'Ozellikler', icon: Sparkles },
  { href: '/how-to-play', label: 'Nasil Oynanir', icon: BookOpen },
  { href: '/community', label: 'Topluluk', icon: MessageSquare },
  { href: '/about', label: 'Hakkinda', icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Dropdown states
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Refs for click outside
  const profileRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setProfileOpen(false);
    setChatOpen(false);
    setNotificationsOpen(false);
  }, [pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setChatOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setChatOpen(false);
        setNotificationsOpen(false);
        setIsMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Counts
  const unreadNotifications = getUnreadNotificationsCount(mockNotifications);
  const unreadChats = getUnreadChatCount(mockChatMessages);
  const xpPercentage = getXPPercentage(mockUser.xp, mockUser.xpNext);

  // Scroll to top (logo click)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* XP Progress Bar (under header) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: xpPercentage / 100 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="fixed top-[72px] left-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#E30A17] z-50 shadow-lg shadow-[#D4AF37]/50"
        style={{ width: '100%', transformOrigin: 'left' }}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </motion.div>

      {/* Main Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b-2 border-[#D4AF37]/20'
            : 'bg-black/30 backdrop-blur-lg border-b-2 border-[#D4AF37]/10'
        }`}
        style={{
          boxShadow: isScrolled ? '0 0 30px rgba(212, 175, 55, 0.3)' : '0 0 20px rgba(212, 175, 55, 0.15)'
        }}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* LOGO AREA - Premium Animated Logo */}
            <button
              onClick={scrollToTop}
              className="cursor-pointer"
              aria-label="Ana sayfaya git"
            >
              <Logo size="small" showPoweredBy={true} showIcon={true} />
            </button>

            {/* NAVIGATION LINKS - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        textShadow: '0 0 10px rgba(212, 175, 55, 1)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        isActive
                          ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold tracking-wide">
                        {link.label}
                      </span>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Hover Glow */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* ACTION AREA - Right Side */}
            <div className="flex items-center gap-2">

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all hover:border-[#D4AF37]/30"
                aria-label="Arama"
              >
                <Search className="w-5 h-5 text-gray-300 hover:text-[#D4AF37] transition-colors" />
              </motion.button>

              {/* Profile Dropdown */}
              <div ref={profileRef} className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setChatOpen(false);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all hover:border-[#D4AF37]/30"
                  aria-label="Profil menusu"
                  aria-expanded={profileOpen}
                >
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  <div className="hidden xl:block text-left">
                    <div className="text-xs text-gray-400">Lvl {mockUser.level}</div>
                    <div className="text-sm font-bold text-white -mt-0.5">{mockUser.username}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-black/95 backdrop-blur-xl rounded-xl border border-[#D4AF37]/20 shadow-2xl overflow-hidden"
                      style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}
                    >
                      {/* User Info */}
                      <div className="p-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#E30A17]/20 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white">{mockUser.username}</div>
                            <div className="text-xs text-[#D4AF37]">{mockUser.title}</div>
                          </div>
                        </div>

                        {/* XP Bar */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Level {mockUser.level}</span>
                            <span>{mockUser.xp}/{mockUser.xpNext} XP</span>
                          </div>
                          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${xpPercentage}%` }}
                              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {profileMenuItems.map((item, index) => {
                          const iconMap: { [key: string]: any } = {
                            shield: Shield,
                            trophy: Trophy,
                            backpack: Backpack,
                            settings: Settings,
                            logout: LogOut
                          };
                          const IconComponent = iconMap[item.icon] || User;

                          return (
                            <React.Fragment key={item.id}>
                              {index === profileMenuItems.length - 1 && (
                                <div className="my-2 border-t border-white/10" />
                              )}
                              <Link href={item.href}>
                                <motion.div
                                  whileHover={{ x: 4, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                                  className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                  </div>
                                  {item.badge && (
                                    <span className="text-xs bg-[#E30A17] text-white px-2 py-0.5 rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </motion.div>
                              </Link>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chat Dropdown */}
              <div ref={chatRef} className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setChatOpen(!chatOpen);
                    setProfileOpen(false);
                    setNotificationsOpen(false);
                  }}
                  className="relative flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all hover:border-[#D4AF37]/30"
                  aria-label="Sohbet"
                  aria-expanded={chatOpen}
                >
                  <MessageCircle className="w-5 h-5 text-gray-300 hover:text-[#D4AF37] transition-colors" />
                  {unreadChats > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-black"
                    >
                      {unreadChats > 9 ? '9+' : unreadChats}
                    </motion.span>
                  )}
                </motion.button>

                {/* Chat Dropdown Menu */}
                <AnimatePresence>
                  {chatOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-black/95 backdrop-blur-xl rounded-xl border border-[#D4AF37]/20 shadow-2xl overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#E30A17]/20 border-b border-white/10">
                        <h3 className="font-bold text-white flex items-center gap-2">
                          <MessageCircle className="w-5 h-5" />
                          Mesajlar
                        </h3>
                      </div>

                      {/* Messages */}
                      <div className="max-h-80 overflow-y-auto">
                        {mockChatMessages.slice(0, 5).map((msg) => (
                          <motion.div
                            key={msg.id}
                            whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                            className="p-3 border-b border-white/5 cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#E30A17] rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-white">
                                  {msg.user.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-semibold text-white truncate">
                                    {msg.user}
                                  </span>
                                  <span className="text-xs text-gray-500 flex-shrink-0">
                                    {msg.time}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-0.5 truncate">
                                  {msg.message}
                                </p>
                                <span className="text-xs text-[#D4AF37]">{msg.room}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer */}
                      <Link href="/chat">
                        <motion.div
                          whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                          className="p-3 text-center text-sm font-semibold text-[#D4AF37] border-t border-white/10 cursor-pointer"
                        >
                          Tumunu Gor
                        </motion.div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications Dropdown */}
              <div ref={notificationsRef} className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileOpen(false);
                    setChatOpen(false);
                  }}
                  className="relative flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all hover:border-[#D4AF37]/30"
                  aria-label="Bildirimler"
                  aria-expanded={notificationsOpen}
                >
                  <Bell className="w-5 h-5 text-gray-300 hover:text-[#D4AF37] transition-colors" />
                  {unreadNotifications > 0 && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#E30A17] to-red-700 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-black"
                    >
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </motion.span>
                  )}
                </motion.button>

                {/* Notifications Dropdown Menu */}
                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-96 bg-black/95 backdrop-blur-xl rounded-xl border border-[#D4AF37]/20 shadow-2xl overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#E30A17]/20 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-2">
                          <Bell className="w-5 h-5" />
                          Bildirimler
                        </h3>
                        <button className="text-xs text-[#D4AF37] hover:text-white transition-colors">
                          Tumunu Okundu Isaretle
                        </button>
                      </div>

                      {/* Notifications */}
                      <div className="max-h-96 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <motion.div
                            key={notif.id}
                            whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                            className={`p-3 border-b border-white/5 cursor-pointer ${
                              !notif.read ? 'bg-[#D4AF37]/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl flex-shrink-0">{notif.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white">{notif.text}</p>
                                <span className="text-xs text-gray-500">{notif.time}</span>
                              </div>
                              {!notif.read && (
                                <div className="w-2 h-2 bg-[#E30A17] rounded-full flex-shrink-0 mt-1" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer */}
                      <Link href="/notifications">
                        <motion.div
                          whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                          className="p-3 text-center text-sm font-semibold text-[#D4AF37] border-t border-white/10 cursor-pointer"
                        >
                          Tumunu Gor
                        </motion.div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Primary CTA: Oyuna Gir */}
              <Link href="/game" className="hidden md:block">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212, 175, 55, 0.4)',
                      '0 0 30px rgba(212, 175, 55, 0.6)',
                      '0 0 20px rgba(212, 175, 55, 0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black rounded-lg font-black shadow-lg border-2 border-[#FFD700]"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s infinite'
                  }}
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span className="text-sm tracking-wide">OYUNA GIR</span>
                  <Zap className="w-4 h-4" />
                </motion.button>
              </Link>

              {/* Mobile Hamburger */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#D4AF37]/20 bg-black/50 backdrop-blur-xl"
            >
              <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                  <input
                    type="text"
                    placeholder="Karakter, yer, oge ara..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-[#D4AF37]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                    autoFocus
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                    ESC
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-b from-black via-gray-900 to-black border-l-2 border-[#D4AF37]/20 z-50 lg:hidden overflow-y-auto"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-[#D4AF37]/20 bg-gradient-to-r from-[#D4AF37]/10 to-[#E30A17]/10">
                <div className="flex items-center justify-between">
                  <Logo size="small" showPoweredBy={true} showIcon={true} />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* User Info Mobile */}
                <div className="mt-4 p-3 bg-black/30 rounded-lg border border-[#D4AF37]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#E30A17] to-[#D4AF37] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">{mockUser.username}</div>
                      <div className="text-xs text-[#D4AF37]">Level {mockUser.level}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                        style={{ width: `${xpPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{mockUser.xp} XP</span>
                      <span>{mockUser.xpNext} XP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="p-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Navigasyon
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                      <Link key={link.href} href={link.href}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#E30A17]/20 border border-[#D4AF37]/30 text-[#D4AF37]'
                              : 'hover:bg-white/5 text-gray-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-semibold">{link.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-[#D4AF37]/20">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Hizli Erisim
                </div>
                <div className="space-y-2">
                  <Link href="/chat">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold">Sohbet</span>
                      </div>
                      {unreadChats > 0 && (
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                          {unreadChats}
                        </span>
                      )}
                    </motion.button>
                  </Link>

                  <Link href="/notifications">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-red-400" />
                        <span className="font-semibold">Bildirimler</span>
                      </div>
                      {unreadNotifications > 0 && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                          {unreadNotifications}
                        </span>
                      )}
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* CTA Button Mobile */}
              <div className="p-4 border-t border-[#D4AF37]/20">
                <Link href="/game">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black rounded-xl font-black shadow-2xl border-2 border-[#FFD700]"
                  >
                    <Gamepad2 className="w-6 h-6" />
                    <span className="text-lg tracking-wide">OYUNA GIR</span>
                    <Zap className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Keyframe for shimmer effect */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800;900&display=swap');

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
