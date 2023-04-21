import { Droppable } from "react-beautiful-dnd";
import classes from "./DndRemoveZone.moudle.css";
export default function DndRemoveZone() {
  return (
    <Droppable droppableId={classes.remove}>
      {(provided, snapshot) => (
        <div className="remove" ref={provided.innerRef}>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
