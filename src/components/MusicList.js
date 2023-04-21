import classes from "./MusicList.module.css";
import React, { forwardRef } from "react";
import DropItem from "./DropItem";

const MusicList = forwardRef((props, ref) => {
  let likes = props.likesList;
  const { setLastIntersectingItem } = props;
  React.useImperativeHandle(ref, () => ({
    setLastIntersectingItem,
  }));

  const indexClickHandler = (index) => {
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
                  <DropItem
                    like={el}
                    id={"item" + index}
                    index={index}
                    indexClickHandler={indexClickHandler}
                  />
                </li>
              ) : (
                <li key={el.key} className={classes.li}>
                  <DropItem
                    like={el}
                    id={"item" + index}
                    index={index}
                    indexClickHandler={indexClickHandler}
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
