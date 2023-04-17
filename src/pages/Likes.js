import { Suspense, lazy } from "react";
import SpotifyPlayer from "../components/SpotifyPlayer";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useStore from "../store/MusicStore";
import SearchData from "../Util/SearchData";

const MusicList = lazy(() => import("../components/MusicList"));
const MusicDetail = lazy(() => import("../components/MusicDetail"));

function LikesPage() {
  const [lastIntersectingItem, setLastIntersectingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const userToken = useStore((state) => state.userToken);
  const { addMusicList } = useStore((state) => state);
  const likes = useStore((state) => state.likeMusicList);

  function closeDetailHandler() {
    setCurrentIndex(-1);
  }

  const ioCallback = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
        io.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    async function getData() {
      const data = await SearchData({
        token: userToken,
        url: "https://api.spotify.com/v1/me/tracks",
        params: {
          offset: page * 20,
          limit: 20,
        },
      });
      console.log(data);
      addMusicList("like", data.items);
    }

    getData();
  }, [page]);

  const findIndexHandler = (index) => {
    setCurrentIndex(index);
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

  return (
    <>
      <h1>Your Likes</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <MusicList
          likesList={likes}
          setLastIntersectingItem={setLastIntersectingItem}
          findIndexHandler={findIndexHandler}
        />
      </Suspense>

      {currentIndex !== -1 && (
        <Suspense fallback={<div></div>}>
          <MusicDetail index={currentIndex} onClose={closeDetailHandler} />
        </Suspense>
      )}
      <SpotifyPlayer />
    </>
  );
}

export default LikesPage;
