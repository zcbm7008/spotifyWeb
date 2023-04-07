import { useState, useEffect } from "react";
import { useAddLikesList } from "./UserDataFetcher";
import useStore from "../store/MusicStore";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "user-read-playback-state user-library-modify user-library-read user-top-read playlist-read-collaborative";

function Login() {
  const [token, setToken] = useState("");
  const { setUserToken } = useStore((state) => state);

  useEffect(() => {
    const hash = window.location.hash;
    let localtoken = window.localStorage.getItem("localtoken");

    if (!token && !localtoken && hash) {
      let urlParams = new URLSearchParams(
        window.location.hash.replace("#", "?")
      );
      localtoken = urlParams.get("access_token");
      window.location.hash = "";
      window.localStorage.setItem("localtoken", localtoken);
      setUserToken(localtoken);
    }

    if (!token && localtoken) {
      setUserToken(localtoken);
    }

    // if (token) useAddLikesList(token);
  }, [token]);

  const logout = () => {
    setUserToken("");
    window.localStorage.removeItem("localtoken");
  };

  return (
    <>
      <h2>Login</h2>
      {!token && <h2>Please Login</h2>}

      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
        >
          Login to spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </>
  );
}

export default Login;
