import { Suspense, lazy } from "react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useStore from "../store/MusicStore";
import SearchData from "../Util/SearchData";
import { Droppable } from "react-beautiful-dnd";
import classes from "./Browse.module.css";
import MusicDetail from "../components/MusicDetail";

const MusicListDndLogic = lazy(() => import("../components/MusicListDndLogic"));

function LikesPage() {
  const [lastIntersectingItem, setLastIntersectingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const userToken = useStore((state) => state.userToken);
  const likes = useStore((state) => state.likeMusicList);
  const { addMusicList } = useStore((state) => state);

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
    console.log(userToken);
    async function getData() {
      const data = await SearchData({
        token: userToken,
        url: "https://api.spotify.com/v1/me/tracks",
        params: {
          offset: page * 20,
          limit: 20,
        },
      });
      console.log("likes" + data);
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
      <Suspense fallback={<LoadingSpinner />}>
        <div className={classes.list_contents}>
          <Droppable
            droppableId={`column -2`}
            direction="horizontal"
            type="task"
            isDropDisabled="true"
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <MusicListDndLogic
                  likesList={likes}
                  setLastIntersectingItem={setLastIntersectingItem}
                  findIndexHandler={findIndexHandler}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
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
