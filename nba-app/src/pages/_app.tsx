import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../components/Navbar.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}
