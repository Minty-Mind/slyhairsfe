'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ContactPage = () => {
    return (
        <div className="pt-32 pb-20 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center space-y-4 mb-20">
                    <Badge variant="outline" className="text-gold-500 border-gold-500/30 uppercase tracking-[0.3em] font-bold px-4 py-1 italic bg-gold-500/5">
                        Get In Touch
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase whitespace-normal leading-tight">
                        Connect With <br /> <span className="text-gold-500 italic">SlyHairs</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed font-light">
                        Whether you're starting your own brand or looking for personal luxury,
                        our factory managers are ready to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Info Side */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                                <Phone className="text-gold-500" size={24} />
                                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">Phone/WhatsApp</h3>
                                <p className="text-white font-mono text-sm font-bold">+84 967 894 448</p>
                            </div>
                            <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                                <Mail className="text-gold-500" size={24} />
                                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">General Email</h3>
                                <p className="text-white font-mono text-sm font-bold">contact@slyhairs.com</p>
                            </div>
                            <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                                <MapPin className="text-gold-500" size={24} />
                                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">HQ Address</h3>
                                <p className="text-white font-mono text-sm font-bold">Ha Dong, Hanoi, VN</p>
                            </div>
                            <div className="p-8 bg-neutral-900 rounded-2xl border border-white/5 space-y-4 hover:border-gold-500/20 transition-all">
                                <Clock className="text-gold-500" size={24} />
                                <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">Factory Hours</h3>
                                <p className="text-white font-mono text-sm font-bold">Mon - Sat: 8AM - 6PM</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-white font-black uppercase tracking-widest text-[10px] italic">Join Our Elite Community</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="outline" className="flex items-center gap-3 px-6 h-12 bg-neutral-900 border-white/5 rounded-xl hover:border-gold-500 transition-all text-white">
                                    <Instagram size={18} className="text-gold-500" />
                                    <span className="text-xs font-bold uppercase tracking-widest">@slyhairs_factory</span>
                                </Button>
                                <Button variant="outline" className="flex items-center gap-3 px-6 h-12 bg-neutral-900 border-white/5 rounded-xl hover:border-gold-500 transition-all text-white">
                                    <Facebook size={18} className="text-gold-500" />
                                    <span className="text-xs font-bold uppercase tracking-widest">SlyHairs Official</span>
                                </Button>
                            </div>
                        </div>

                        <Button
                            asChild
                            className="h-32 w-full p-0 bg-gold-500 border border-gold-500 rounded-3xl text-black hover:bg-gold-400 overflow-hidden shadow-2xl shadow-gold-500/20 transition-all active:scale-[0.98]"
                        >
                            <a
                                href="https://wa.me/84967894448"
                                target="_blank"
                                className="flex items-center justify-between px-10"
                            >
                                <div className="text-left">
                                    <p className="text-3xl font-black tracking-tighter uppercase leading-none">CHAT WITH US</p>
                                    <p className="text-xs font-bold mt-2 opacity-70">Direct Factory Inquiry & Logistics</p>
                                </div>
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white scale-110 transition-transform hover:rotate-45">
                                    <Send size={24} />
                                </div>
                            </a>
                        </Button>
                    </div>

                    {/* Form Side */}
                    <div className="bg-neutral-900 p-8 md:p-12 rounded-[2.5rem] border border-white/5 h-fit shadow-2xl">
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 italic">Inquiry Protocol</h2>
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Full Name</label>
                                    <input type="text" placeholder="Your Name" className="w-full h-14 bg-black border border-white/5 px-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Email Address</label>
                                    <input type="email" placeholder="email@example.com" className="w-full h-14 bg-black border border-white/5 px-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Subject</label>
                                <select className="w-full h-14 bg-black border border-white/5 px-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Wholesale Distributor Application</option>
                                    <option>Order Support</option>
                                    <option>Factory Tour Request</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 ml-4 italic">Message</label>
                                <textarea rows={5} placeholder="How can we assist your brand today?" className="w-full bg-black border border-white/5 p-6 rounded-2xl focus:outline-none focus:border-gold-500/50 text-sm font-medium transition-all resize-none"></textarea>
                            </div>
                            <Button className="w-full h-16 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all text-sm shadow-xl active:scale-[0.98]">
                                <Send size={18} className="mr-3" />
                                SUBMIT INQUIRY
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
