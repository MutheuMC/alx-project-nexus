"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Get the auth context
  const context = useContext(AuthContext);

  // Early return with loading state if context is not available
  if (!context) {
    return <div className="flex justify-center items-center h-screen">Loading authentication...</div>;
  }

  const { login } = context;

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");
  
    try {
      const result = await login(username, password);
      console.log(result);
  
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoggingIn(false); 
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
    
          <div className="text-gray-900 p-6 text-2xl font-bold">
            <Link href={`/`}>
            Job Markets
            </Link>
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
            <div className="mb-4 text-right">
              <Link href="/auth/forgotPassword" className="text-purple-600 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors ${
                isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? "Signing In..." : "Sign In"}
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