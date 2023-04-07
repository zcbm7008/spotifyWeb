import classes from "./MusicDetail.module.css";
import useStore from "../store/MusicStore";
import Controls from "./Controls";
import { useEffect, useState } from "react";
function MusicDetail(props) {
  const [toggle, setToggle] = useState(false);
  const likes = useStore((state) => state.likeMusicList);
  const like = likes[props.index];
  let audio = new Audio(like.track.preview_url);

  function toggleChangerHandler() {
    setToggle((prev) => !prev);
    console.log(toggle);
  }
  const controlAudio = (e) => {
    if (e) e.preventDefault();

    if (!audio.paused) {
      audio.pause();
    } else audio.play();
  };
  useEffect(() => {
    console.log(like);
    console.log(like.extrenal_urls);
    audio.pause();
    audio.currentTime = 0;
    audio.src = like.track.preview_url;
    audio.load();
    audio.play();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [props.index]);

  return (
    <>
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
          <a
            href={like.track.external_urls["spotify"]}
            className={toggle && classes.toggled_image}
          >
            <img
              width={!toggle ? "40%" : "15%"}
              src={like.track.album.images[0].url}
              alt=""
            />
          </a>
        ) : (
          <div>No Image</div>
        )}
        <div>
          <Controls controlMusic={controlAudio} isPlaying={!audio.paused} />
          {/* <button onClick={playAudio}>play</button> */}
        </div>
        <div className={classes.detail}>
          <p>{like.track.album.name}</p>
          <p>{like.track.name}</p>
          <p className={classes.artists}>
            {like.track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
    </>
  );
}

export default MusicDetail;
