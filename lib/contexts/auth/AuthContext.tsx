"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  // googleProvider,
  // signInWithPopup,
  signOut as firebaseSignOut,
} from "../../../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  refreshToken: () => Promise<void>;
  // signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
} | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshToken = async () => {
    if (currentUser) {
      const token = await currentUser.getIdToken(true);
      setToken(token);
    }
  };

  // const signInWithGoogle = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;
  //     const token = await user.getIdToken();
  //     setCurrentUser(user);
  //     setToken(token);
  //     router.push("/"); // Redirect to homepage or desired route
  //   } catch (error) {
  //     console.error("Google Sign-In Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      setToken(null);
      router.push("/auth/signin"); // Redirect to sign-in page
    } catch (error) {
      console.error("Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    token,
    loading,
    refreshToken,
    // signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
