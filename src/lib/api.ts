import { auth } from "./firebase";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getHeaders(authenticated: boolean = false) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authenticated) {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

export const api = {
  async get<T>(path: string, authenticated: boolean = false): Promise<T> {
    const headers = await getHeaders(authenticated);
    const response = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || response.statusText);
    }

    return response.json();
  },

  async post<T>(path: string, data: any, authenticated: boolean = false): Promise<T> {
    const headers = await getHeaders(authenticated);
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || response.statusText);
    }

    return response.json();
  },

  async put<T>(path: string, data: any, authenticated: boolean = false): Promise<T> {
    const headers = await getHeaders(authenticated);
    const response = await fetch(`${API_URL}${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || response.statusText);
    }

    return response.json();
  },

  async delete<T>(path: string, authenticated: boolean = false): Promise<T> {
    const headers = await getHeaders(authenticated);
    const response = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || response.statusText);
    }

    return response.json();
  },
};
