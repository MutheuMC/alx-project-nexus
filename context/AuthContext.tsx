"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {CSRF_TOKEN} from '@/config'
import axios from "axios";

// Define your interfaces
export interface User {
  // Add user properties here
  username: string;
  // other properties...
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with an initial undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize with null, then load from localStorage in useEffect
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  // Use useEffect to load from localStorage after component mounts (client-side only)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log("Login Request:", { username, password });
  
      const response = await axios.post(
        `https://michaelmwanza.site/api/auth/login/`,
        { username, password }, // Data to send
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.status === 200) {
        const userData: User = { username }; // Customize user data if needed
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
  
        return { success: true };
      } else {
        console.error("Login failed:", response.data.message);
        return { success: false, error: response.data.message || "Invalid credentials" };
      }
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        return { success: false, error: error.response.data.message || "Invalid credentials" };
      } else {
        console.error("Login error:", error.message);
        return { success: false, error: "Network Error or Server is down" };
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the useAuth hook correctly
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export the AuthProvider as default
export default AuthProvider;