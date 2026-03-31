"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api/admin";
import { getCategories } from "@/lib/api/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { Category } from "@/types";

const TEXTURES = [
  "bone-straight", "body-wave", "loose-wave", "deep-wave",
  "water-wave", "kinky-curly", "kinky-straight", "natural-straight",
];

const HAIR_COLORS = [
  "natural-black", "off-black", "dark-brown", "medium-brown", "light-brown",
  "honey-blonde", "platinum-blonde", "burgundy",
  "ombre-1b-27", "ombre-1b-30", "ombre-1b-99j", "piano-4-27",
];

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    categoryId: "",
    texture: "bone-straight",
    hairColor: "natural-black",
    lengths: "14,16,18,20,22",
    origin: "vietnamese",
    weight: "",
    isDoubleDrawn: false,
    density: "",
    laceType: "",
    laceSize: "",
    tags: "",
    stock: "0",
    featured: false,
  });

  useEffect(() => {
    getCategories().then((res) => setCategories(res.categories)).catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const autoSlug = (name: string) => {
    return name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct({
        name: form.name,
        slug: form.slug || autoSlug(form.name),
        description: form.description || null,
        price: parseFloat(form.price),
        categoryId: form.categoryId,
        texture: form.texture,
        hairColor: form.hairColor || null,
        lengths: form.lengths.split(",").map((l) => parseInt(l.trim())).filter(Boolean),
        origin: form.origin,
        weight: form.weight ? parseInt(form.weight) : null,
        isDoubleDrawn: form.isDoubleDrawn,
        density: form.density || null,
        laceType: form.laceType || null,
        laceSize: form.laceSize || null,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        stock: parseInt(form.stock) || 0,
        featured: form.featured,
      } as Record<string, unknown>);

      toast.success("Product created!");
      router.push("/admin/products");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/admin/products" className="text-gold-500 text-sm font-medium hover:underline flex items-center gap-1">
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div>
        <h1 className="text-2xl font-black text-white">NEW PRODUCT</h1>
        <div className="h-1 w-12 bg-gold-500 mt-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Name *</label>
            <Input name="name" value={form.name} onChange={handleChange}
              onBlur={() => !form.slug && setForm((p) => ({ ...p, slug: autoSlug(p.name) }))}
              className="bg-neutral-900 border-white/10 text-white" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Slug</label>
            <Input name="slug" value={form.slug} onChange={handleChange} className="bg-neutral-900 border-white/10 text-white" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-400 mb-1 block">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3}
            className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-gold-500 outline-none" />
        </div>

        {/* Price, Category, Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Price (£) *</label>
            <Input name="price" type="number" step="0.01" value={form.price} onChange={handleChange}
              className="bg-neutral-900 border-white/10 text-white" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Category *</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange}
              className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm" required>
              <option value="">Select...</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Stock</label>
            <Input name="stock" type="number" value={form.stock} onChange={handleChange}
              className="bg-neutral-900 border-white/10 text-white" />
          </div>
        </div>

        {/* Texture & Color */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Texture *</label>
            <select name="texture" value={form.texture} onChange={handleChange}
              className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm">
              {TEXTURES.map((t) => <option key={t} value={t}>{t.replace(/-/g, " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Hair Color</label>
            <select name="hairColor" value={form.hairColor} onChange={handleChange}
              className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm">
              <option value="">None</option>
              {HAIR_COLORS.map((c) => <option key={c} value={c}>{c.replace(/-/g, " ")}</option>)}
            </select>
          </div>
        </div>

        {/* Lengths, Origin, Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Lengths (comma-separated)</label>
            <Input name="lengths" value={form.lengths} onChange={handleChange}
              placeholder="14,16,18,20" className="bg-neutral-900 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Origin</label>
            <select name="origin" value={form.origin} onChange={handleChange}
              className="w-full bg-neutral-900 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm">
              {["vietnamese", "brazilian", "indian", "malaysian", "peruvian"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Weight (g)</label>
            <Input name="weight" type="number" value={form.weight} onChange={handleChange}
              className="bg-neutral-900 border-white/10 text-white" />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-400 mb-1 block">Tags (comma-separated)</label>
          <Input name="tags" value={form.tags} onChange={handleChange}
            placeholder="Best Seller, HD Lace, New Arrival" className="bg-neutral-900 border-white/10 text-white" />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input type="checkbox" name="isDoubleDrawn" checked={form.isDoubleDrawn} onChange={handleChange}
              className="accent-gold-500" />
            Double Drawn
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange}
              className="accent-gold-500" />
            Featured
          </label>
        </div>

        <Button type="submit" disabled={loading}
          className="w-full h-14 bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 text-base uppercase tracking-wider">
          {loading ? <><Loader2 size={18} className="mr-2 animate-spin" /> Creating...</> : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
