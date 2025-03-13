"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function ActivatePrompt() {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleResend = async () => {
    setIsResending(true);
    setMessage("");
    setError("");

  
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Illustration */}
      <div className="hidden md:block w-1/3 bg-gradient-to-b from-purple-200 to-orange-100 relative">
        <div className="text-gray-900 p-6 text-2xl font-bold">
          <Link href={`/`}>Job Markets</Link>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-2/3 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-6 text-center">
          <h1 className="text-3xl font-bold mb-6">Activate Your Account</h1>
          <p className="text-gray-600 mb-4">We have sent an activation email to your inbox. Please check your email and click the link to activate your account.</p>
          
          {message && <div className="bg-green-100 text-green-700 p-3 rounded-md border border-green-400 mb-4">{message}</div>}
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-400 mb-4">{error}</div>}
          
          <button 
            onClick={handleResend} 
            disabled={isResending}
            className={`w-full py-3 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors ${isResending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isResending ? "Resending..." : "Resend Activation Email"}
          </button>

          <div className="mt-6 text-center text-gray-600">
            Wrong email? <Link href="/auth/signup" className="text-purple-600 font-medium hover:underline">Sign up again</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
