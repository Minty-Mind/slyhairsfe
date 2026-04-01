'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Eye, ImageOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, CartItem } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { getProductImageUrl } from '@/lib/image';

const NoImage = () => (
  <div className="w-full h-full bg-neutral-800 flex flex-col items-center justify-center gap-2">
    <ImageOff size={32} className="text-gray-600" />
    <span className="text-gray-600 text-[10px] uppercase tracking-widest">No Image</span>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [imgError, setImgError] = useState(false);

  const imageUrl = getProductImageUrl(product.images?.[0]?.url);
  const showImage = imageUrl && !imgError;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl || "",
      quantity: 1,
      texture: product.texture,
    };
    addItem(cartItem);
  };
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link href={`/shop/${product.slug}`}>
          {showImage ? (
            <img
              src={imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <NoImage />
          )}
        </Link>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {!isOutOfStock && (
            <Button
              size="icon"
              onClick={handleQuickAdd}
              className="rounded-full bg-gold-500 text-black hover:bg-gold-400 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
            >
              <ShoppingBag size={20} />
            </Button>
          )}
          <Button
            size="icon"
            variant="secondary"
            asChild
            className="rounded-full bg-white text-black hover:bg-gray-200 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150"
          >
            <Link href={`/shop/${product.slug}`}>
              <Eye size={20} />
            </Link>
          </Button>
        </div>

        {isOutOfStock && (
          <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white border-none text-[10px] font-bold">
            SOLD OUT
          </Badge>
        )}
        {isLowStock && !isOutOfStock && (
          <Badge className="absolute top-4 left-4 bg-orange-600 hover:bg-orange-700 text-white border-none text-[10px] font-bold">
            LOW STOCK
          </Badge>
        )}
        {product.featured && (
          <Badge className="absolute top-4 left-4 bg-gold-500 hover:bg-gold-400 text-black border-none text-[10px] font-bold">
            FEATURED
          </Badge>
        )}
        <Badge variant="outline" className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white border-white/10 text-[10px] uppercase tracking-widest">
          {product.category?.title || 'Hair'}
        </Badge>
      </div>

      <div className="p-5 space-y-2">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-white font-medium group-hover:text-gold-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-gold-500 font-bold font-mono text-lg">
            £{product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
          Texture: <span className="text-gray-300">{product.texture?.replace(/-/g, ' ')}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
