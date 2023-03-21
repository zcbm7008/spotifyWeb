import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MusicList from "./components/MusicList";
import useStore from "./store/MusicStore";

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/callback/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE =
    "user-read-playback-state user-library-modify user-library-read user-top-read";

  const [token, setToken] = useState("");
  const { addMusicList, getMusic } = useStore((state) => state);
  const likes = useStore((state) => state.likeMusicList);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      let urlParams = new URLSearchParams(
        window.location.hash.replace("#", "?")
      );
      token = urlParams.get("access_token");
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }
    if (token) {
      window.localStorage.setItem("token", token);
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchPlayLists = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    addMusicList("like", data.items);
  };

  if (likes.length === 0) {
    token && searchPlayLists();
    console.log("loaded");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Likes</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
          >
            Login to spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {!token && <h2>Please Login</h2>}
        {likes && <MusicList likesList={likes} />}
      </header>
    </div>
  );
}

export default App;
