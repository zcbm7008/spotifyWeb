import { Draggable, Droppable } from "react-beautiful-dnd";

export default function DroppableList(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Droppable droppableId={props.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.items.map((item, index) => (
                  <div />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
