"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import { deleteProduct } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2, Edit, Loader2 } from "lucide-react";
import type { Product } from "@/types";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = () => {
    setLoading(true);
    getProducts({ q: search || undefined, limit: 50 })
      .then((res) => setProducts(res.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">PRODUCTS</h1>
          <div className="h-1 w-12 bg-gold-500 mt-1" />
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400">
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-neutral-900 border-white/10 text-white rounded-xl"
          />
        </div>
        <Button type="submit" variant="outline" className="border-white/10 text-white hover:bg-white/5">
          Search
        </Button>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="text-gold-500 animate-spin" size={32} />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No products found</div>
      ) : (
        <div className="bg-neutral-900 rounded-xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => {
                  const imgUrl = product.images?.[0]?.url;
                  const fullImgUrl = imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${API_BASE}${imgUrl}`) : null;

                  return (
                    <tr key={product.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {fullImgUrl && (
                            <img src={fullImgUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          )}
                          <div>
                            <p className="text-white font-medium text-sm">{product.name}</p>
                            <p className="text-gray-500 text-xs">{product.texture?.replace(/-/g, " ")}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{product.category?.title}</td>
                      <td className="px-6 py-4 text-gold-500 font-mono text-sm">£{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${
                            product.stock <= 0
                              ? "text-red-400"
                              : product.stock <= 5
                              ? "text-orange-400"
                              : "text-green-400"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gold-500">
                              <Edit size={16} />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-400"
                            onClick={() => handleDelete(product.id, product.name)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
