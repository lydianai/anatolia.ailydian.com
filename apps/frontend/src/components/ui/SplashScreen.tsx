/**
 * ANADOLU REALM - Splash Screen Component
 * Opening animation for the application
 */

'use client';

import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { APP_TAGLINE } from '@/lib/constants';

export const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      style={{ pointerEvents: 'none' }}
    >
      <div className="text-center">
        <Logo size="large" showPoweredBy={true} />

        <motion.p
          className="mt-6 text-lg tracking-wide"
          style={{
            background: 'linear-gradient(to right, #D4AF37, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {APP_TAGLINE}...
        </motion.p>

        {/* Loading bar */}
        <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
