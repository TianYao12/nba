import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import "../components/Navbar.css";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={inter.className}>
        <Navbar />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
}
