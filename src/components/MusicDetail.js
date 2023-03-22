import classes from "./MusicDetail.module.css";
import useStore from "../store/MusicStore";
import Controls from "./Controls";
import { useEffect } from "react";
function MusicDetail(props) {
  const likes = useStore((state) => state.likeMusicList);
  const like = likes[props.index];
  let audio = new Audio(like.track.preview_url);

  const playAudio = (e) => {
    if (e) e.preventDefault();
    audio.play();
  };
  const pauseAudio = (e) => {
    e.preventDefault();
    audio.pause();
  };

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
      <div className={classes.info}>
        {like.track.album.images.length ? (
          <a href={like.track.external_urls["spotify"]}>
            <img width={"15%"} src={like.track.album.images[0].url} alt="" />
          </a>
        ) : (
          <div>No Image</div>
        )}
        <div>
          <Controls controlMusic={controlAudio} isPlaying={!audio.paused} />
          {/* <button onClick={playAudio}>play</button> */}
        </div>
        <p>{like.track.album.name}</p>
        <p>{like.track.name}</p>
        <p>{like.track.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
    </>
  );
}

export default MusicDetail;
