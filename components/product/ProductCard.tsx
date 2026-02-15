'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, CartItem } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    texture: string;
    description: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            texture: product.texture,
        };
        addItem(cartItem);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Link href={`/shop/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button
                        size="icon"
                        onClick={handleQuickAdd}
                        className="rounded-full bg-gold-500 text-black hover:bg-gold-400 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                    >
                        <ShoppingBag size={20} />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        asChild
                        className="rounded-full bg-white text-black hover:bg-gray-200 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150"
                    >
                        <Link href={`/shop/${product.id}`}>
                            <Eye size={20} />
                        </Link>
                    </Button>
                </div>

                {/* Badges */}
                {product.originalPrice && product.originalPrice > product.price && (
                    <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white border-none text-[10px] font-bold">
                        SALE
                    </Badge>
                )}
                <Badge variant="outline" className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white border-white/10 text-[10px] uppercase tracking-widest">
                    {product.category}
                </Badge>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
                <Link href={`/shop/${product.id}`}>
                    <h3 className="text-white font-medium group-hover:text-gold-500 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-gold-500 font-bold font-mono text-lg">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-gray-500 text-sm line-through font-mono">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                    Texture: <span className="text-gray-300">{product.texture}</span>
                </p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
