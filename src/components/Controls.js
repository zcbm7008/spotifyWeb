import classes from "./Controls.module.css";

const Controls = (props) => {
  return (
    <button onClick={props.controlMusic} className={classes.button}>
      {props.isPlaying ? (
        <i className="pause icon" />
      ) : (
        <i className="play icon" />
      )}
    </button>
  );
};
export default Controls;
