import Browseclasses from "../../pages/Browse.module.scss";
import classes from "./SideBar.module.css";
import { useState } from "react";
import React from "react";

function SideBar(props) {
  const [showSide, setShowSide] = useState(true);
  const toggleSidebar = () => {
    setShowSide((prevState) => !prevState);
  };
  console.log("sidebar rendered");
  return (
    <div
      className={`${
        showSide ? Browseclasses.side_bar : Browseclasses.side_bar_hidden
      }`}
    >
      <button onClick={toggleSidebar} className={classes.toggle}>
        {showSide ? "=" : ">>"}
      </button>
      <div className={`${classes.sidebar} ${showSide ? "" : classes.hide}`}>
        <div className={classes.menus}>
          <p onClick={props.onClickLikes}>Likes</p>
          <p onClick={props.onClickFeatured}>Featured</p>
          <p onClick={props.onClickTop}>Top</p>
          <p onClick={props.onClickLogout}>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SideBar);
