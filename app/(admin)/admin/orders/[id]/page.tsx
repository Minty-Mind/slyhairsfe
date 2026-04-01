"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getAdminOrder, updateOrderStatus } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Package, MapPin, CreditCard, User, Clock } from "lucide-react";
import type { Order } from "@/types";
import { toast } from "sonner";
import { getProductImageUrl } from "@/lib/image";

const ORDER_STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  PENDING: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  PAID: { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  SHIPPED: { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  DELIVERED: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  CANCELLED: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
};

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getAdminOrder(id)
      .then((res) => setOrder(res.order))
      .catch(() => toast.error("Failed to load order"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order || order.status === newStatus) return;
    setUpdating(true);
    try {
      const res = await updateOrderStatus(order.id, newStatus);
      setOrder(res.order);
      toast.success(`Order status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="text-gold-500 animate-spin" size={32} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-24">
        <h2 className="text-white text-xl font-bold mb-4">Order not found</h2>
        <Link href="/admin/orders">
          <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400">
            <ArrowLeft size={16} className="mr-2" /> Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const status = statusConfig[order.status] || statusConfig.PENDING;
  const address = order.shippingAddress;

  return (
    <div className="max-w-4xl space-y-6">
      <Link href="/admin/orders" className="text-gold-500 text-sm font-medium hover:underline flex items-center gap-1">
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">{order.orderNumber}</h1>
          <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
            <Clock size={14} />
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
            })}
          </p>
          <div className="h-1 w-12 bg-gold-500 mt-2" />
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase border ${status.bg} ${status.color} ${status.border}`}>
          {order.status}
        </span>
      </div>

      {/* Status Update */}
      <div className="bg-neutral-900 rounded-xl border border-white/5 p-5">
        <h3 className="text-white font-bold text-sm mb-4">Update Status</h3>
        <div className="flex flex-wrap gap-2">
          {ORDER_STATUSES.map((s) => {
            const cfg = statusConfig[s];
            const isActive = order.status === s;
            return (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={updating || isActive}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all disabled:opacity-50 ${
                  isActive
                    ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                    : "border-white/10 text-gray-500 hover:text-white hover:border-white/20"
                }`}
              >
                {s}
              </button>
            );
          })}
          {updating && <Loader2 size={16} className="text-gold-500 animate-spin self-center ml-2" />}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items — takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-neutral-900 rounded-xl border border-white/5 p-5">
            <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <Package size={16} className="text-gold-500" />
              Items ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-black/30 rounded-xl">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
                    {item.productImage ? (
                      <img src={getProductImageUrl(item.productImage) || ""} alt={item.productName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={20} className="text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{item.productName}</h4>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gold-500 font-bold font-mono text-sm">&pound;{item.priceAtPurchase.toFixed(2)}</p>
                    {item.quantity > 1 && (
                      <p className="text-gray-600 text-xs font-mono">
                        &pound;{(item.priceAtPurchase * item.quantity).toFixed(2)} total
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-gray-400 text-sm font-bold uppercase">Order Total</span>
              <span className="text-gold-500 font-black text-xl font-mono">&pound;{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-neutral-900 rounded-xl border border-white/5 p-5">
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <User size={16} className="text-gold-500" />
              Customer
            </h3>
            <div className="space-y-2 text-sm">
              {order.user?.name && <p className="text-white font-medium">{order.user.name}</p>}
              <p className="text-gray-400">{order.user?.email || order.email}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-neutral-900 rounded-xl border border-white/5 p-5">
            <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <CreditCard size={16} className="text-gold-500" />
              Payment
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="text-white">Stripe</span>
              </div>
              {order.stripePaymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment ID</span>
                  <span className="text-gray-400 font-mono text-xs truncate max-w-[140px]">{order.stripePaymentId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="text-gold-500 font-bold font-mono">&pound;{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {address && (
            <div className="bg-neutral-900 rounded-xl border border-white/5 p-5">
              <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-gold-500" />
                Shipping Address
              </h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p className="text-white font-medium">{address.name}</p>
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
