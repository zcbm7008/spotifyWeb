import { Droppable } from "react-beautiful-dnd";
import classes from "./Column.module.css";
import Task from "./Task";

export default function Column(props) {
  console.log("column rendered" + props.id);
  return (
    <Droppable
      droppableId={`column -${props.id}`}
      type="task"
      isDropDisabled={props.isDropDisabled ? true : false}
    >
      {(provided, snapshot) => (
        <div
          className={classes.Container}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {props.tasks.length === 0 && (
            <div className={classes.title}>Drag Music Cards here!</div>
          )}
          {props.tasks.map((task, index) => (
            <Task
              key={`${props.id} ${index}`}
              id={`${props.id} task-${index}`}
              task={task}
              index={index}
            ></Task>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
