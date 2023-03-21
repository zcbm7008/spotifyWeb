import { useState } from "react";
import classes from "./MusicItem.module.scss";

function MusicItem(props) {
  const [clicked, setClicked] = useState(false);
  let like = props.like;
  function onClickHandler(e) {
    e.preventDefault();
    setClicked(true);
  }

  return (
    <div
      className={`${classes.card} ${clicked && classes.card_hidden} ${
        classes.focusanim
      }`}
      onClick={(e) => onClickHandler(e)}
      key={like.track.id}
    >
      <a href="/">
        <div className={classes.spinner}></div>
        <div>
          <div className={classes.image}>
            {like.track.album.images.length ? (
              <img width={"100%"} src={like.track.album.images[0].url} alt="" />
            ) : (
              <div>No Image</div>
            )}
          </div>
          <div className={classes.description}>
            <p className={classes.name}>{like.track.name}</p>
            <p className={classes.artist}>
              {like.track.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default MusicItem;
