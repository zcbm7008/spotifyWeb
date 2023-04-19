import useStore from "../store/MusicStore";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import MusicList from "./MusicList";
import classes from "./window.module.css";
import { Suspense } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";

export default function CustomListLogic(props) {
  const { likesList, setLastIntersectingItem, findIndexHandler } = props;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={classes.likewindow}>
        <h2>ihi</h2>
        <MusicList
          likesList={likesList}
          setLastIntersectingItem={setLastIntersectingItem}
          findIndexHandler={findIndexHandler}
          key="like_1"
        />
      </div>
    </Suspense>
  );
}
