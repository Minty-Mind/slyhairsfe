"use client";

import { useEffect, useState } from "react";
import { getCustomers } from "@/lib/api/admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Users } from "lucide-react";

interface Customer {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: string;
  _count: { orders: number };
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = () => {
    setLoading(true);
    getCustomers({ q: search || undefined })
      .then((res) => setCustomers(res.customers))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">CUSTOMERS</h1>
        <div className="h-1 w-12 bg-gold-500 mt-1" />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); fetchCustomers(); }} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <Input placeholder="Search by name or email..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-neutral-900 border-white/10 text-white rounded-xl" />
        </div>
        <Button type="submit" variant="outline" className="border-white/10 text-white hover:bg-white/5">Search</Button>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="text-gold-500 animate-spin" size={32} />
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Users className="mx-auto mb-4 text-gray-600" size={48} />
          <p>No customers yet</p>
        </div>
      ) : (
        <div className="bg-neutral-900 rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Orders</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 font-bold text-sm">
                          {(customer.name || customer.email)[0].toUpperCase()}
                        </div>
                        <span className="text-white text-sm">{customer.name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{customer.email}</td>
                    <td className="px-6 py-4 text-white text-sm">{customer._count.orders}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(customer.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
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
