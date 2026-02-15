'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Globe, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
    return (
        <div className="pt-32 pb-20 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <Badge variant="outline" className="text-gold-500 border-gold-500/30 uppercase tracking-[0.3em] font-bold px-4 py-1 italic bg-gold-500/5">
                            Our Legacy
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter transition-all leading-tight uppercase">
                            THE ART OF <br />
                            <span className="text-gold-500 italic">VIETNAMESE HAIR</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            Founded over a decade ago in the heart of Vietnam's hair manufacturing district,
                            SlyHairs began with a single mission: to provide professional stylists
                            with the highest grade of ethically sourced human hair.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            Today, we are a leading factory exporter, shipping premium bundles,
                            wigs, and frontals to over 50 countries. Every strand is selected
                            for its strength, shine, and longevity.
                        </p>
                        <Button asChild className="bg-gold-500 hover:bg-gold-400 text-black font-black uppercase tracking-widest px-8 h-14 rounded-xl">
                            <a href="/shop">EXPLORE THE COLLECTION</a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-gold-500/20 shadow-2xl shadow-gold-500/10">
                            <img
                                src="https://images.unsplash.com/photo-1595475241949-0f021276d4ee?q=80&w=2000&auto=format&fit=crop"
                                alt="Hair Factory"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-neutral-900 border border-gold-500/30 p-10 rounded-3xl hidden md:block shadow-2xl">
                            <p className="text-gold-500 text-4xl font-black italic tracking-tighter">10+ Years</p>
                            <p className="text-white text-[10px] uppercase tracking-widest font-bold mt-1 opacity-70">Of Industry Excellence</p>
                        </div>
                    </motion.div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {[
                        { icon: ShieldCheck, title: "Pure Quality", desc: "100% Raw human hair with no synthetic mixes or chemical processing." },
                        { icon: Award, title: "Expert Craft", desc: "Double drawn ends ensuring the same thickness from root to tip." },
                        { icon: Users, title: "Fair Sourcing", desc: "Directly sourced from donors with full transparency and fair compensation." },
                        { icon: Globe, title: "Global Reach", desc: "Efficient logistics network delivering to your doorstep within 3-7 days." }
                    ].map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 bg-neutral-900 rounded-[2rem] border border-white/5 hover:border-gold-500/30 transition-all group group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gold-500/5 flex items-center justify-center mb-8 border border-gold-500/10 group-hover:bg-gold-500/10 transition-colors">
                                <val.icon size={32} className="text-gold-500 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter italic">{val.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Video Placeholder Section */}
                <div className="relative rounded-[3rem] overflow-hidden py-32 bg-neutral-900 border border-white/5 text-center group">
                    <div className="max-w-2xl mx-auto space-y-8 px-6 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">See Our Process</h2>
                        <p className="text-gray-400 font-light text-lg">
                            Take a virtual tour of our Hanoi factory. See how we process, clean, and
                            grade our hair extensions before they reach you.
                        </p>
                        <Button className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-gold-500/20 p-0">
                            <Play size={24} fill="black" className="ml-1" />
                        </Button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
