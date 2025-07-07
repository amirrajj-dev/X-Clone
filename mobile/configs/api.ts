import { useAuth } from "@clerk/clerk-expo";
import axios, { AxiosInstance } from "axios";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://x-clone-ivory-iota.vercel.app/api";

export const creatApiClient = (
  getToken: () => Promise<string | null>
): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token?.trim().length) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return creatApiClient(getToken);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
  updateUserProfile: (api: AxiosInstance, data: any) =>
    api.post("/users/profile", data),
};
