import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://slyhairs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/shipping-info",
    "/returns-policy",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const res = await fetch(`${API_BASE}/api/products?limit=50`, { next: { revalidate: 3600 } });
    const data = await res.json();
    productPages = data.products.map((p: { slug: string; updatedAt: string }) => ({
      url: `${BASE_URL}/shop/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));
  } catch {
    // Silently fail — sitemap still works with static pages
  }

  return [...staticPages, ...productPages];
}
