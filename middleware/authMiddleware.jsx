import Router from "next/router";

export const authMiddleware = (ctx) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (!token) {
      Router.push("/auth/login"); // Redirect to login if not logged in
    }
  }
};
