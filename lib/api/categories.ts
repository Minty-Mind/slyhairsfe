import { apiClient } from "./client";
import type { Category } from "@/types";

export async function getCategories(): Promise<{ categories: Category[] }> {
  return apiClient<{ categories: Category[] }>("/api/categories");
}
