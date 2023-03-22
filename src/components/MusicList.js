import MusicItem from "./MusicItem";
import classes from "./MusicList.module.css";
import React, { forwardRef } from "react";
import ItemSkeleton from "./ItemSkeleton";

const MusicList = forwardRef((props, ref) => {
  let likes = props.likesList;
  const { setLastIntersectingItem, loading } = props;

  React.useImperativeHandle(ref, () => ({
    setLastIntersectingItem,
  }));

  return (
    <>
      <div className={classes.list}>
        {loading ? (
          new Array(20).fill(1).map((_, i) => {
            return (
              <li key={i} className={classes.li}>
                <ItemSkeleton key={i} />;
              </li>
            );
          })
        ) : (
          <ul key={likes.key} className={classes.ul}>
            {likes.map((el, index) => (
              <>
                {index === likes.length - 1 ? (
                  <li
                    key={el.key}
                    className={classes.li}
                    ref={setLastIntersectingItem}
                  >
                    <MusicItem like={el} index={index} />
                  </li>
                ) : (
                  <li key={el.key} className={classes.li}>
                    <MusicItem like={el} index={index} />{" "}
                  </li>
                )}
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
});

export default MusicList;
