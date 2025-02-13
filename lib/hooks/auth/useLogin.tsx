import { useState } from "react";
import axios from "axios";

interface LoginResponse {
  userId: string;
}

interface UseLoginResult {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ensure your backend URL is set in the environment variables

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { userId } = response.data;

      // Store userId in localStorage
      localStorage.setItem("userId", userId);

    } catch (err) {
      console.error("Login error:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.error || "Login failed"
          : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
