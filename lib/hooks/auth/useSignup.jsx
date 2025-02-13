import { useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../config/firebase";

const useSignup = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const signup = async ({ fullName, role, companyName, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUid = userCredential.user.uid;

      // Send email verification
      const user = userCredential.user;
      await sendEmailVerification(user, {
        url: `${window.location.origin}`,
      });

      const response = await axios.post(`${API_URL}/auth/signup`, {
        fullName,
        role,
        companyName,
        email,
        password,
        firebaseUid,
      });

      // Assuming the backend sends back a `userId` in the response
      const { userId } = response.data;

      console.log("User created successfully with ID:", userId);

      // Store the `userId` in localStorage
      localStorage.setItem("userId", userId);

      setShowVerificationMessage(true);
      setLoading(false);

      return { success: true, userId }; // Return success response
    } catch (err) {
      console.error("Signup Error: ", err);
      setError(err.message);
      setLoading(false);
      return null; // Return null in case of error
    }
  };

  return { signup, loading, error, showVerificationMessage };
};

export default useSignup;
