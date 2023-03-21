import MusicItem from "./MusicItem";
import classes from "./MusicList.module.css";

const MusicList = (props) => {
  let likes = props.likesList;
  return (
    <div className={classes.list}>
      <ul key={likes.key} className={classes.ul}>
        {likes.map((el, index) => (
          <li key={el.key} className={classes.li}>
            <MusicItem like={el} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicList;
