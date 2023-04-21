import CustomPlaylistLogic from "../components/customPlayLists/CustomPlaylistLogic";
import SpotifyPlayer from "../components/SpotifyPlayer";
import { Outlet } from "react-router-dom";
import LikesPage from "./Likes";
import Column from "../components/customPlayLists/Column";
import useStore from "../store/MusicStore";
import classes from "./Browse.module.css";
import DndRemoveZone from "../components/Dnd/DndRemoveZone";

export default function BrowseLayout() {
  const { likeMusicList } = useStore((state) => state);
  return (
    <>
      <DndRemoveZone />
      <div className={classes.list}>
        <LikesPage />
      </div>
      <div className={classes.custom}>
        <div className={classes.customfixed}>
          <SpotifyPlayer />
          <CustomPlaylistLogic />
        </div>
      </div>
    </>
  );
}
