import { apiClient } from "./client";
import type { User } from "@/types";

export async function getProfile(): Promise<{ user: User }> {
  return apiClient<{ user: User }>("/api/users/me");
}

export async function updateProfile(data: { name?: string; image?: string }): Promise<{ user: User }> {
  return apiClient<{ user: User }>("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
  return apiClient<{ message: string }>("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
