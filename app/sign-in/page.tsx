"use client";
import { useState } from "react";
import { auth, firebaseAuth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Navbar from "../_components/Navbar";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
      router.push("/Dashboard");
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await firebaseAuth.signInWithPopup(auth, googleProvider);
      router.push("/Dashboard");
    } catch (err) {
      setError("Google sign-in failed.");
    }
  };

  return (
    <section className="bg-[#3d52a0] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
          <form onSubmit={handleSignIn} className="text-black space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Sign In
            </button>
          </form>
          <div className="flex items-center justify-center my-4">
            <span className="w-full border-t"></span>
            <span className="px-2 text-gray-500">OR</span>
            <span className="w-full border-t"></span>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.76 12.27c0-.76-.07-1.48-.2-2.17H12v4.11h6.6a5.65 5.65 0 0 1-2.45 3.7v3.07h3.96c2.32-2.14 3.65-5.3 3.65-8.71z" />
              <path d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.95-3.08c-1.1.74-2.5 1.18-4 1.18-3.08 0-5.67-2.08-6.6-4.9H1.36v3.07A11.99 11.99 0 0 0 12 24z" />
              <path d="M5.4 14.28a7.2 7.2 0 0 1 0-4.56V6.65H1.36a12.01 12.01 0 0 0 0 10.7l4.04-3.07z" />
              <path d="M12 4.8c1.76 0 3.33.6 4.57 1.8l3.43-3.43C17.95 1.04 15.24 0 12 0A12 12 0 0 0 1.36 6.64L5.4 9.7c.93-2.82 3.52-4.9 6.6-4.9z" />
            </svg>
            Sign In with Google
          </button>
        </div>
      </div>
    </section>
  );
}
