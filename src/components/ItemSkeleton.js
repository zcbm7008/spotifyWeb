import classes from "./ItemSkeleton.module.scss";

function ItemSkeleton() {
  return (
    <div className={classes.card}>
      <div>
        <div className={classes.image} />
      </div>
      <div className={classes.description}>
        <p className={classes.name} />
        <p className={classes.artist} />
      </div>
    </div>
  );
}
export default ItemSkeleton;
