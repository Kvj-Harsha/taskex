"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct router hook for use client
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../_components/Navbar";

// Firebase configuration using environment variables for security
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  // Map Firebase errors to user-friendly messages
  const mapFirebaseError = (code: string): string => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/user-disabled":
        return "Your account has been disabled.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  // Email validation
  const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    // Input validation
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const nextPath = (router.query.next as string) || "/dashboard"; // Redirect to the intended path or default dashboard
      router.push(nextPath);
    } catch (error: any) {
      setMessage(mapFirebaseError(error.code || "auth/unknown"));
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-[#3d52a0]">
        <form
          onSubmit={handleSignIn}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        >
          <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
            Sign In
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full px-4 py-2 rounded-lg border border-[#ede8f5] focus:outline-none focus:ring focus:ring-[#ede8f5]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-4 py-2 rounded-lg border border-[#ede8f5] focus:outline-none focus:ring focus:ring-[#ede8f5]"
              placeholder="Enter your password"
              required
            />
          </div>
          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes("successful") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#3d52a0] text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          <div className="text-center mt-4">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
