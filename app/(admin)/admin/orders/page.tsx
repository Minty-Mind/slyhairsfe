"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminOrders, updateOrderStatus } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Eye } from "lucide-react";
import type { Order } from "@/types";
import { toast } from "sonner";

const STATUSES = ["", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusColors: Record<string, string> = {
  PENDING: "text-yellow-400",
  PAID: "text-green-400",
  SHIPPED: "text-blue-400",
  DELIVERED: "text-emerald-400",
  CANCELLED: "text-red-400",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchOrders = () => {
    setLoading(true);
    getAdminOrders({ q: search || undefined, status: statusFilter || undefined })
      .then((res) => setOrders(res.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">ORDERS</h1>
        <div className="h-1 w-12 bg-gold-500 mt-1" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={(e) => { e.preventDefault(); fetchOrders(); }} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <Input placeholder="Search by order number or email..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-neutral-900 border-white/10 text-white rounded-xl" />
          </div>
          <Button type="submit" variant="outline" className="border-white/10 text-white hover:bg-white/5">Search</Button>
        </form>

        <div className="flex gap-2">
          {STATUSES.map((s) => (
            <Button
              key={s || "all"}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className={statusFilter === s
                ? "bg-gold-500 text-black hover:bg-gold-400"
                : "border-white/10 text-gray-400 hover:bg-white/5"
              }
            >
              {s || "All"}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="text-gold-500 animate-spin" size={32} />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No orders found</div>
      ) : (
        <div className="bg-neutral-900 rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Total</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-white text-sm font-mono">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{order.user?.email || order.email}</td>
                    <td className="px-6 py-4 text-gold-500 font-mono text-sm">£{order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`bg-transparent border border-white/10 rounded-lg px-2 py-1 text-xs font-bold uppercase ${statusColors[order.status] || "text-gray-400"}`}
                      >
                        {STATUSES.filter(Boolean).map((s) => (
                          <option key={s} value={s} className="bg-neutral-900 text-white">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gold-500">
                          <Eye size={16} />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
