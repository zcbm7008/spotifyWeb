import { Draggable } from "react-beautiful-dnd";
import MusicItem from "./MusicItem";
import { useEffect } from "react";
import styled from "styled-components";

export default function DropItem(props) {
  const { indexClickHandler } = props;
  return (
    <>
      <Draggable draggableId={props.id} index={props.index}>
        {(provided, snapshot) => (
          <>
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              style={{
                ...provided.draggableProps.style,
                transform: snapshot.isDragging
                  ? provided.draggableProps.style?.transform
                  : "translate(0px, 0px)",
              }}
            >
              {
                <MusicItem
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  like={props.like}
                  id={props.id}
                  index={props.index}
                  indexClickHandler={indexClickHandler}
                  isDragging={snapshot.isDragging}
                />
              }
            </div>
            {snapshot.isDragging && (
              <MusicItem
                style={{ transform: "none" }}
                like={props.like}
                id={props.id}
                isDragging={false}
              />
            )}
          </>
        )}
      </Draggable>
    </>
  );
}
