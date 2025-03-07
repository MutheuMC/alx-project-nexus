import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import AuthProvider from "@/context/AuthContext";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Component {...pageProps} />
      </main>
    </>
  );
}
