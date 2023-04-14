import classes from "./CustomPlayLists.module.css";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import useStore from "../store/MusicStore";
import ItemBar from "./UI/ItemBar";

export default function CustomPlayLists() {
  const customList = useStore((state) => state.customMusicPlayList);
  console.log("customlist" + customList);
  return (
    <div className={classes.customlist}>
      <Suspense fallback={<LoadingSpinner />}>
        {customList.map((item) => {
          item = item.track;
          console.log("this", item);
          return <ItemBar item={item} />;
        })}
      </Suspense>
    </div>
  );
}
