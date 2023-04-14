import classes from "./ItemBar.module.css";

export default function ItemBar(props) {
  const { item } = props;
  console.log("itmebar" + item);
  return (
    <div className={classes.bar}>
      {item.album.images.length ? (
        <div className={classes.img}>
          <img
            loading="lazy"
            width={"100%"}
            src={item.album.images[1].url}
            alt=""
          />
        </div>
      ) : (
        <></>
      )}
      <div className={classes.detail}>
        <h1>{item.name}</h1>
        <p className={classes.artist}>
          {item.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
