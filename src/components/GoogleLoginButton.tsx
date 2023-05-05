import React, {useCallback, useEffect, useState} from "react";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

type TProfile = {
  picture: string;
  name: string;
  email: string;
};

export default function GoogleLoginButton() {
  const [isNew, setIsNew] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [complete, setComplete] = useState(false);
  const [info, setInfo] = useState<string>("");

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
        setAccessToken((tokens as any).data.access_token);
      } catch (e) {

        console.log(e);
        if ((e as any).response.data.error_code === "NEW_USER") {
          console.log("new user, show nickname form")
          setIsNew(true);
          setAccessToken((e as any).response.data.token.access_token);
        }
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
    flow: "auth-code",
  });

  const completeSignUp = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const result = await axios.post("https://api.server.d0lim.com/auth/v1/signup",
      {
        nickname
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    console.log(result);
    setAccessToken((result as any).data.access_token);
  }

  const getMyInfo = useCallback(async () => {
    return await axios.get("https://api.server.d0lim.com/auth/v1/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  }, [accessToken])

  useEffect(() => {
    const f = async () => {
      const myInfo = await getMyInfo();
      console.log(myInfo);
      setInfo(JSON.stringify((myInfo as any).data));
      setComplete(true);
    };
    f();
  }, [accessToken, getMyInfo])

  return (
    <div>
      <h2>React Google Login</h2>
      <br/>
      <br/>
      <button onClick={() => login()}>Sign in with Google 🚀</button>
      {isNew && !complete && <form onSubmit={completeSignUp}>
          <label>
              nickname:
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
          </label>
          <input type="submit" value="Submit"/>
      </form>}
      {complete && <div>
        {info}
      </div>}
    </div>
  );
}
