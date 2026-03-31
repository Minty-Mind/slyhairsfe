"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { createCheckoutSession } from "@/lib/api/checkout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center">
        <ShoppingBag className="text-gold-500 mb-4" size={48} />
        <h1 className="text-2xl font-black text-white mb-2">SIGN IN TO CHECKOUT</h1>
        <p className="text-gray-400 mb-6">You need to be signed in to complete your purchase.</p>
        <Link href="/auth/signin">
          <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400">
            Sign In <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center">
        <ShoppingBag className="text-gray-500 mb-4" size={48} />
        <h1 className="text-2xl font-black text-white mb-2">YOUR CART IS EMPTY</h1>
        <p className="text-gray-400 mb-6">Add some products to your cart before checking out.</p>
        <Link href="/shop">
          <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const checkoutItems = items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const { url } = await createCheckoutSession(checkoutItems);
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">CHECKOUT</h1>
        <div className="h-1 w-16 bg-gold-500 mb-8" />

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-neutral-900 rounded-xl p-4 border border-white/5">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.name}</h3>
                <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
              </div>
              <span className="text-gold-500 font-bold font-mono">
                £{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 rounded-xl p-6 border border-white/5 space-y-4">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span className="text-white font-mono">£{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Shipping</span>
            <span className="text-white">Calculated at checkout</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between">
            <span className="text-white font-bold text-lg">Total</span>
            <span className="text-gold-500 font-black text-xl font-mono">£{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full mt-6 h-14 bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 text-base uppercase tracking-wider"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Pay with Stripe
              <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
