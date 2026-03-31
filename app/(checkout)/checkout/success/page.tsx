"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-md text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <CheckCircle className="text-green-500 mx-auto relative" size={72} strokeWidth={1.5} />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black text-white tracking-tight">ORDER CONFIRMED</h1>
          <div className="h-1 w-16 bg-gold-500 mx-auto" />
          <p className="text-gray-400 leading-relaxed">
            Thank you for choosing SlyHairs! Your order has been placed
            successfully. You&apos;ll receive a confirmation email shortly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
          <Link href="/orders">
            <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400 rounded-xl h-12 px-6 w-full sm:w-auto">
              <Package size={18} className="mr-2" />
              View My Orders
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-xl h-12 px-6 w-full sm:w-auto">
              Continue Shopping
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="text-gold-500 animate-spin" size={32} />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
