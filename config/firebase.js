import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  signOut,
} from "firebase/auth";

// Firebase configuration directly in the code
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Conditionally initialize Firebase Analytics only on the client-side
let analytics = null;
if (typeof window !== "undefined" && isSupported()) {
  analytics = getAnalytics(app);
}

export {
  app,
  auth,
  analytics,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  signOut,
};
