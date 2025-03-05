"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  // Get the auth context
  const context = useContext(AuthContext);

  // Early return with loading state if context is not available
  if (!context) {
    return <div className="flex justify-center items-center h-screen">Loading authentication...</div>;
  }

  const { login } = context;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(username, password);
    console.log(result);
    if (!result.success && result.error) {
      setError(result.error);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Illustration */}
      <div className="hidden md:block w-1/3 bg-gradient-to-b from-purple-200 to-orange-100 relative">
        <div className="p-6 absolute bg-white top-0 left-0">
          <div className="text-white text-2xl font-bold">Job Markets</div>
        </div>
        
        <div className="absolute bottom-4 left-4 text-sm text-white opacity-70">
          @nguyenhut
        </div>
        
        {/* You would need to add your own 3D figure here */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-64 bg-teal-300 rounded-full flex items-center justify-center">
            {/* This is a placeholder for your 3D character */}
            <div className="w-32 h-16 bg-black relative overflow-hidden rounded-lg border-4 border-purple-500">
              <div className="absolute top-0 left-0 w-8 h-8 bg-teal-400"></div>
              <div className="absolute top-0 left-8 w-8 h-8 bg-black"></div>
              <div className="absolute top-0 left-16 w-8 h-8 bg-magenta-500"></div>
              <div className="absolute top-0 left-24 w-8 h-8 bg-teal-400"></div>
              <div className="absolute top-8 left-0 w-8 h-8 bg-magenta-500"></div>
              <div className="absolute top-8 left-8 w-8 h-8 bg-teal-400"></div>
              <div className="absolute top-8 left-16 w-8 h-8 bg-black"></div>
              <div className="absolute top-8 left-24 w-8 h-8 bg-teal-400"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">Sign in to continue</h1>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-400 mb-4">
              {error}
            </div>
          )}
          
          <button 
            onClick={handleGoogleLogin}
            className="w-full mb-4 py-3 px-4 flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            <FaGoogle />
            <span>Sign in with Google</span>
          </button>
          
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <div className="px-4 text-gray-500 text-sm">or</div>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>
          
          <button 
            className="w-full mb-6 py-3 px-4 flex items-center justify-center gap-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <span>Continue with email</span>
          </button>
          
          <form onSubmit={handleLogin} className="">
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-sm text-center text-gray-600">
            By creating an account you agree with our{" "}
            <Link href="/terms" className="text-gray-900 hover:underline">
              Terms of Service
            </Link>
            {", "}
            <Link href="/privacy" className="text-gray-900 hover:underline">
              Privacy Policy
            </Link>
            , and our default{" "}
            <Link href="/notifications" className="text-gray-900 hover:underline">
              Notification Settings
            </Link>
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link href="/auth/signup" className="text-purple-600 font-medium hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}