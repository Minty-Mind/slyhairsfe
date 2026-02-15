'use client';

import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, LayoutGrid, List, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ShopPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTextures, setSelectedTextures] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['All', 'Bundles', 'Wigs', 'Extensions', 'Closures'];
    const textures = ['Bone Straight', 'Body Wave', 'Kinky Curly', 'Natural Straight'];
    const sortOptions = [
        { value: 'featured', label: 'Featured' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A-Z' },
        { value: 'name-desc', label: 'Name: Z-A' },
    ];

    const toggleTexture = (texture: string) => {
        setSelectedTextures(prev =>
            prev.includes(texture)
                ? prev.filter(t => t !== texture)
                : [...prev, texture]
        );
    };

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = MOCK_PRODUCTS.filter(p => {
            const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
            const textureMatch = selectedTextures.length === 0 || selectedTextures.includes(p.texture);
            return categoryMatch && textureMatch;
        });

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Featured - keep original order
                break;
        }

        return filtered;
    }, [selectedCategory, selectedTextures, sortBy]);

    const resetFilters = () => {
        setSelectedCategory('All');
        setSelectedTextures([]);
        setSortBy('featured');
    };

    const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) + selectedTextures.length;

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">Premium Hair Collection</h1>
                        <p className="text-gray-500 text-xs md:text-sm mt-2 font-light">
                            Showing {filteredAndSortedProducts.length} of {MOCK_PRODUCTS.length} products
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Mobile Filter Toggle */}
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 h-12 flex-1 md:flex-none"
                        >
                            <Filter size={16} />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="ml-1 bg-gold-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                    {activeFilterCount}
                                </span>
                            )}
                        </Button>

                        {/* View Toggle */}
                        <div className="flex bg-neutral-900 rounded-lg p-1 border border-white/10 shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "h-10 w-10 transition-all",
                                    viewMode === 'grid' ? "text-gold-500 bg-black rounded shadow" : "text-gray-500 hover:bg-transparent"
                                )}
                            >
                                <LayoutGrid size={20} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "h-10 w-10 transition-all",
                                    viewMode === 'list' ? "text-gold-500 bg-black rounded shadow" : "text-gray-500 hover:bg-transparent"
                                )}
                            >
                                <List size={20} />
                            </Button>
                        </div>

                        {/* Sort Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 h-12 px-6 min-w-[160px] justify-between">
                                    <span className="text-sm">
                                        {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort'}
                                    </span>
                                    <ChevronDown size={14} className="ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10 text-white min-w-[200px]">
                                {sortOptions.map(option => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onClick={() => setSortBy(option.value)}
                                        className={cn(
                                            "cursor-pointer hover:bg-white/5 focus:bg-white/5",
                                            sortBy === option.value && "text-gold-500 font-semibold"
                                        )}
                                    >
                                        {option.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className={cn(
                        "w-full lg:w-72 space-y-8 shrink-0 transition-all",
                        showFilters ? "block" : "hidden lg:block"
                    )}>
                        {/* Active Filters Header */}
                        {activeFilterCount > 0 && (
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400 text-sm font-light">
                                    {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                                </span>
                                <Button
                                    variant="link"
                                    onClick={resetFilters}
                                    className="text-gold-500 text-xs p-0 h-auto hover:no-underline"
                                >
                                    Clear All
                                </Button>
                            </div>
                        )}

                        {/* Categories */}
                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-3">
                                Categories
                                <Separator className="flex-1 bg-gold-500/20" />
                            </h3>
                            <div className="space-y-1">
                                {categories.map(cat => (
                                    <Button
                                        key={cat}
                                        variant="ghost"
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setShowFilters(false);
                                        }}
                                        className={cn(
                                            "w-full justify-start text-sm transition-all hover:bg-gold-500/5 hover:text-gold-500 rounded-lg",
                                            selectedCategory === cat
                                                ? "text-gold-500 font-bold bg-gold-500/10"
                                                : "text-gray-400 font-light"
                                        )}
                                    >
                                        {cat}
                                        {selectedCategory === cat && cat !== 'All' && (
                                            <span className="ml-auto text-gold-500">✓</span>
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Texture Filters */}
                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-3">
                                Texture
                                <Separator className="flex-1 bg-gold-500/20" />
                            </h3>
                            <div className="space-y-3 px-1">
                                {textures.map(texture => (
                                    <label
                                        key={texture}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div
                                            onClick={() => toggleTexture(texture)}
                                            className={cn(
                                                "w-5 h-5 border rounded transition-all flex items-center justify-center",
                                                selectedTextures.includes(texture)
                                                    ? "border-gold-500 bg-gold-500"
                                                    : "border-white/20 bg-neutral-900 group-hover:border-gold-500"
                                            )}
                                        >
                                            {selectedTextures.includes(texture) && (
                                                <span className="text-black text-xs font-bold">✓</span>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            {texture}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Wholesale CTA */}
                        <div className="bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/20 p-6 rounded-2xl space-y-4">
                            <h4 className="text-gold-500 font-bold text-sm uppercase tracking-widest">Need Wholesale?</h4>
                            <p className="text-gray-400 text-xs leading-relaxed font-light">
                                Contact our factory manager for bulk pricing and custom orders.
                            </p>
                            <Button asChild className="w-full bg-gold-500 text-black font-black uppercase tracking-widest text-xs h-11 hover:bg-gold-400 rounded-lg">
                                <Link href="/contact">CONTACT MANAGER</Link>
                            </Button>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredAndSortedProducts.length > 0 ? (
                            <div
                                className={cn(
                                    viewMode === 'grid'
                                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                                        : "flex flex-col gap-6"
                                )}
                            >
                                {filteredAndSortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-6">
                                <div className="p-8 bg-white/5 rounded-full inline-block">
                                    <Filter size={48} className="text-white/20" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-white text-xl font-bold">No Products Found</h3>
                                    <p className="text-gray-500 font-light max-w-md mx-auto">
                                        We couldn't find any products matching your filters. Try adjusting your selection.
                                    </p>
                                </div>
                                <Button
                                    onClick={resetFilters}
                                    className="bg-gold-500 text-black font-bold hover:bg-gold-400 uppercase tracking-wider"
                                >
                                    Reset All Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
