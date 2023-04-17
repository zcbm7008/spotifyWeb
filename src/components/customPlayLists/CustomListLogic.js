import useStore from "../../store/MusicStore";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

export default function CustomListLogic() {
  const { setMusicList, customMusicPlayList } = useStore((state) => state);
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = customMusicPlayList[source.index];
    const finish = customMusicPlayList[destination.index];

    if (start === finish) {
      return;
    }

    customMusicPlayList.splice(source.index, 1);
    customMusicPlayList.splice(destination.index, 0, start);
    // setMusicList("custom", customMusicPlayList);

    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Column key="custom_1" tasks={customMusicPlayList}></Column>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
