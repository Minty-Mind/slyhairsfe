import { apiClient } from "./client";
import type { Order } from "@/types";

export async function getOrders(): Promise<{ orders: Order[] }> {
  return apiClient<{ orders: Order[] }>("/api/orders");
}

export async function getOrder(id: string): Promise<{ order: Order }> {
  return apiClient<{ order: Order }>(`/api/orders/${id}`);
}
