import { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import Image from "next/image";
import axios from "axios";

type TProfile = {
  picture: string;
  name: string;
  email: string;
};

export default function GoogleLoginButton() {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<TProfile | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post(
        "https://api.server.d0lim.com/auth/v1/login/google",
        {
          code: codeResponse.code,
        }
      );

      console.log(tokens);
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
