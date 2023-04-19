import useStore from "../../store/MusicStore";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { useEffect, useState } from "react";
import SearchData from "../../Util/SearchData";

export default function CustomListLogic(props) {
  const [lastIntersectingItem, setLastIntersectingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const userToken = useStore((state) => state.userToken);

  const { addMusicList } = useStore((state) => state);
  const { customMusicPlayList, likeMusicList } = useStore((state) => state);

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = likeMusicList[source.index];
    const finish = customMusicPlayList[destination.index];

    if (start === finish) {
      return;
    }

    customMusicPlayList.splice(destination.index, 0, start);

    // setMusicList("custom", customMusicPlayList);
    console.log(source, destination);

    return;

    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Column key="c_1" id="c_1" tasks={customMusicPlayList} />

      <div>---------------</div>

      <Column key="c_2" id="c_2" tasks={likeMusicList} isDropDisabled={true} />
    </DragDropContext>
  );
}
