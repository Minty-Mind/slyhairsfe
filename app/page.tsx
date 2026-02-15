'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
          <img
            src="https://images.unsplash.com/photo-1595475241949-0f021276d4ee?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Direct From Vietnamese Factory
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight">
              UNCOMPROMISED <br />
              <span className="text-gold-500">LUXURY HAIR</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-lg lg:text-xl font-light leading-relaxed">
              Experience the world's finest 100% Vietnamese human hair.
              Double drawn for perfection, sourced with integrity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/shop"
                className="group flex items-center gap-2 px-8 py-4 bg-gold-500 text-black font-bold rounded-full hover:bg-gold-400 transition-all transform hover:scale-105 uppercase tracking-wider"
              >
                SHOP COLLECTION
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all uppercase tracking-wider"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-10 left-0 w-full z-20 px-6 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 py-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-white/60">
              <ShieldCheck className="text-gold-500" />
              <span className="text-xs font-bold uppercase tracking-widest">100% Genuine Human Hair</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Zap className="text-gold-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Fast Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Star className="text-gold-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Premium Factory Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col md:row items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-white">TRENDING NOW</h2>
            <div className="h-1 w-20 bg-gold-500" />
          </div>
          <Link href="/shop" className="text-gold-500 font-bold hover:underline">
            VIEW ALL PRODUCTS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="relative rounded-3xl overflow-hidden gold-gradient p-12 md:p-20 text-center">
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-black">BECOME A DISTRIBUTOR</h2>
            <p className="max-w-xl mx-auto text-black/70 text-lg font-medium">
              Join our network of successful hair vendors. Get exclusive wholesale
              pricing and factory-direct support.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-all shadow-xl"
            >
              APPLY FOR WHOLESALE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
