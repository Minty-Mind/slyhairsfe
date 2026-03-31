import { apiClient } from "./client";

export async function registerUser(data: { email: string; password: string; name?: string }) {
  return apiClient<{ user: { id: string; email: string; name: string | null; role: string } }>(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}
