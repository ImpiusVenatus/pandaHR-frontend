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

  const signup = async ({ fullName, companyName, email, password }) => {
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
        url: `${window.location.origin}/signup/create-account`,
      });

      // Send request to the backend to create the user in MongoDB
      await axios.post(`${API_URL}/auth/signup`, {
        fullName,
        companyName,
        email,
        password,
        firebaseUid,
      });

      setShowVerificationMessage(true);
      setLoading(false);
    } catch (err) {
      console.error("Signup Error: ", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return { signup, loading, error, showVerificationMessage };
};

export default useSignup;
