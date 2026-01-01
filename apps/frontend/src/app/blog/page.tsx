/**
 * TURK DIJITAL METROPOL - Blog Page
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, User, Eye, Heart } from 'lucide-react';
import { blogPosts } from '@/lib/mock/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      <section className="relative min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <FileText className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#E30A17] to-[#D4AF37] bg-clip-text text-transparent">
                Blog & Haberler
              </span>
            </h1>
            <p className="text-xl text-gray-400">En son guncellemeler ve duyurular</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all group cursor-pointer"
              >
                <div className="text-6xl mb-4">📰</div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
