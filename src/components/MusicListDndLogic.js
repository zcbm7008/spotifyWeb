import useStore from "../store/MusicStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MusicList from "./MusicList";
import classes from "./window.module.css";
import { Suspense } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";

export default function CustomListLogic(props) {
  const { likesList, setLastIntersectingItem, findIndexHandler } = props;

  return (
    <div className={classes.likewindow}>
      <MusicList
        likesList={likesList}
        setLastIntersectingItem={setLastIntersectingItem}
        findIndexHandler={findIndexHandler}
        key="like_1"
      />
    </div>
  );
}
