"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
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
      const storedAccessToken = localStorage.getItem("token");

      if (storedUser && storedAccessToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  //  Function to refresh token
  const refreshTokenFunc = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token found. Logging out.");
      logout();
      return null;
    }

    try {
      const response = await axios.post(
        "https://michaelmwanza.site/api/auth/refresh/",
        { refresh: refreshToken },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;

        // ✅ Store new tokens
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);

        return access;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }

    return null;
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    try {
      let token = localStorage.getItem("token");
  
      // Check if token is expired
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  
        if (decodedToken.exp < currentTime) {
          console.warn("Token expired. Refreshing...");
          token = await refreshTokenFunc();
  
          if (!token) {
            console.error("Token refresh failed. Logging out.");
            logout();
            throw new Error("Unauthorized");
          }
        }
      }
  
      // Make the initial request
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
  
      if (response.status === 401) {
        console.warn("Access token expired. Attempting to refresh...");
        token = await refreshTokenFunc();
  
        if (!token) {
          console.error("Token refresh failed. Logging out.");
          logout();
          throw new Error("Unauthorized");
        }
  
        // Store new token and retry request
        localStorage.setItem("token", token);
  
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
          
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      return response;
    } catch (error) {
      console.error("Error during fetchWithAuth:", error);
      throw error;
    }
  };
  

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "https://michaelmwanza.site/api/auth/login/",
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("response from api",response.data)
        const { access, refresh } = response.data;

        // ✅ Store tokens
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);

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
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, fetchWithAuth }}>
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
