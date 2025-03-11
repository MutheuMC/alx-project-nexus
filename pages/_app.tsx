import "@/styles/globals.css";
import Footer from "@/components/Footer";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import AuthProvider from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noHeaderRoutes = ["/auth/login", "/auth/signup", "/auth/forgotPassword"]; // Routes where header shouldn't appear

  const shouldShowHeader = !noHeaderRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      {shouldShowHeader && <Header />}
      <main className={shouldShowHeader ? "pt-20" : ""}>
        <Component {...pageProps} />
      </main>
        <Footer/>

    </AuthProvider>
  );
}
