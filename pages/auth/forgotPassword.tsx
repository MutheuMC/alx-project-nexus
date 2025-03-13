"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetRequest = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`https://michaelmwanza.site/api/password_reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setLoading(false);
      setEmail("");

      if (res.ok) {
        toast.success("A password reset link has been sent to your email.");
        router.push("/");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send reset email. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen ">
      {/* Left Side - Illustration */}
      <div className="hidden md:block w-1/3 bg-gradient-to-b from-purple-200 to-orange-100 relative">
        <div className="text-gray-900 p-6 text-2xl font-bold">
          <Link href={`/`}>Job Markets</Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-6">
          <ToastContainer position="top-center" autoClose={6000} />
          <h1 className="text-3xl font-bold mb-8 text-center">Forgot Password</h1>
          <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleResetRequest} className="">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-purple-600 font-medium hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
