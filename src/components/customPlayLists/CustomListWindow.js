import CustomListLogic from "./CustomListLogic";
import { createPlayList } from "../../Util/SearchData";
import classes from "./CustomListWindow.module.css";
import useStore from "../../store/MusicStore";
import axios from "axios";

export default function CustomListWindow() {
  const token = useStore((state) => state.userToken);
  const customMusicPlayList = useStore((state) => state.customMusicPlayList);

  const tracksUri = [];

  async function onClickHandler() {
    if (customMusicPlayList.length === 0) return;
    customMusicPlayList.map((item) => {
      const trackId = item.track.uri;
      return tracksUri.push(trackId);
    });

    const data = await createPlayList(tracksUri, token);
    console.log(data);
  }

  return (
    <div className={classes.customlist}>
      <CustomListLogic />
      <button className={classes.button} onClick={onClickHandler}>
        . Create Playlist
      </button>
    </div>
  );
}
