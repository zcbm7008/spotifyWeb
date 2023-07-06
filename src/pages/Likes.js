import LikeContents from "../components/LikeContents";
import classes from "./Browse.module.scss";
function LikesPage() {
  return (
    <div className={classes.list_contents}>
      <LikeContents />
    </div>
  );
}

export default LikesPage;
