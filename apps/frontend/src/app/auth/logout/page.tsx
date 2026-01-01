/**
 * ANADOLU REALM - Çıkış Yap (Logout)
 * User logout page
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LogoutPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Clear any stored user data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      sessionStorage.clear();
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to home page after countdown
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {/* Logout Animation */}
        <div className="text-center mb-8">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl mb-6"
          >
            🚪
          </motion.div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Çıkış Yapılıyor
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Anadolu Diyarı'ndan ayrılıyorsunuz...
          </p>
        </div>

        {/* Success Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/50"
        >
          <div className="text-center space-y-4">
            <div className="text-6xl">✅</div>
            <h2 className="text-2xl font-bold text-green-400">
              Başarıyla Çıkış Yapıldı
            </h2>
            <p className="text-gray-400">
              Oturumunuz güvenli bir şekilde sonlandırıldı.
            </p>

            {/* Countdown */}
            <div className="pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">
                Ana sayfaya yönlendiriliyorsunuz...
              </p>
              <motion.div
                key={countdown}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold text-yellow-400"
              >
                {countdown}
              </motion.div>
            </div>

            {/* Messages */}
            <div className="pt-6 space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-green-400">✓</span>
                <span>Karakterler kaydedildi</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-green-400">✓</span>
                <span>İlerleme kaydedildi</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-green-400">✓</span>
                <span>Ayarlar kaydedildi</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center space-y-3"
        >
          <button
            onClick={() => router.push('/')}
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Hemen ana sayfaya git →
          </button>

          <div className="text-gray-500 text-xs">
            Hoşça kalın, kahramanlar! 🌟
          </div>
        </motion.div>

        {/* Farewell Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
            <p className="text-sm text-purple-300">
              💫 <em>"Anadolu toprakları sizi bekliyor..."</em> 💫
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
