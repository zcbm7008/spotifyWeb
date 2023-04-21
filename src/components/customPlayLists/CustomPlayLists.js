import classes from "./CustomPlayLists.module.css";
import { Suspense } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import useStore from "../../store/MusicStore";
import ItemBar from "../UI/ItemBar";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function CustomPlayLists(props) {
  const customList = useStore((state) => state.customMusicPlayList);
  return (
    <Draggable draggableId={props.id}>
      {(provided) => (
        <div
          className={classes.customlist}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {props.items.map((item, index) => {
              item = item.track;
              console.log("this", item);
              return <ItemBar item={item} key={item.id} index={index} />;
            })}
          </Suspense>
        </div>
      )}
    </Draggable>
  );
}
