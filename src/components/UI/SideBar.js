import classes from "./SideBar.module.css";
import { useState, useCallback } from "react";
import React from "react";
import useStore from "../../store/MusicStore";
import { useNavigate } from "react-router-dom";

function SideBar(props) {
  const navigate = useNavigate();
  const setUserToken = useStore((state) => state.setUserToken);

  const [showSide, setShowSide] = useState(true);

  const toggleSidebar = () => {
    setShowSide((prevState) => !prevState);
  };

  const logout = () => {
    setUserToken("");
    window.localStorage.removeItem("localtoken");
    navigate("/");
  };

  const onCLickLikes = useCallback(() => {
    navigate("likes");
  }, [navigate]);

  console.log("sidebar rendered");
  return (
    <div className={`${showSide ? props.side_bar : props.side_bar_hidden}`}>
      <button onClick={toggleSidebar} className={classes.toggle}>
        {showSide ? "=" : ">>"}
      </button>
      <div className={`${classes.sidebar} ${showSide ? "" : classes.hide}`}>
        <div className={classes.menus}>
          <p onClick={onCLickLikes}>Likes</p>
          <p onClick={() => console.log("wip")}>Featured</p>
          <p onClick={() => console.log("wip")}>Top</p>
          <p onClick={logout}>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SideBar);
