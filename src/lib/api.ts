import axios from "axios";
import { useAuthStore } from "@/store/auth";

const baseURL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

const AUTH_PATHS = ["/auth/login", "/auth/refresh", "/auth/registro"];

function esRutaDeAuth(url?: string): boolean {
  if (!url) return false;
  return AUTH_PATHS.some((path) => url.includes(path));
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (esRutaDeAuth(original?.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = useAuthStore.getState().refreshToken;

      if (!refresh) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${baseURL}/auth/refresh/`, {
          refresh,
        });

        useAuthStore.getState().setTokens(data.access, refresh);

        original.headers.Authorization = `Bearer ${data.access}`;

        return api(original);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;