import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={
        "260952113847-40bmsga5bub0kgp7lnloij2k0qirhacg.apps.googleusercontent.com"
      }
    >
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
