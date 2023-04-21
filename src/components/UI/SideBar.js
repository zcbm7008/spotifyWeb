import classes from "./SideBar.module.css";
import { useState } from "react";

function SideBar(props) {
  return (
    <>
      <button onClick={props.onClose} className={classes.toggle}>
        {props.showSide ? "=" : ">>"}
      </button>
      {props.showSide && (
        <div className={classes.sidebar}>
          <div>hi</div>
          <div className={classes.menus}>
            <p onClick={props.onClickLikes}>Likes</p>
            <p onClick={props.onClickFeatured}>Featured</p>
            <p onClick={props.onClickTop}>Top</p>
            <p onClick={props.onClickLogout}>Logout</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
