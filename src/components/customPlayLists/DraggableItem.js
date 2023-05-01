import { Draggable } from "react-beautiful-dnd";

export default function DraggableItem(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.content}
        </div>
      )}
    </Draggable>
  );
}
