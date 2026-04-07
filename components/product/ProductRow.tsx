'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ImageOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, CartItem } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { getProductImageUrl } from '@/lib/image';

const ProductRow = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [imgError, setImgError] = useState(false);

  const imageUrl = getProductImageUrl(product.images?.[0]?.url);
  const showImage = imageUrl && !imgError;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl || '',
      quantity: 1,
      texture: product.texture,
    };
    addItem(cartItem);
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="group flex gap-3 sm:gap-5 p-3 sm:p-4 bg-neutral-900 rounded-xl sm:rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all">
          {/* Image */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-neutral-800">
            {showImage ? (
              <img
                src={imageUrl}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff size={20} className="text-gray-600" />
              </div>
            )}

            {/* Stock Badges */}
            {isOutOfStock && (
              <Badge className="absolute top-1 left-1 bg-red-600 hover:bg-red-700 text-white border-none text-[8px] sm:text-[9px] font-bold px-1 py-0">
                SOLD OUT
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge className="absolute top-1 left-1 bg-orange-600 hover:bg-orange-700 text-white border-none text-[8px] sm:text-[9px] font-bold px-1 py-0">
                LOW
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="space-y-1.5 sm:space-y-2">
              {/* Category badge - hidden on mobile to save space */}
              <Badge variant="outline" className="hidden sm:inline-flex bg-black/40 text-gray-400 border-white/10 text-[9px] uppercase tracking-widest">
                {product.category?.title || 'Hair'}
              </Badge>

              {/* Name + Price row */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg group-hover:text-gold-500 transition-colors line-clamp-2 sm:line-clamp-1 flex-1 min-w-0">
                  {product.name}
                </h3>
                <span className="text-gold-500 font-black text-base sm:text-xl md:text-2xl font-mono shrink-0">
                  £{product.price.toFixed(2)}
                </span>
              </div>

              {/* Description - hidden on mobile */}
              <p className="hidden sm:block text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {product.description || 'Premium Vietnamese human hair, ethically sourced and crafted for perfection.'}
              </p>

              {/* Specs */}
              <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-500">
                <span className="text-gray-300">
                  {product.texture?.replace(/-/g, ' ')}
                </span>
                {product.hairColor && (
                  <>
                    <span className="text-gray-700">•</span>
                    <span className="text-gray-300 hidden sm:inline">{product.hairColor.replace(/-/g, ' ')}</span>
                  </>
                )}
                {product.lengths?.length > 0 && (
                  <>
                    <span className="text-gray-700 hidden sm:inline">•</span>
                    <span className="text-gray-300 hidden md:inline">
                      {product.lengths[0]}&quot;–{product.lengths[product.lengths.length - 1]}&quot;
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-2 sm:mt-3">
              <Button
                onClick={handleQuickAdd}
                disabled={isOutOfStock}
                className="bg-gold-500 text-black hover:bg-gold-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest h-8 sm:h-9 px-2.5 sm:px-4 rounded-lg sm:rounded-xl disabled:opacity-50 flex-1 sm:flex-none"
              >
                <ShoppingBag size={12} className="sm:mr-1.5" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden ml-1">Add</span>
              </Button>
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest h-8 sm:h-9 px-2.5 sm:px-4 rounded-lg sm:rounded-xl flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">Details</span>
                <ArrowRight size={12} className="ml-1 sm:ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductRow;
