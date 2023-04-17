import { useState, useEffect } from "react";
import useStore from "../store/MusicStore";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "playlist-modify-private user-read-playback-state user-library-modify user-library-read playlist-modify-public user-top-read playlist-modify-private playlist-read-collaborative";

function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { setUserToken } = useStore((state) => state);

  const onClickHandler = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  };

  useEffect(() => {
    let localtoken = window.localStorage.getItem("localtoken");

    if (!token && localtoken) {
      setUserToken(localtoken);
      navigate("/browse");
    }
  }, [token]);
  return (
    <>
      <h2>Login</h2>
      {!token && <h2>Please Login</h2>}

      {!token ? (
        <button onClick={onClickHandler}>Login to spotify</button>
      ) : (
        <button>already Logiined</button>
      )}
    </>
  );
}

export default Login;
