'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, Shield, Truck, ShoppingBag, Send, ChevronRight, Minus, Plus, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [selectedLength, setSelectedLength] = useState('12"');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAddedNotification, setShowAddedNotification] = useState(false);

    const product = MOCK_PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
            <div className="pt-40 pb-20 text-center text-white space-y-6 px-6">
                <h2 className="text-3xl font-black">Product Not Found</h2>
                <p className="text-gray-500">The product you're looking for doesn't exist.</p>
                <Button asChild className="bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 h-12 px-8 uppercase tracking-wider">
                    <Link href="/shop">BACK TO SHOP</Link>
                </Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({
            id: `${product.id}-${selectedLength}`,
            name: `${product.name} (${selectedLength})`,
            price: product.price,
            image: product.image,
            quantity,
            length: selectedLength,
            texture: product.texture,
        });
        setShowAddedNotification(true);
        setTimeout(() => setShowAddedNotification(false), 3000);
    };

    const handleWhatsAppOrder = () => {
        const message = encodeURIComponent(
            `Hi SlyHairs! I'm interested in:\n\n${product.name}\nLength: ${selectedLength}\nQuantity: ${quantity}\nTexture: ${product.texture}\n\nProduct Link: ${window.location.href}`
        );
        window.open(`https://wa.me/84967894448?text=${message}`, '_blank');
    };

    const lengths = ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'];
    const images = [product.image, product.image, product.image, product.image];
    const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 bg-black min-h-screen">
            {/* Added to Cart Notification */}
            <AnimatePresence>
                {showAddedNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 right-6 z-50 bg-gold-500 text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    >
                        <Check size={20} className="font-bold" />
                        <span className="font-bold text-sm">Added to cart!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider mb-8 font-medium">
                    <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-gold-500/30" />
                    <Link href="/shop" className="hover:text-gold-500 transition-colors">Shop</Link>
                    <ChevronRight size={14} className="text-gold-500/30" />
                    <span className="text-gold-500">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 relative group"
                        >
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.tags && product.tags.length > 0 && (
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.tags.map(tag => (
                                        <Badge
                                            key={tag}
                                            className="bg-gold-500 text-black border-none font-black text-xs uppercase tracking-wider px-3 py-1"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-3">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={cn(
                                        "aspect-square rounded-2xl overflow-hidden border-2 transition-all transform hover:scale-105",
                                        selectedImage === idx
                                            ? "border-gold-500 ring-2 ring-gold-500/20"
                                            : "border-white/10 hover:border-gold-500/50"
                                    )}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className={cn(
                                            "w-full h-full object-cover transition-opacity",
                                            selectedImage === idx ? "opacity-100" : "opacity-60 hover:opacity-100"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-gold-500 border-gold-500/30 font-bold text-xs uppercase tracking-wider px-4 py-1.5 bg-gold-500/5">
                                    {product.category}
                                </Badge>
                                <Badge variant="outline" className="text-gray-400 border-white/10 font-medium text-xs uppercase tracking-wider px-4 py-1.5">
                                    {product.texture}
                                </Badge>
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tighter">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 py-2">
                                <div className="flex text-gold-500">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-gray-500 text-xs md:text-sm font-medium">
                                    5.0 • 124 Reviews
                                </span>
                            </div>

                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-2xl text-gray-600 line-through">
                                            ${product.originalPrice.toFixed(2)}
                                        </span>
                                        <Badge className="bg-red-500/10 text-red-500 border-none font-bold text-xs">
                                            SAVE ${(product.originalPrice - product.price).toFixed(2)}
                                        </Badge>
                                    </>
                                )}
                            </div>

                            <p className="text-gray-400 text-base leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <Separator className="bg-white/10 mb-8" />

                        {/* Length Selection */}
                        <div className="space-y-4 mb-6">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                <span>Select Length</span>
                                <span className="text-gold-500">({selectedLength})</span>
                            </h3>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {lengths.map(len => (
                                    <Button
                                        key={len}
                                        variant={selectedLength === len ? "default" : "outline"}
                                        onClick={() => setSelectedLength(len)}
                                        className={cn(
                                            "h-12 text-sm font-bold transition-all",
                                            selectedLength === len
                                                ? "bg-gold-500 text-black hover:bg-gold-400 border-gold-500"
                                                : "bg-neutral-900 border-white/10 text-white hover:border-gold-500/50 hover:bg-neutral-800"
                                        )}
                                    >
                                        {len}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div className="space-y-4 mb-8">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Quantity</h3>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center bg-neutral-900 border border-white/10 rounded-xl h-14 px-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="text-white hover:bg-white/5 h-10 w-10"
                                    >
                                        <Minus size={16} />
                                    </Button>
                                    <span className="text-white font-black w-16 text-center text-lg">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="text-white hover:bg-white/5 h-10 w-10"
                                    >
                                        <Plus size={16} />
                                    </Button>
                                </div>
                                <Badge className="bg-green-500/10 text-green-500 border-none font-bold uppercase tracking-wider px-4 py-2">
                                    ✓ IN STOCK
                                </Badge>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 h-14 bg-white text-black font-black uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-all"
                            >
                                <ShoppingBag size={20} className="mr-3" />
                                Add To Cart
                            </Button>
                            <Button
                                onClick={handleWhatsAppOrder}
                                className="flex-1 h-14 bg-gold-500 text-black font-black uppercase tracking-wider rounded-xl hover:bg-gold-400 transition-all"
                            >
                                <Send size={20} className="mr-3" />
                                WhatsApp Order
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-6 p-6 bg-neutral-900/50 border border-white/5 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gold-500/10 rounded-xl">
                                    <Truck className="text-gold-500" size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-bold text-sm mb-1">Fast Shipping</p>
                                    <p className="text-gray-500 text-xs leading-relaxed">Global delivery in 3-7 business days</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gold-500/10 rounded-xl">
                                    <Shield className="text-gold-500" size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-bold text-sm mb-1">Quality Guaranteed</p>
                                    <p className="text-gray-500 text-xs leading-relaxed">Factory-direct quality assurance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <Tabs defaultValue="description" className="mb-20">
                    <TabsList className="bg-neutral-900 border border-white/10 p-1 h-auto mb-8">
                        <TabsTrigger
                            value="description"
                            className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-bold uppercase tracking-wider text-sm px-8 py-3"
                        >
                            Description
                        </TabsTrigger>
                        <TabsTrigger
                            value="specifications"
                            className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-bold uppercase tracking-wider text-sm px-8 py-3"
                        >
                            Specifications
                        </TabsTrigger>
                        <TabsTrigger
                            value="care"
                            className="data-[state=active]:bg-gold-500 data-[state=active]:text-black font-bold uppercase tracking-wider text-sm px-8 py-3"
                        >
                            Care Instructions
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-0">
                        <div className="bg-neutral-900/30 border border-white/5 rounded-2xl p-8 space-y-4">
                            <h3 className="text-2xl font-black text-white mb-4">Premium Vietnamese Human Hair</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Experience the finest quality with our {product.name}. Sourced directly from our Vietnamese factory,
                                each bundle is meticulously crafted using 100% human hair with double-drawn technology for
                                consistent thickness from root to tip.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Our {product.texture} texture maintains its natural beauty and can be styled, colored, and treated
                                just like your own hair. Perfect for professional stylists and discerning clients who demand
                                nothing but the best.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-0">
                        <div className="bg-neutral-900/30 border border-white/5 rounded-2xl p-8">
                            <div className="grid gap-4">
                                {[
                                    { label: 'Hair Type', value: '100% Vietnamese Human Hair' },
                                    { label: 'Texture', value: product.texture },
                                    { label: 'Category', value: product.category },
                                    { label: 'Quality', value: 'Double Drawn, Premium Grade' },
                                    { label: 'Color', value: 'Natural Black (Can be dyed)' },
                                    { label: 'Weight', value: '100g per bundle (±5g)' },
                                    { label: 'Lifespan', value: '1-2 years with proper care' },
                                    { label: 'Origin', value: 'Factory Direct from Vietnam' },
                                ].map((spec, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                        <span className="text-gray-500 font-medium">{spec.label}</span>
                                        <span className="text-white font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="care" className="mt-0">
                        <div className="bg-neutral-900/30 border border-white/5 rounded-2xl p-8 space-y-6">
                            <div>
                                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                    <Info size={18} className="text-gold-500" />
                                    Washing Instructions
                                </h4>
                                <ul className="text-gray-400 space-y-2 ml-7">
                                    <li>• Wash with lukewarm water and sulfate-free shampoo</li>
                                    <li>• Apply conditioner from mid-length to ends</li>
                                    <li>• Gently squeeze out excess water, do not wring</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                    <Info size={18} className="text-gold-500" />
                                    Styling Tips
                                </h4>
                                <ul className="text-gray-400 space-y-2 ml-7">
                                    <li>• Use heat protectant spray before styling</li>
                                    <li>• Keep heat settings below 180°C (356°F)</li>
                                    <li>• Detangle gently with a wide-tooth comb</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                    <Info size={18} className="text-gold-500" />
                                    Storage
                                </h4>
                                <ul className="text-gray-400 space-y-2 ml-7">
                                    <li>• Store in a cool, dry place away from direct sunlight</li>
                                    <li>• Keep in the original packaging when not in use</li>
                                    <li>• Avoid contact with harsh chemicals</li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">You May Also Like</h2>
                            <Button asChild variant="link" className="text-gold-500 hover:text-gold-400 uppercase tracking-wider font-bold">
                                <Link href="/shop">View All</Link>
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(relatedProduct => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
