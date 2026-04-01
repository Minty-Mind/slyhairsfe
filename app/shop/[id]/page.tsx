'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Shield, Truck, ShoppingBag, Minus, Plus, ImageOff } from 'lucide-react';

const NoImage = () => (
  <div className="w-full h-full bg-neutral-800 flex flex-col items-center justify-center gap-3">
    <ImageOff size={48} className="text-gray-600" />
    <span className="text-gray-600 text-xs uppercase tracking-widest">No Image Yet</span>
  </div>
);
import { motion } from 'framer-motion';
import { getProduct } from '@/lib/api/products';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product } from '@/types';
import { getProductImageUrl } from '@/lib/image';
import { toast } from 'sonner';
import ProductReviews from '@/components/product/ProductReviews';

const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  const [zooming, setZooming] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-crosshair overflow-hidden"
      onMouseEnter={() => setZooming(true)}
      onMouseLeave={() => setZooming(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {zooming && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: '250%',
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLength, setSelectedLength] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        setProduct(res.product);
        if (res.product.lengths?.length > 0) {
          setSelectedLength(res.product.lengths[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center text-white space-y-6 px-6">
        <h2 className="text-3xl font-black">Product Not Found</h2>
        <p className="text-gray-500">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild className="bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 h-12 px-8 uppercase tracking-wider">
          <Link href="/shop">BACK TO SHOP</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartId = selectedLength ? `${product.id}-${selectedLength}` : product.id;
    addItem({
      id: cartId,
      name: selectedLength ? `${product.name} (${selectedLength}")` : product.name,
      price: product.price,
      image: getProductImageUrl(product.images?.[0]?.url) || "",
      quantity,
      length: selectedLength ? `${selectedLength}"` : undefined,
      texture: product.texture?.replace(/-/g, ' '),
    });
    toast.success(`${product.name} added to cart`);
  };

  const isOutOfStock = product.stock <= 0;
  const images = product.images?.length > 0 ? product.images : [];

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gold-500">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold-500">Shop</Link>
        <span>/</span>
        <span className="text-gray-300">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 mb-4">
            {images.length > 0 && getProductImageUrl(images[selectedImage]?.url) ? (
              <ZoomImage
                src={getProductImageUrl(images[selectedImage]?.url)!}
                alt={product.name}
              />
            ) : (
              <NoImage />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => {
                const thumbUrl = getProductImageUrl(img.url);
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-gold-500' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    {thumbUrl ? (
                      <img src={thumbUrl} alt={img.alt || ''} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                        <ImageOff size={14} className="text-gray-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-black/60 text-white border-white/10 text-[10px] uppercase tracking-widest">
                {product.category?.title}
              </Badge>
              <Badge variant="outline" className="bg-black/60 text-white border-white/10 text-[10px] uppercase tracking-widest">
                {product.texture?.replace(/-/g, ' ')}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">{product.name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-gold-500 font-black text-3xl font-mono">£{product.price.toFixed(2)}</span>
          </div>

          {isOutOfStock && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm font-bold">
              OUT OF STOCK
            </div>
          )}

          {!isOutOfStock && product.stock <= 5 && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-orange-400 text-sm">
              Only {product.stock} left in stock
            </div>
          )}

          <Separator className="bg-white/10" />

          {/* Length Selector */}
          {product.lengths?.length > 0 && (
            <div>
              <label className="text-sm font-bold text-white uppercase tracking-widest mb-3 block">
                Length
              </label>
              <div className="flex flex-wrap gap-2">
                {product.lengths.map((len) => (
                  <button
                    key={len}
                    onClick={() => setSelectedLength(len)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedLength === len
                        ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                        : 'border-white/10 text-gray-400 hover:border-gold-500/50'
                    }`}
                  >
                    {len}&quot;
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="text-sm font-bold text-white uppercase tracking-widest mb-3 block">Quantity</label>
            <div className="flex items-center gap-1 bg-neutral-900 rounded-lg border border-white/10 w-fit">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-white hover:text-gold-500 hover:bg-transparent">
                <Minus size={16} />
              </Button>
              <span className="w-12 text-center text-white font-bold">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="text-white hover:text-gold-500 hover:bg-transparent">
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full h-14 bg-gold-500 text-black font-black rounded-xl hover:bg-gold-400 text-base uppercase tracking-wider disabled:opacity-50"
          >
            <ShoppingBag size={20} className="mr-2" />
            {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </Button>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-neutral-900 rounded-xl border border-white/5">
              <Truck className="text-gold-500 shrink-0" size={20} />
              <div>
                <p className="text-white text-xs font-bold">Fast Shipping</p>
                <p className="text-gray-500 text-[10px]">Worldwide delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-900 rounded-xl border border-white/5">
              <Shield className="text-gold-500 shrink-0" size={20} />
              <div>
                <p className="text-white text-xs font-bold">Quality Guarantee</p>
                <p className="text-gray-500 text-[10px]">100% human hair</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="bg-neutral-900 border border-white/5 p-1">
              <TabsTrigger value="description" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-500 text-xs uppercase tracking-widest">
                Description
              </TabsTrigger>
              <TabsTrigger value="specs" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-500 text-xs uppercase tracking-widest">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-500 text-xs uppercase tracking-widest">
                Reviews ({product.reviews?.length || 0})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 text-gray-400 text-sm leading-relaxed">
              {product.description || 'No description available.'}
            </TabsContent>
            <TabsContent value="specs" className="mt-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-500">Texture</span>
                  <span className="text-white capitalize">{product.texture?.replace(/-/g, ' ')}</span>
                </div>
                {product.hairColor && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Color</span>
                    <span className="text-white capitalize">{product.hairColor.replace(/-/g, ' ')}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-500">Origin</span>
                  <span className="text-white capitalize">{product.origin}</span>
                </div>
                {product.weight && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Weight</span>
                    <span className="text-white">{product.weight}g</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-500">Double Drawn</span>
                  <span className="text-white">{product.isDoubleDrawn ? 'Yes' : 'No'}</span>
                </div>
                {product.density && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Density</span>
                    <span className="text-white">{product.density}%</span>
                  </div>
                )}
                {product.laceType && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Lace Type</span>
                    <span className="text-white capitalize">{product.laceType.replace(/-/g, ' ')}</span>
                  </div>
                )}
                {product.laceSize && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Lace Size</span>
                    <span className="text-white">{product.laceSize}</span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <ProductReviews productId={product.id} reviews={product.reviews || []} />
            </TabsContent>
          </Tabs>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gold-500/5 border-gold-500/20 text-gold-500 text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
