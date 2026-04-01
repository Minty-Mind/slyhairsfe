import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter">
                SLY<span className="text-gold-500">HAIRS</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium Vietnamese human hair. Factory direct to your door —
              luxury quality at honest prices.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/slyhairs" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold-500/10 hover:text-gold-500 transition-all text-gray-400">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com/slyhairs" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold-500/10 hover:text-gold-500 transition-all text-gray-400">
                <Facebook size={16} />
              </a>
              <a href="https://twitter.com/slyhairs" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold-500/10 hover:text-gold-500 transition-all text-gray-400">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black text-gold-500 uppercase tracking-[0.3em]">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/shop?category=bundles" className="hover:text-gold-500 transition-colors">Hair Bundles</Link></li>
              <li><Link href="/shop?category=wigs" className="hover:text-gold-500 transition-colors">Wigs</Link></li>
              <li><Link href="/shop?category=frontals" className="hover:text-gold-500 transition-colors">Frontals</Link></li>
              <li><Link href="/shop?category=closures" className="hover:text-gold-500 transition-colors">Closures</Link></li>
              <li><Link href="/shop?category=extensions" className="hover:text-gold-500 transition-colors">Extensions</Link></li>
              <li><Link href="/shop" className="hover:text-gold-500 transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black text-gold-500 uppercase tracking-[0.3em]">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-gold-500 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-info" className="hover:text-gold-500 transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns-policy" className="hover:text-gold-500 transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link href="/orders" className="hover:text-gold-500 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black text-gold-500 uppercase tracking-[0.3em]">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <span>Ha Dong, Hanoi, Vietnam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-500 shrink-0" />
                <a href="https://wa.me/84967894448" className="hover:text-gold-500 transition-colors">+84 967 894 448</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-500 shrink-0" />
                <a href="mailto:contact@slyhairs.com" className="hover:text-gold-500 transition-colors">contact@slyhairs.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SlyHairs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest">
              <Link href="/privacy-policy" className="hover:text-gold-500 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gold-500 transition-colors">Terms</Link>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CreditCard size={16} />
              <span className="text-[10px] uppercase tracking-widest">Secure Payments via Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
