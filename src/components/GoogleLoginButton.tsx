import {useState, useEffect} from "react";
import {useGoogleLogin, googleLogout} from "@react-oauth/google";
import Image from "next/image";
import axios, {AxiosResponse} from "axios";

type TProfile = {
  picture: string;
  name: string;
  email: string;
};

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      try {
        const tokens = await axios.post(
          "https://api.server.d0lim.com/auth/v1/login/google",
          {
            code: codeResponse.code,
          }
        );
        console.log(tokens);
      } catch (e) {
        console.log(e);
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error)
    },
    flow: "auth-code",
  });

  return (
    <div>
      <h2>React Google Login</h2>
      <br/>
      <br/>
      <button onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
  );
}
