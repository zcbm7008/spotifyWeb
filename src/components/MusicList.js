import MusicItem from "./MusicItem";
import classes from "./MusicList.module.css";
import React, { forwardRef } from "react";

const MusicList = forwardRef((props, ref) => {
  let likes = props.likesList;
  const { setLastIntersectingItem } = props;

  React.useImperativeHandle(ref, () => ({
    setLastIntersectingItem,
  }));

  const onClickHandler = (index) => {
    props.findIndexHandler(index);
  };

  return (
    <>
      <div className={classes.list}>
        <ul key={likes.key} className={classes.ul}>
          {likes.map((el, index) => (
            <>
              {index === likes.length - 1 ? (
                <li
                  key={el.key}
                  className={classes.li}
                  ref={setLastIntersectingItem}
                >
                  <MusicItem
                    like={el}
                    index={index}
                    indexClickHandler={onClickHandler}
                  />
                </li>
              ) : (
                <li key={el.key} className={classes.li}>
                  <MusicItem
                    like={el}
                    index={index}
                    indexClickHandler={onClickHandler}
                  />{" "}
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
});

export default MusicList;
