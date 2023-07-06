import { Outlet } from "react-router-dom";
import SideBar from "../components/UI/SideBar";
import { memo } from "react";
import DragAndDropHandler from "../components/Dnd/DragAndDropHandler";
import classes from "./Browse.module.scss";

function RootLayout() {
  console.log("RootLayout rendered");

  return (
    <>
      <div className={classes.browse}>
        <DragAndDropHandler>
          <div className={classes.side_bar}>
            <SideBar />
          </div>

          <Outlet />
        </DragAndDropHandler>
      </div>
    </>
  );
}

export default memo(RootLayout);
