import classes from "./MusicDetail.module.css";
import useStore from "../../store/MusicStore";
import { useCallback, useEffect, useState, useRef } from "react";
import Portal from "../Portal";
function MusicDetail(props) {
  const [toggle, setToggle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const likes = useStore((state) => state.likeMusicList);
  const like = likes[props.index];
  const audio = useRef(new Audio(like.track.preview_url)).current;

  function toggleChangerHandler() {
    setToggle((prev) => !prev);
  }

  const controlAudio = useCallback(
    (e) => {
      e.preventDefault();
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying((prev) => !prev);
    },
    [audio, isPlaying]
  );

  const Controls = (props) => {
    console.log(props.isPlaying);
    return (
      <button onClick={props.controlMusic} className={classes.button}>
        {props.isPlaying ? "■" : "▶"}
      </button>
    );
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        console.log("ended");
      });
    }
  }, [audio]);

  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.src = like.track.preview_url;
    audio.load();
    audio.play();
    setIsPlaying(true);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audio, like.track.preview_url]);

  if (audio.current) {
    audio.current.addEventListener("ended", () => {
      setIsPlaying(false);
      console.log("ended");
    });
  }

  console.log(like.track);
  return (
    <Portal>
      <div className={!toggle ? classes.info : classes.toggled_info}>
        <div>
          <button onClick={props.onClose} className={classes.exit}>
            X
          </button>
          <button onClick={toggleChangerHandler} className={classes.toggle}>
            =
          </button>
        </div>
        {like.track.album.images.length ? (
          <div className={classes["image_box"]}>
            <div className={classes.image}>
              <a
                href={like.track.external_urls["spotify"]}
                className={toggle && classes.toggled_image}
              >
                <img
                  width={!toggle ? "100%" : "15%"}
                  src={like.track.album.images[0].url}
                  alt=""
                />
              </a>
            </div>
            <p className={classes["album_name"]}>
              from '{like.track.album.name}'
            </p>
          </div>
        ) : (
          <div>No Image</div>
        )}
        <div className={classes.moreinfo}>
          <div className={classes.detail}>
            <a
              className={classes.a}
              href={like.track.external_urls["spotify"]}
              target="_blank"
              rel="noreferrer"
            >
              <p className={classes["track_name"]}>
                <span className={classes.hoverable}>{like.track.name}</span>
              </p>
            </a>

            <p className={classes["artist_name"]}>
              {like.track.artists.map((artist, index) => (
                <>
                  {console.log(artist)}
                  {index > 0 && ", "}
                  <a
                    className={classes.a}
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={classes.hoverable}>{artist.name}</span>
                  </a>
                </>
              ))}
            </p>

            <Controls controlMusic={controlAudio} isPlaying={isPlaying} />
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default MusicDetail;
