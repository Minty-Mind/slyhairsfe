import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12 border-t border-gold-500/20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-3xl font-black tracking-tighter">
                            SLY<span className="text-gold-500">HAIRS</span>
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Premium Vietnamese human hair factory. Providing luxury hair extensions
                        and wigs to professional stylists and hair vendors worldwide.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:text-gold-500 transition-colors">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" className="hover:text-gold-500 transition-colors">
                            <Facebook size={20} />
                        </Link>
                        <Link href="#" className="hover:text-gold-500 transition-colors">
                            <Twitter size={20} />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gold-500 uppercase tracking-widest">Shop</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/shop?category=hair-weave" className="hover:text-white transition-colors">Hair Weave</Link></li>
                        <li><Link href="/shop?category=closures" className="hover:text-white transition-colors">Closures & Frontals</Link></li>
                        <li><Link href="/shop?category=wigs" className="hover:text-white transition-colors">Full Lace Wigs</Link></li>
                        <li><Link href="/shop?category=wholesale" className="hover:text-white transition-colors">Wholesale Deals</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gold-500 uppercase tracking-widest">Info</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                        <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                        <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gold-500 uppercase tracking-widest">Contact</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-gold-500 shrink-0" />
                            <span>123 Hair Factory Ave, Hanoi, Vietnam</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={18} className="text-gold-500 shrink-0" />
                            <span>+84 967 894 448</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-gold-500 shrink-0" />
                            <span>sales@slyhairs.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:row items-center justify-between gap-4">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} SLYHAIRS. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                    <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
