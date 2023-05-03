import { createPlayList } from "../../Util/SearchData";
import useStore from "../../store/MusicStore";
import classes from "./CustomListCreateButton.module.css";
import { Suspense } from "react";

export default function CustomListCreateButton(props) {
  const token = useStore((state) => state.userToken);
  const customMusicPlayList = useStore((state) => state.customMusicPlayList);

  let tracksUri = [];

  async function onClickHandler() {
    tracksUri = [];
    if (customMusicPlayList.length === 0) return;
    customMusicPlayList.map((item) => {
      const trackId = item.track.uri;
      return tracksUri.push(trackId);
    });

    const data = await createPlayList(tracksUri, token);
    console.log(data);
    props.setPlayListUrl(data.id);
  }

  return (
    <button className={classes.button} onClick={onClickHandler}>
      . Create Playlist
    </button>
  );
}
