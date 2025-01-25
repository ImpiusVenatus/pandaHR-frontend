import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  fullName: string;
  email: string;
  // Add other user fields here
}

export const useGetUserData = (userId: string | null) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the `userId` from localStorage
      //   const userId = localStorage.getItem("userId");

      //   if (!userId) {
      //     setError("User ID is not found in localStorage");
      //     setLoading(false);
      //     return;
      //   }

      try {
        setLoading(true);
        const { data } = await axios.get<User>(`${API_URL}/user/${userId}`);
        setUserData(data);
        console.log(data);
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
