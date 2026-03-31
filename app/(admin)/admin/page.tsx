"use client";

import { useEffect, useState } from "react";
import { getAdminStats, getInsights } from "@/lib/api/admin";
import { Package, ShoppingCart, Users, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockProducts: number;
  currentRevenue: number;
  revenueChange: number;
  topProducts: { name: string; sold: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [insights, setInsights] = useState<{ summary: string; alerts: string[]; actions: string[] } | null>(null);

  useEffect(() => {
    getAdminStats().then(setStats).catch(() => {});
    getInsights().then(setInsights).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">DASHBOARD</h1>
        <div className="h-1 w-16 bg-gold-500 mt-2" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Products" value={stats?.totalProducts ?? "-"} />
        <StatCard icon={ShoppingCart} label="Total Orders" value={stats?.totalOrders ?? "-"} />
        <StatCard icon={Users} label="Customers" value={stats?.totalCustomers ?? "-"} />
        <StatCard
          icon={AlertTriangle}
          label="Low Stock"
          value={stats?.lowStockProducts ?? "-"}
          alert={!!stats && stats.lowStockProducts > 0}
        />
      </div>

      {/* Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-neutral-900 rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="text-gold-500" size={20} />
            <h2 className="text-white font-bold">Revenue (7 days)</h2>
          </div>
          <p className="text-3xl font-black text-gold-500 font-mono">
            £{(stats?.currentRevenue ?? 0).toFixed(2)}
          </p>
          {stats && stats.revenueChange !== 0 && (
            <p className={`text-sm mt-1 flex items-center gap-1 ${stats.revenueChange > 0 ? "text-green-400" : "text-red-400"}`}>
              <TrendingUp size={14} />
              {stats.revenueChange > 0 ? "+" : ""}{stats.revenueChange}% vs previous week
            </p>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-neutral-900 rounded-xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {stats?.topProducts?.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 font-mono w-4">{i + 1}.</span>
                  <span className="text-gray-300 text-sm">{p.name}</span>
                </div>
                <span className="text-gold-500 text-sm font-bold">{p.sold} sold</span>
              </div>
            )) || <p className="text-gray-500 text-sm">No sales data yet</p>}
          </div>
        </div>
      </div>

      {/* Insights */}
      {insights && (
        <div className="bg-neutral-900 rounded-xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4">Insights</h2>
          <p className="text-gray-300 text-sm mb-4">{insights.summary}</p>
          {insights.alerts.length > 0 && (
            <div className="space-y-2 mb-4">
              {insights.alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-orange-400">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  {alert}
                </div>
              ))}
            </div>
          )}
          {insights.actions.length > 0 && (
            <div className="space-y-2">
              {insights.actions.map((action, i) => (
                <div key={i} className="text-sm text-gray-400">
                  &bull; {action}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  alert,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  alert?: boolean;
}) {
  return (
    <div className={cn("bg-neutral-900 rounded-xl p-6 border", alert ? "border-orange-500/30" : "border-white/5")}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className={alert ? "text-orange-500" : "text-gold-500"} size={20} />
        <span className="text-gray-400 text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
