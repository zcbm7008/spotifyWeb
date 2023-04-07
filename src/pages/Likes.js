import { Suspense, lazy, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import useStore from "../store/MusicStore";

const MusicList = lazy(() => import("./components/MusicList"));
const MusicDetail = lazy(() => import("./components/MusicDetail"));

function LikesPage() {
  const [lastIntersectingItem, setLastIntersectingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);

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
    console.log(`page = ${page}`);
    if (page >= 1) addLikesList(token);
  }, [page, addLikesList, token]);

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
    </>
  );
}

export default LikesPage;
