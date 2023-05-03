import CustomPlaylistLogic from "../components/customPlayLists/CustomPlaylistLogic";
import SpotifyPlayer from "../components/SpotifyPlayer";
import { Outlet } from "react-router-dom";
import classes from "./Browse.module.scss";
import CustomListCreateButton from "../../src/components/customPlayLists/CustomListCreateButton";
import { useState } from "react";
import { useEffect } from "react";

export default function BrowseLayout() {
  const [playListUrl, setPlayListUrl] = useState(null);
  useEffect(() => {}, [playListUrl]);
  return (
    <>
      <div className={classes.list}>
        <div className={classes.nav}>
          <h1 className={classes.nav_menu}>likes</h1>

          <Outlet />
        </div>
      </div>
      <div className={classes.custom}>
        <div className={classes.customfixed}>
          <SpotifyPlayer playListUrl={playListUrl} />
          <CustomPlaylistLogic />
          <CustomListCreateButton setPlayListUrl={setPlayListUrl} />
        </div>
      </div>
    </>
  );
}
