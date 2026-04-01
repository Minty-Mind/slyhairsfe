"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateProduct, uploadImage } from "@/lib/api/admin";
import { getProduct } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Upload, X, ImagePlus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { Category, Product } from "@/types";
import { getProductImageUrl } from "@/lib/image";

const TEXTURES = [
  "bone-straight", "body-wave", "loose-wave", "deep-wave",
  "water-wave", "kinky-curly", "kinky-straight", "natural-straight",
];

const HAIR_COLORS = [
  "natural-black", "off-black", "dark-brown", "medium-brown", "light-brown",
  "honey-blonde", "platinum-blonde", "burgundy",
  "ombre-1b-27", "ombre-1b-30", "ombre-1b-99j", "piano-4-27",
];

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    categoryId: "",
    texture: "bone-straight",
    hairColor: "",
    lengths: "",
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
    Promise.all([
      getProduct(id).then((res) => res.product),
      getCategories().then((res) => res.categories),
    ])
      .then(([prod, cats]) => {
        setProduct(prod);
        setCategories(cats);
        setForm({
          name: prod.name,
          slug: prod.slug,
          description: prod.description || "",
          price: String(prod.price),
          categoryId: prod.categoryId,
          texture: prod.texture,
          hairColor: prod.hairColor || "",
          lengths: prod.lengths.join(", "),
          origin: prod.origin,
          weight: prod.weight ? String(prod.weight) : "",
          isDoubleDrawn: prod.isDoubleDrawn,
          density: prod.density || "",
          laceType: prod.laceType || "",
          laceSize: prod.laceSize || "",
          tags: prod.tags.join(", "),
          stock: String(prod.stock),
          featured: prod.featured,
        });
      })
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadImage(file, id);
      setProduct((prev) =>
        prev ? { ...prev, images: [...prev.images, { id: Date.now().toString(), url: result.url, alt: null, position: prev.images.length }] } : prev
      );
      toast.success("Image uploaded!");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProduct(id, {
        name: form.name,
        slug: form.slug,
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

      toast.success("Product updated!");
      router.push("/admin/products");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="text-gold-500 animate-spin" size={32} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h2 className="text-white text-xl font-bold mb-4">Product not found</h2>
        <Link href="/admin/products">
          <Button className="bg-gold-500 text-black font-bold hover:bg-gold-400">
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/admin/products" className="text-gold-500 text-sm font-medium hover:underline flex items-center gap-1">
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div>
        <h1 className="text-2xl font-black text-white">EDIT PRODUCT</h1>
        <p className="text-gray-500 text-sm mt-1">{product.name}</p>
        <div className="h-1 w-12 bg-gold-500 mt-1" />
      </div>

      {/* Image Gallery */}
      <div className="bg-neutral-900 rounded-xl border border-white/5 p-5">
        <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          <ImagePlus size={16} className="text-gold-500" />
          Product Images
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.images.map((img) => (
            <div key={img.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 group">
              <img
                src={getProductImageUrl(img.url) || ""}
                alt={img.alt || product.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <label className="w-24 h-24 rounded-lg border-2 border-dashed border-white/10 hover:border-gold-500/50 flex flex-col items-center justify-center cursor-pointer transition-colors">
            {uploading ? (
              <Loader2 size={20} className="text-gold-500 animate-spin" />
            ) : (
              <>
                <Upload size={18} className="text-gray-500 mb-1" />
                <span className="text-gray-500 text-[10px]">Upload</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Name *</label>
            <Input name="name" value={form.name} onChange={handleChange}
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
            <label className="text-sm font-medium text-gray-400 mb-1 block">Price (&pound;) *</label>
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

        {/* Lace fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Density</label>
            <Input name="density" value={form.density} onChange={handleChange}
              placeholder="e.g. 150%" className="bg-neutral-900 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Lace Type</label>
            <Input name="laceType" value={form.laceType} onChange={handleChange}
              placeholder="e.g. HD Lace" className="bg-neutral-900 border-white/10 text-white" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">Lace Size</label>
            <Input name="laceSize" value={form.laceSize} onChange={handleChange}
              placeholder="e.g. 13x4" className="bg-neutral-900 border-white/10 text-white" />
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

        <Button type="submit" disabled={saving}
          className="w-full h-14 bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 text-base uppercase tracking-wider">
          {saving ? <><Loader2 size={18} className="mr-2 animate-spin" /> Saving...</> : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
