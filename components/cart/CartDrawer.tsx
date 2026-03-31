'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const router = useRouter();
    const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

    const handleCheckout = () => {
        onClose();
        router.push('/checkout');
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md bg-neutral-950 border-gold-500/20 p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-white/5">
                    <SheetTitle className="flex items-center gap-3 text-white uppercase tracking-widest text-xl">
                        <ShoppingBag className="text-gold-500" />
                        Your Cart
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6">
                    <div className="py-6 space-y-6">
                        {items.length === 0 ? (
                            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                                <div className="p-6 bg-white/5 rounded-full">
                                    <ShoppingBag size={48} className="text-white/20" />
                                </div>
                                <p className="text-gray-400 font-light">Your cart is empty</p>
                                <Button
                                    onClick={onClose}
                                    className="bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full px-8"
                                >
                                    START SHOPPING
                                </Button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-white/5">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-white font-medium group-hover:text-gold-500 transition-colors text-sm">
                                            {item.name}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                            Texture: {item.texture || 'N/A'}
                                        </p>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="text-white hover:text-gold-500 transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="text-white hover:text-gold-500 transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <span className="text-gold-500 font-bold font-mono text-sm">
                                                £{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(item.id)}
                                        className="h-8 w-8 text-gray-600 hover:text-red-500 hover:bg-transparent"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>

                {items.length > 0 && (
                    <div className="p-6 border-t border-white/5 space-y-4 bg-black/50 backdrop-blur-md">
                        <div className="flex items-center justify-between text-white">
                            <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Subtotal</span>
                            <span className="text-2xl font-black font-mono text-gold-500 italic">
                                £{totalPrice().toFixed(2)}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-500 text-center italic leading-tight">
                            Shipping calculated at checkout.
                        </p>
                        <Button
                            onClick={handleCheckout}
                            className="w-full h-14 bg-gold-500 hover:bg-gold-400 text-black font-black uppercase tracking-widest rounded-xl text-sm flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                        >
                            CHECKOUT
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
