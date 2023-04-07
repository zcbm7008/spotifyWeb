import "./App.css";
import { useCallback, useEffect, lazy, useState, Suspense } from "react";
import useStore from "./store/MusicStore";
import LoadingSpinner from "./components/LoadingSpinner";
import React from "react";
import searchPlayLists from "./components/searchPlayLists";
import SideBar from "./components/UI/SideBar";

const MusicList = lazy(() => import("./components/MusicList"));
const MusicDetail = lazy(() => import("./components/MusicDetail"));

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "user-read-playback-state user-library-modify user-library-read user-top-read playlist-read-collaborative";

function App() {
  const [token, setToken] = useState("");
  const [lastIntersectingItem, setLastIntersectingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showSide, setShowSide] = useState(true);

  const { addMusicList, addArtistList } = useStore((state) => state);
  const likes = useStore((state) => state.likeMusicList);

  const ioCallback = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
        io.unobserve(entry.target);
      }
    });
  };

  const findIndexHandler = (index) => {
    setCurrentIndex(index);
  };

  const addLikesList = useCallback(
    async (token) => {
      const data = await searchPlayLists({
        token,
        url: "https://api.spotify.com/v1/me/tracks",
        params: {
          offset: page * 20,
          limit: 20,
        },
      });
      console.log(data);
      addMusicList("like", data.items);
    },
    [page]
  );

  const addTopList = useCallback(
    async (token) => {
      const data = await searchPlayLists({
        token,
        url: "https://api.spotify.com/v1/me/top/artists",
      });
      console.log(data);
      addArtistList("Top", data.items);
    },
    [page]
  );

  const addFeaturedList = useCallback(
    async (token) => {
      const data = await searchPlayLists({
        token,
        url: "https://api.spotify.com/v1/browse/featured-playlists",
      });
      console.log(data);
    },
    [page]
  );

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

    if (token) addLikesList(token);
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
    if (page >= 1) addLikesList(token);
  }, [page, addLikesList, token]);

  // if (likes.length === 0) {
  //   token && searchPlayLists();
  //   console.log("loaded");
  // }

  function closeDetailHandler() {
    setCurrentIndex(-1);
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

        <SideBar
          onClose={() => {
            setShowSide((prev) => !prev);
          }}
          showSide={showSide}
          onClickLikes={addLikesList.bind(null, token)}
          onClickFeatured={addFeaturedList.bind(null, token)}
          onClickTop={addTopList.bind(null, token)}
        />

        {!token && <h2>Please Login</h2>}
        {token && (
          <>
            <Suspense fallback={<LoadingSpinner />}>
              <MusicList
                likesList={likes}
                setLastIntersectingItem={setLastIntersectingItem}
                findIndexHandler={findIndexHandler}
              />
            </Suspense>

            {currentIndex !== -1 && (
              <Suspense fallback={<div></div>}>
                <MusicDetail
                  index={currentIndex}
                  onClose={closeDetailHandler}
                />
              </Suspense>
            )}
          </>
        )}
        {/* <button onClick={searchPlayLists}>Search</button> */}
      </header>
    </div>
  );
}

export default App;
