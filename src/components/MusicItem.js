import { useState } from "react";
import classes from "./MusicItem.module.scss";

function MusicItem(props) {
  const [clicked, setClicked] = useState(false);
  const { like, index, indexClickHandler } = props;

  function onClickHandler(e) {
    e.preventDefault();
    setClicked(true);
    indexClickHandler(index);
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
        <div className={classes.image}>
          {like.track.album.images.length ? (
            <img
              loading="lazy"
              width={"80%"}
              src={like.track.album.images[0].url}
              alt=""
            />
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
      </a>
    </div>
  );
}

export default MusicItem;
