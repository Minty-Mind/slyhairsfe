'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const totalItems = useCartStore((state) => state.totalItems());

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12',
                isScrolled
                    ? 'bg-black/90 backdrop-blur-md border-b border-gold-500/20 py-3'
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                        SLY<span className="text-gold-500">HAIRS</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/80 hover:text-gold-500 transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    <Button
                        variant="ghost"
                        asChild
                        className="hidden sm:flex items-center gap-2 text-gold-500 hover:text-gold-400 p-0 hover:bg-transparent"
                    >
                        <Link href="https://wa.me/84967894448" target="_blank">
                            <Phone size={18} />
                            <span className="text-sm font-bold uppercase tracking-widest">WhatsApp</span>
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-white hover:text-gold-500 hover:bg-transparent"
                    >
                        <ShoppingBag size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-white hover:bg-transparent"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-gold-500/20 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col p-6 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-white/80 hover:text-gold-500 py-2 border-b border-white/10"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

            {/* Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
};

export default Header;
