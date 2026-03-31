import { apiClient } from "./client";
import type { Product } from "@/types";

export interface ProductFilters {
  q?: string;
  category?: string;
  texture?: string;
  hairColor?: string;
  length?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  inStock?: boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== 0 && value !== false) {
      params.set(key, String(value));
    }
  });
  const query = params.toString();
  return apiClient<ProductsResponse>(`/api/products${query ? `?${query}` : ""}`);
}

export async function getProduct(slug: string): Promise<{ product: Product }> {
  return apiClient<{ product: Product }>(`/api/products/${slug}`);
}
