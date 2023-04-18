import useStore from "../store/MusicStore";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import MusicList from "./MusicList";
import classes from "./window.module.css";

export default function CustomListLogic(props) {
  const { likesList, setLastIntersectingItem, findIndexHandler } = props;

  const { customMusicPlayList, likeMusicList } = useStore((state) => state);

  console.log("customlistlogic");

  const onDragEnd = (result) => {
    const { destination, source } = result;

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

    customMusicPlayList.splice(source.index, 1);
    customMusicPlayList.splice(destination.index, 0, start);
    // setMusicList("custom", customMusicPlayList);

    console.log("dest" + JSON.stringify(destination));

    return;
  };

  return (
    <div className={classes.likewindow}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <h2>ihi</h2>
            <MusicList
              likesList={likesList}
              setLastIntersectingItem={setLastIntersectingItem}
              findIndexHandler={findIndexHandler}
              key="like_1"
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
