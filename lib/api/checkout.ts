import { apiClient } from "./client";

interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export async function createCheckoutSession(items: CheckoutItem[]): Promise<{ url: string }> {
  return apiClient<{ url: string }>("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}

export async function getCheckoutSession(sessionId: string) {
  return apiClient<{ session: Record<string, unknown> }>(`/api/checkout/session/${sessionId}`);
}

export async function validateCartStock(productIds: string[]) {
  return apiClient<{ stockMap: Record<string, { stock: number; name: string; price: number }> }>(
    "/api/cart/validate",
    {
      method: "POST",
      body: JSON.stringify({ productIds }),
    }
  );
}
