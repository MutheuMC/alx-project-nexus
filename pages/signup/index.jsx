"use client";

import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/signup/signup.module.css";
import { getApiUrl, CSRF_TOKEN } from '@/config';
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
  

 
  // Password Validation
  const passwordValidations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@#$%^&*()_+!~]/.test(password),
  };

  const allValid = Object.values(passwordValidations).every(Boolean);

    useEffect(() => {
      setPasswordsMatch(password.trim() === confirmPassword.trim());
    }, [password, confirmPassword]);



    const handleSignup = async (e) => {
      e.preventDefault();
    
      if (!allValid) {
        toast.error("Password does not meet all requirements!");
        return;
      }
    
      console.log({ username, email, password });
    
      try {
        const res = await fetch(`https://139.84.227.102/api/auth/register/`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFTOKEN": CSRF_TOKEN,
          },
          body: JSON.stringify({ username, email, password }),
        });
    
        const data = await res.json();
    
        if (res.ok) {
          toast.success("Signup successful!");
          router.push("/login");
        } else {
          console.log(data);
          
          // Loop through all errors dynamically
          Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
              data[key].forEach((msg) => toast.error(msg));
            }
          });
    
          // If no specific error message, show default
          if (!Object.keys(data).length) {
            toast.error("Signup failed! Try again.");
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong! Try again later.");
      }
    };
    

  return (
    <div className={styles.container}>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>

      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSignup} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className={styles.input} />
        </div>


        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
        </div>

  


 

        <div className={`${styles.inputGroup} ${styles.passwordContainer}`}>
          <label className={styles.label}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className={`${styles.inputGroup} ${styles.passwordContainer}`}>
          <label className={styles.label}>Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`${styles.input} ${passwordsMatch ? "border-green-500" : "border-red-500"}`}
          />
          <span className={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {!passwordsMatch && confirmPassword.length > 0 && (
            <p className="text-red-500 text-sm">Passwords do not match!</p>
          )}
        </div>

        <p className="text-gray-700">Password must contain:</p>
        <ul className="list-disc pl-5">
          <li className={passwordValidations.length ? "text-green-600" : "text-red-600"}>At least 8 characters</li>
          <li className={passwordValidations.uppercase ? "text-green-600" : "text-red-600"}>At least 1 uppercase letter</li>
          <li className={passwordValidations.lowercase ? "text-green-600" : "text-red-600"}>At least 1 lowercase letter</li>
          <li className={passwordValidations.number ? "text-green-600" : "text-red-600"}>At least 1 number</li>
          <li className={passwordValidations.specialChar ? "text-green-600" : "text-red-600"}>At least 1 special character (@#$%^&*)</li>
        </ul>

        <button type="submit" disabled={!allValid || !passwordsMatch} className={`${styles.button} ${!allValid || !passwordsMatch ? "opacity-50 cursor-not-allowed" : ""}`}>
          Sign Up
        </button>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
