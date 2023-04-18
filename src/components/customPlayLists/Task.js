import { Draggable } from "react-beautiful-dnd";
import classes from "./Task.module.css";
export default function Task(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={classes.list}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.track.name}
        </div>
      )}
    </Draggable>
  );
}
