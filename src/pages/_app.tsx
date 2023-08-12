import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={
        "260952113847-cg3mb6i3122r45m4ab2523gce4kuu05j.apps.googleusercontent.com"
      }
    >
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
