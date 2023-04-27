import { Draggable } from "react-beautiful-dnd";
import classes from "./Task.module.scss";
export default function Task(props) {
  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: "0.001s",
    };
  }
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={classes.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          style={{ ...provided.draggableProps.style, ...props.draggableStyle }}
        >
          <div className={classes.track_name}>{props.task.track.name}</div>
          {
            <div className={classes.image}>
              {props.task.track.album.images.length ? (
                <img
                  loading="lazy"
                  width={"80%"}
                  src={props.task.track.album.images[1].url}
                  alt=""
                />
              ) : (
                <div>No Image</div>
              )}
            </div>
          }
        </div>
      )}
    </Draggable>
  );
}
