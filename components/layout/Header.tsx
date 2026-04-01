'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, Menu, X, User, LogOut, LayoutDashboard, Package, Search, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((state) => state.totalItems());
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-black/80 backdrop-blur-sm py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
              SLY<span className="text-gold-500">HAIRS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 mx-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-[11px] font-semibold text-gray-300 hover:text-gold-500 transition-colors uppercase tracking-[0.2em] rounded-lg hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-gold-500 hover:bg-white/5 h-10 w-10 rounded-xl"
            >
              <Search size={18} />
            </Button>

            {/* Auth */}
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-gray-300 hover:text-gold-500 hover:bg-white/5 h-10 w-10 rounded-xl"
                >
                  <User size={18} />
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="px-5 py-4 border-b border-white/5">
                      <p className="text-sm font-bold text-white truncate">{session.user.name || 'User'}</p>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">{session.user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-gold-500 transition-colors"
                      >
                        <User size={16} />
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-gold-500 transition-colors"
                      >
                        <Package size={16} />
                        My Orders
                      </Link>
                      {session.user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-gold-500 transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-white/5 mt-1 pt-1">
                        <button
                          onClick={() => { signOut({ callbackUrl: '/' }); setIsUserMenuOpen(false); }}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-red-400 transition-colors w-full"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/signin" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-gold-500 hover:bg-white/5 text-[11px] font-semibold uppercase tracking-[0.15em] h-10 px-4 rounded-xl"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-300 hover:text-gold-500 hover:bg-white/5 h-10 w-10 rounded-xl"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-black text-[9px] font-black h-4.5 w-4.5 min-w-[18px] rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:bg-white/5 h-10 w-10 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>

        {/* Search Bar (slide down) */}
        {isSearchOpen && (
          <div className="border-t border-white/5 bg-black/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for bundles, wigs, closures..."
                  autoFocus
                  className="w-full h-12 bg-neutral-900 border border-white/10 rounded-2xl pl-12 pr-4 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-gold-500/50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl">
            <nav className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold text-gray-300 hover:text-gold-500 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/auth/signin"
                  className="text-base font-bold text-gold-500 py-3 px-4 mt-2 rounded-xl border border-gold-500/20 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
