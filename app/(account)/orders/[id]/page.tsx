"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/lib/api/orders";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { Order } from "@/types";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  PAID: "bg-green-500/10 text-green-400 border-green-500/20",
  SHIPPED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id)
      .then((res) => setOrder(res.order))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="text-gold-500 animate-spin" size={32} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-6">
        <h1 className="text-2xl font-black text-white mb-4">ORDER NOT FOUND</h1>
        <Link href="/orders">
          <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400">
            <ArrowLeft size={18} className="mr-2" /> Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const address = order.shippingAddress;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/orders" className="text-gold-500 text-sm font-medium hover:underline flex items-center gap-1 mb-6">
          <ArrowLeft size={14} /> Back to Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">{order.orderNumber}</h1>
            <p className="text-gray-400 text-sm">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase border ${statusColors[order.status] || "text-gray-400"}`}>
            {order.status}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-neutral-900 rounded-xl p-4 border border-white/5">
              {item.productImage && (
                <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-lg object-cover" />
              )}
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.productName}</h3>
                <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
              </div>
              <span className="text-gold-500 font-bold font-mono">
                £{item.priceAtPurchase.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-neutral-900 rounded-xl p-6 border border-white/5">
            <h2 className="text-white font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Total</span>
                <span className="text-gold-500 font-bold font-mono">£{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {address && (
            <div className="bg-neutral-900 rounded-xl p-6 border border-white/5">
              <h2 className="text-white font-bold mb-4">Shipping Address</h2>
              <div className="text-gray-400 text-sm space-y-1">
                <p className="text-white">{address.name}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>{address.city}, {address.postcode}</p>
                <p>{address.country}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
