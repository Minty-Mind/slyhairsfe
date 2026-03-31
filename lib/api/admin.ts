import { apiClient } from "./client";
import type { Product, Order, User } from "@/types";

// Stats
export async function getAdminStats() {
  return apiClient<{
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    lowStockProducts: number;
    currentRevenue: number;
    revenueChange: number;
    recentOrderCount: number;
    ordersByStatus: { status: string; count: number }[];
    topProducts: { name: string; sold: number }[];
  }>("/api/admin/stats");
}

// Orders
export async function getAdminOrders(params?: { status?: string; q?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.q) query.set("q", params.q);
  if (params?.page) query.set("page", String(params.page));
  const qs = query.toString();
  return apiClient<{ orders: Order[]; total: number; page: number; totalPages: number }>(
    `/api/admin/orders${qs ? `?${qs}` : ""}`
  );
}

export async function getAdminOrder(id: string) {
  return apiClient<{ order: Order }>(`/api/admin/orders/${id}`);
}

export async function updateOrderStatus(id: string, status: string) {
  return apiClient<{ order: Order }>(`/api/admin/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// Products
export async function createProduct(data: Partial<Product>) {
  return apiClient<{ product: Product }>("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string, data: Partial<Product>) {
  return apiClient<{ product: Product }>(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string) {
  return apiClient<{ message: string }>(`/api/products/${id}`, {
    method: "DELETE",
  });
}

// Customers
export async function getCustomers(params?: { q?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params?.q) query.set("q", params.q);
  if (params?.page) query.set("page", String(params.page));
  const qs = query.toString();
  return apiClient<{ customers: (User & { _count: { orders: number } })[]; total: number }>(
    `/api/admin/customers${qs ? `?${qs}` : ""}`
  );
}

// Upload
export async function uploadImage(file: File, productId?: string) {
  const formData = new FormData();
  formData.append("file", file);
  if (productId) formData.append("productId", productId);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json() as Promise<{ url: string; filename: string }>;
}

// Insights
export async function getInsights() {
  return apiClient<{ summary: string; alerts: string[]; actions: string[] }>("/api/admin/insights");
}
