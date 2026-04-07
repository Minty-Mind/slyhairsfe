'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, Sparkles, Crown, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { getProducts } from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';
import { Button } from '@/components/ui/button';
import type { Product, Category } from '@/types';
import { HAIR_IMAGES } from '@/lib/image';

const CATEGORY_IMAGES: Record<string, string> = {
  bundles: HAIR_IMAGES.bundles,
  wigs: HAIR_IMAGES.wigs,
  frontals: HAIR_IMAGES.frontals,
  closures: HAIR_IMAGES.closures,
  extensions: HAIR_IMAGES.extensions,
};

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts({ featured: true, limit: 8 }),
      getProducts({ sort: 'newest', limit: 8 }),
      getCategories(),
    ])
      .then(([featuredRes, newRes, catRes]) => {
        setFeatured(featuredRes.products);
        setNewArrivals(newRes.products);
        setCategories(catRes.categories);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5">
                <Sparkles size={14} className="text-gold-500" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold-500">New Collection</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
                PREMIUM<br />
                <span className="text-gold-500">VIETNAMESE</span><br />
                HAIR
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed">
                Double drawn, ethically sourced luxury hair.
                From our factory to your crown — no middleman.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link href="/shop">
                  <Button className="h-14 px-10 bg-gold-500 text-black font-black rounded-2xl hover:bg-gold-400 text-sm uppercase tracking-widest transition-all active:scale-[0.98]">
                    Shop Now
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/shop?category=wigs">
                  <Button variant="outline" className="h-14 px-10 border-white/15 text-white hover:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-sm">
                    Browse Wigs
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src={HAIR_IMAGES.hero}
                  alt="Premium Vietnamese Hair"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-neutral-900 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center">
                    <Crown className="text-gold-500" size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">500+ Happy Clients</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                      ))}
                      <span className="text-gray-400 text-[10px] ml-1">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold mb-2">Browse</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">Shop by Category</h2>
          </div>
          <Link href="/shop" className="text-gold-500 text-sm font-bold hover:underline flex items-center gap-1">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.slug}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all"
              >
                <img
                  src={CATEGORY_IMAGES[cat.slug] || CATEGORY_IMAGES.bundles}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-black text-lg uppercase tracking-wide">{cat.title}</h3>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
                    {cat._count?.products || 0} products
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-neutral-950/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold mb-2">Handpicked</p>
              <h2 className="text-2xl md:text-3xl font-black text-white">Featured Products</h2>
            </div>
            <Link href="/shop?featured=true" className="text-gold-500 text-sm font-bold hover:underline flex items-center gap-1">
              See All <ChevronRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-neutral-900 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/shop?category=bundles" className="group">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <img
                src={HAIR_IMAGES.heroBundles}
                alt="Bundles"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold">Starting at £55</p>
                <h3 className="text-3xl font-black text-white">HAIR BUNDLES</h3>
                <p className="text-gray-300 text-sm">100% unprocessed Vietnamese hair</p>
                <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-bold mt-2 group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
          <Link href="/shop?category=wigs" className="group">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <img
                src={HAIR_IMAGES.heroWigs}
                alt="Wigs"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold">HD Lace Collection</p>
                <h3 className="text-3xl font-black text-white">LUXURY WIGS</h3>
                <p className="text-gray-300 text-sm">Pre-plucked, ready to wear</p>
                <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-bold mt-2 group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6 pb-16 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold mb-2">Just In</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">New Arrivals</h2>
          </div>
          <Link href="/shop?sort=newest" className="text-gold-500 text-sm font-bold hover:underline flex items-center gap-1">
            See All <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-neutral-900 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="border-t border-white/5 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
              <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <Truck className="text-gold-500" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Free Worldwide Shipping</h3>
                <p className="text-gray-500 text-xs mt-1">On orders over £150. Express available.</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
              <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="text-gold-500" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Quality Guaranteed</h3>
                <p className="text-gray-500 text-xs mt-1">100% virgin human hair. 30-day returns.</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
              <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <Crown className="text-gold-500" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Factory Direct Pricing</h3>
                <p className="text-gray-500 text-xs mt-1">No middleman. Premium hair at honest prices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="relative rounded-3xl overflow-hidden gold-gradient p-10 md:p-16">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-black">WHOLESALE PRICING</h2>
              <p className="text-black/60 text-sm mt-2 max-w-md">
                Start your own hair brand with factory-direct wholesale pricing. Minimum order 10 bundles.
              </p>
            </div>
            <Link href="/contact">
              <Button className="h-14 px-10 bg-black text-white font-black rounded-2xl hover:bg-gray-900 text-sm uppercase tracking-widest shadow-xl">
                Apply Now
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
