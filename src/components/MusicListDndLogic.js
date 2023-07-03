import MusicList from "./MusicList";

export default function CustomListLogic(props) {
  const { likesList, setLastIntersectingItem, findIndexHandler } = props;

  return (
    <div>
      {likesList.length !== 0 ? (
        <MusicList
          likesList={likesList}
          setLastIntersectingItem={setLastIntersectingItem}
          findIndexHandler={findIndexHandler}
          key="like_1"
        />
      ) : (
        <div>No Likes found!</div>
      )}
    </div>
  );
}
