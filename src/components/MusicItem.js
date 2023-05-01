import classes from "./MusicItem.module.scss";

import Task from "./customPlayLists/Task";

function MusicItem(props) {
  const { like, index, indexClickHandler } = props;

  function onClickHandler(e) {
    e.preventDefault();
    indexClickHandler(index);
  }

  return props.isDragging ? (
    <Task
      draggableStyle={{ width: "500px" }}
      key={`${props.id} ${index}`}
      id={`${props.id} task-${index}`}
      task={like}
      index={index}
    ></Task>
  ) : (
    <div
      className={`${classes.card} ${classes.focusanim}`}
      onClick={(e) => onClickHandler(e)}
      key={like.track.id}
    >
      <a href="/">
        <div className={classes.image}>
          {like.track.album.images.length ? (
            <img
              loading="lazy"
              width={"100%"}
              src={like.track.album.images[1].url}
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
