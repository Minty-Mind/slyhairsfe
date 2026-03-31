"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getOrders } from "@/lib/api/orders";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, Loader2 } from "lucide-react";
import type { Order } from "@/types";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  PAID: "bg-green-500/10 text-green-400 border-green-500/20",
  SHIPPED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    getOrders()
      .then((res) => setOrders(res.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center">
        <Package className="text-gold-500 mb-4" size={48} />
        <h1 className="text-2xl font-black text-white mb-2">SIGN IN TO VIEW ORDERS</h1>
        <Link href="/auth/signin">
          <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400 mt-4">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="text-gold-500 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">MY ORDERS</h1>
        <div className="h-1 w-16 bg-gold-500 mb-8" />

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="text-gray-500 mx-auto mb-4" size={48} />
            <p className="text-gray-400 mb-6">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop">
              <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400">
                Start Shopping <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <div className="bg-neutral-900 rounded-xl p-6 border border-white/5 hover:border-gold-500/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-bold">{order.orderNumber}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${statusColors[order.status] || "text-gray-400"}`}>
                        {order.status}
                      </span>
                      <span className="text-gold-500 font-bold font-mono text-lg">
                        £{order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
