import { Outlet } from "react-router-dom";
import SideBar from "../components/UI/SideBar";
import { useEffect, useState } from "react";
import { useAddFeaturedList, useAddTopList } from "../Util/UserDataFetcher";
import useStore from "../store/MusicStore";
import { useNavigate } from "react-router-dom";
import DragAndDropHandler from "../components/Dnd/DragAndDropHandler";

import classes from "./Browse.module.scss";
import DndRemoveZone from "../components/Dnd/DndRemoveZone";
function RootLayout() {
  const navigate = useNavigate();
  const { setUserToken } = useStore((state) => state);

  function Logout() {
    setUserToken("");
    window.localStorage.removeItem("localtoken");
    navigate("/");
  }

  const token = useStore((state) => state.userToken);
  const [showSide, setShowSide] = useState(true);

  const onCLickLikes = () => {
    navigate("likes");
  };

  useEffect(() => {
    onCLickLikes();
  }, []);

  return (
    <>
      <div className={classes.browse}>
        <DragAndDropHandler>
          <SideBar
            onClose={() => {
              setShowSide((prev) => !prev);
            }}
            showSide={showSide}
            onClickLikes={onCLickLikes}
            onClickFeatured={useAddFeaturedList.bind(null, token)}
            onClickTop={useAddTopList.bind(null, token)}
            onClickLogout={Logout}
          />

          <Outlet />
        </DragAndDropHandler>
      </div>
    </>
  );
}

export default RootLayout;
