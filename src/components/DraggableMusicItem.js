import { Draggable } from "react-beautiful-dnd";
import classes from "./Task.module.css";
export default function DraggableMusicItem(props) {
  return (
    <div className={classes.likewindow}>
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
    </div>
  );
}
