"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPasswordsMatch(password.trim() === confirmPassword.trim());
  }, [password, confirmPassword]);

  const passwordValidations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@#$%^&*()_+!~]/.test(password),
  };

  const allValid = Object.values(passwordValidations).every(Boolean);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!allValid) {
      toast.error("Password does not meet all requirements!");
      return;
    }
    console.log({ username, email, password });
    const frontendUrl = "http://localhost:3000/auth"
    try {
      const res = await fetch("https://michaelmwanza.site/api/auth/register/", {
        method: "POST",
        headers: {
          // "accept":" application/json",
          // "X-CSRFTOKEN": "UfCbGZFVZWpt34DHVlHIbrmJ6iv2tJFDha9puReljkJA6IcOp5wTnkDyigCFkp0g",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password , frontendUrl}),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful! Please check your email to activate your account.");
        router.push("/");
      } else {
        Object.keys(data).forEach((key) => {
          if (Array.isArray(data[key])) {
            data[key].forEach((msg) => toast.error(msg));
          }
        });
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/3 bg-gradient-to-b from-purple-200 to-orange-100"></div>
      <div className="w-full md:w-2/3 flex items-center bg-white justify-center px-4">
        <div className="w-full max-w-md p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
          <form onSubmit={handleSignup}>
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
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
            <div className="mb-4 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-gray-700">Password must contain:</p>
            <ul className="list-disc pl-5 py-4">
              <li className={passwordValidations.length ? "text-green-600" : "text-red-600"}>At least 8 characters</li>
              <li className={passwordValidations.uppercase ? "text-green-600" : "text-red-600"}>At least 1 uppercase letter</li>
              <li className={passwordValidations.lowercase ? "text-green-600" : "text-red-600"}>At least 1 lowercase letter</li>
              <li className={passwordValidations.number ? "text-green-600" : "text-red-600"}>At least 1 number</li>
              <li className={passwordValidations.specialChar ? "text-green-600" : "text-red-600"}>At least 1 special character (@#$%^&*)</li>
            </ul>
            <button
                disabled={!allValid || !passwordsMatch}
                className={`w-full py-3 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors ${
                  !allValid || !passwordsMatch ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
>
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account?</span>{" "}
            <Link href="/auth/login" className="text-purple-600 font-medium hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
