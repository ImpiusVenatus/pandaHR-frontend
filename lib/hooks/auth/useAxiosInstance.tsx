// frontend/hooks/useAxiosInstance.ts

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthContext } from "../../contexts/auth/AuthContext";

export const useAxiosInstance = () => {
  const authContext = useAuthContext();

  if (!authContext) {
    throw new Error("useAxiosInstance must be used within an AuthProvider");
  }

  const { token } = authContext;

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your backend URL
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  const authRequest = async <T = unknown,>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    return axiosInstance.request<T>(config);
  };

  return { authRequest };
};
