'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Filter, ChevronDown, LayoutGrid, List, X, SlidersHorizontal, Loader2 } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { getProducts } from '@/lib/api/products';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Product } from '@/types';

const CATEGORIES = [
  { value: '', label: 'All Products' },
  { value: 'bundles', label: 'Bundles' },
  { value: 'wigs', label: 'Wigs' },
  { value: 'frontals', label: 'Frontals' },
  { value: 'closures', label: 'Closures' },
  { value: 'extensions', label: 'Extensions' },
];

const TEXTURES = [
  { value: 'bone-straight', label: 'Bone Straight' },
  { value: 'body-wave', label: 'Body Wave' },
  { value: 'deep-wave', label: 'Deep Wave' },
  { value: 'water-wave', label: 'Water Wave' },
  { value: 'kinky-curly', label: 'Kinky Curly' },
  { value: 'loose-wave', label: 'Loose Wave' },
  { value: 'kinky-straight', label: 'Kinky Straight' },
  { value: 'natural-straight', label: 'Natural Straight' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
  { value: 'newest', label: 'Newest First' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSort = searchParams.get('sort') || 'relevance';

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTexture, setSelectedTexture] = useState('');
  const [sortBy, setSortBy] = useState(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProducts({
        category: selectedCategory || undefined,
        texture: selectedTexture || undefined,
        sort: sortBy,
        limit: 50,
      });
      setProducts(res.products);
      setTotal(res.total);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedTexture, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedTexture('');
    setSortBy('relevance');
  };

  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedTexture ? 1 : 0);

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Shop</span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className="text-gold-500 capitalize">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              {selectedCategory
                ? CATEGORIES.find(c => c.value === selectedCategory)?.label || 'Shop'
                : 'All Products'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {loading ? 'Loading...' : `${total} product${total !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Mobile Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="lg:hidden flex items-center gap-2 border-white/10 text-white hover:bg-white/5 h-11 flex-1 md:flex-none rounded-xl"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-gold-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            {/* View Toggle */}
            <div className="flex bg-neutral-900 rounded-xl p-1 border border-white/5 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2.5 rounded-lg transition-all",
                  viewMode === 'grid' ? "text-gold-500 bg-black shadow" : "text-gray-500"
                )}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2.5 rounded-lg transition-all",
                  viewMode === 'list' ? "text-gold-500 bg-black shadow" : "text-gray-500"
                )}
              >
                <List size={16} />
              </button>
            </div>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 h-11 px-4 min-w-[150px] justify-between rounded-xl text-xs">
                  {SORT_OPTIONS.find(o => o.value === sortBy)?.label || 'Sort'}
                  <ChevronDown size={14} className="ml-2 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10 text-white min-w-[180px] rounded-xl">
                {SORT_OPTIONS.map(option => (
                  <DropdownMenuItem key={option.value} onClick={() => setSortBy(option.value)}
                    className={cn("cursor-pointer text-xs", sortBy === option.value && "text-gold-500 font-bold")}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={cn("w-full lg:w-64 space-y-6 shrink-0", showFilters ? "block" : "hidden lg:block")}>
            {activeFilterCount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">{activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}</span>
                <button onClick={resetFilters} className="text-gold-500 text-xs font-bold hover:underline">
                  Clear All
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="bg-neutral-900/50 rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                Category
                <Separator className="flex-1 bg-white/5" />
              </h3>
              <div className="space-y-0.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => { setSelectedCategory(cat.value); setShowFilters(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all",
                      selectedCategory === cat.value
                        ? "text-gold-500 font-bold bg-gold-500/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textures */}
            <div className="bg-neutral-900/50 rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-3">
                Texture
                <Separator className="flex-1 bg-white/5" />
              </h3>
              <div className="space-y-0.5">
                {TEXTURES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => { setSelectedTexture(selectedTexture === t.value ? '' : t.value); setShowFilters(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between",
                      selectedTexture === t.value
                        ? "text-gold-500 font-bold bg-gold-500/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {t.label}
                    {selectedTexture === t.value && <X size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Wholesale CTA */}
            <div className="gold-gradient rounded-2xl p-6 space-y-3">
              <h4 className="text-black font-black text-sm uppercase tracking-wide">Wholesale?</h4>
              <p className="text-black/60 text-xs leading-relaxed">
                Get factory-direct pricing on bulk orders.
              </p>
              <Link href="/contact">
                <Button className="w-full bg-black text-white font-bold uppercase tracking-widest text-[10px] h-10 rounded-xl hover:bg-gray-900">
                  Get Quote
                </Button>
              </Link>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] rounded-2xl bg-neutral-900 animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className={cn(
                viewMode === 'grid'
                  ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "flex flex-col gap-4"
              )}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-neutral-900 rounded-2xl flex items-center justify-center">
                  <Filter size={32} className="text-gray-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-xl font-bold">No Products Found</h3>
                  <p className="text-gray-500 max-w-sm mx-auto text-sm">
                    Try adjusting your filters or browse all products.
                  </p>
                </div>
                <Button onClick={resetFilters} className="bg-gold-500 text-black font-bold hover:bg-gold-400 rounded-xl uppercase tracking-wider text-xs h-11">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setShowFilters(false)} />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="text-gold-500 animate-spin" size={32} />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
