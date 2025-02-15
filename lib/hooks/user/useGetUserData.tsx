import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  fullName: string;
  role: string;
  email: string;
  employmentStatus: string;
  company: string;
}
interface Auth {
  id: string;
  fullName: string;
  role: string;
  email: string;
  employmentStatus: string;
  company: string;
  isVerified: boolean;
}

export const useGetUserData = (userId: string | null) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<User>(`${API_URL}/user/${userId}`);
        setUserData(data);
      } catch (err: unknown) {
        console.error("Error fetching user data:", err);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || err.message || "An error occurred"
          );
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [API_URL, userId]);

  return { userData, loading, error };
};
export const useGetAuthData = (userId: string | null) => {
  const [authData, setAuthData] = useState<Auth | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!userId) {
      setAuthLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setAuthLoading(true);
        const { data } = await axios.get<Auth>(
          `${API_URL}/user/auth/${userId}`
        );
        setAuthData(data);
        console.log(data);
      } catch (err: unknown) {
        console.error("Error fetching user data:", err);
        if (axios.isAxiosError(err)) {
          setAuthError(
            err.response?.data?.message || err.message || "An error occurred"
          );
        } else {
          setAuthError("Unknown error occurred");
        }
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUserData();
  }, [API_URL, userId]);

  return { authData, authLoading, authError };
};
