"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

// Define user type
export interface User {
  user_id: string;
  username: string;
  email: string;
}

// Define AuthContextType
export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
      const response = await axios.post(
        `https://michaelmwanza.site/api/auth/login/`,
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { access } = response.data;

        // Decode JWT to extract user_id
        const decodedToken: any = jwtDecode(access);
        console.log("Decoded Token:", decodedToken);

        const userData: User = {
          user_id: decodedToken.user_id,
          username,
          email: decodedToken.email || "",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");

        return { success: true };
      } else {
        return { success: false, error: response.data.message || "Invalid credentials" };
      }
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || "Network Error or Server is down" };
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
