import "./App.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MusicList from "./components/MusicList";
import useStore from "./store/MusicStore";
import LoadingSpinner from "./components/LoadingSpinner";
import ItemSkeleton from "./components/ItemSkeleton";

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/callback/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE =
    "user-read-playback-state user-library-modify user-library-read user-top-read";

  const [token, setToken] = useState("");
  const [lastIntersectingItem, setLastIntersectingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const { addMusicList, getMusic } = useStore((state) => state);
  const likes = useStore((state) => state.likeMusicList);

  const ioCallback = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
        io.unobserve(entry.target);
      }
    });
  };

  const searchPlayLists = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me/tracks", {
        headers,
        params: {
          offset: page * 20,
          limit: 20,
        },
      });
      console.log(data);
      addMusicList("like", data.items);
    } catch {
      console.error("fetching error");
    }
    setLoading(false);
  };

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
      setToken(localtoken);
    }
    if (!token && localtoken) {
      setToken(localtoken);
    }
    if (token) searchPlayLists();
  }, [token]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("localtoken");
  };

  useEffect(() => {
    let observer;
    if (lastIntersectingItem) {
      console.log(lastIntersectingItem);
      observer = new IntersectionObserver(ioCallback, { threshold: 0.5 });
      observer.observe(lastIntersectingItem);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingItem]);

  useEffect(() => {
    console.log(`page = ${page}`);
    if (page >= 1) searchPlayLists();
  }, [page]);

  // if (likes.length === 0) {
  //   token && searchPlayLists();
  //   console.log("loaded");
  // }

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
        <ItemSkeleton />
        {token && (
          <MusicList
            likesList={likes}
            setLastIntersectingItem={setLastIntersectingItem}
            loading={loading}
          />
        )}
        {loading && <LoadingSpinner />}
        {/* <button onClick={searchPlayLists}>Search</button> */}
      </header>
    </div>
  );
}

export default App;
