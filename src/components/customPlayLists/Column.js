import { Draggable, Droppable } from "react-beautiful-dnd";
import classes from "./Column.module.css";
import CustomListItem from "./CustomListItem";
import Task from "./Task";

export default function Column(props) {
  console.log(props.tasks);
  return (
    <Droppable droppableId="column-1" type="task">
      {(provided, snapshot) => (
        <div
          className={classes.Container}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {props.tasks.map((task, index) => (
            <Task
              key={`t ${index}`}
              id={`task-${index}`}
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
