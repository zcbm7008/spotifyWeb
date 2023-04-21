import useStore from "../../store/MusicStore";
import { DragDropContext } from "react-beautiful-dnd";

export default function DragAndDropHandler(props) {
  const { customMusicPlayList, likeMusicList } = useStore((state) => state);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (source.droppableId === "column -c_1" && !destination) {
      customMusicPlayList.splice(source.index, 1);
      return;
    }
    if (source.droppableId && !destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      const start = customMusicPlayList[source.index];
      const finish = customMusicPlayList[destination.index];

      customMusicPlayList.splice(source.index, 1);
      customMusicPlayList.splice(destination.index, 0, start);
      console.log(source, destination);
      return;
    }

    const start = likeMusicList[source.index];
    const finish = customMusicPlayList[destination.index];

    customMusicPlayList.splice(destination.index, 0, start);

    // setMusicList("custom", customMusicPlayList);
    console.log(source, destination);

    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>{props.children}</DragDropContext>
  );
}
