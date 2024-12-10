"use client"
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from '../_components/Navbar'

const firebaseConfig = {
    apiKey: "AIzaSyDO3KLrVhxX2GQmvPNOsLzbSZMZcvW256U",
    authDomain: "taskexx.firebaseapp.com",
    projectId: "taskexx",
    storageBucket: "taskexx.firebasestorage.app",
    messagingSenderId: "1008467803484",
    appId: "1:1008467803484:web:1e46f1efbc0477e5569599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Sign-in successful! Welcome back.");
    } catch (error: any) {
      setMessage(error.message || "Failed to sign in.");
    }
  };

  return (
    <div>
      <Navbar/>
    <div
      className="flex min-h-screen items-center justify-center bg-[#3d52a0]"
      >
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
          >
          Sign In
        </button>
      </form>
    </div>
          </div>
  );
};

export default SignIn;
