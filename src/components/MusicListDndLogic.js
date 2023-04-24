import MusicList from "./MusicList";
import classes from "./window.module.css";

export default function CustomListLogic(props) {
  const { likesList, setLastIntersectingItem, findIndexHandler } = props;

  return (
    <div className={classes.likewindow}>
      <MusicList
        likesList={likesList}
        setLastIntersectingItem={setLastIntersectingItem}
        findIndexHandler={findIndexHandler}
        key="like_1"
      />
    </div>
  );
}
