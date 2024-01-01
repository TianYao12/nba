import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../components/Navbar.css";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
