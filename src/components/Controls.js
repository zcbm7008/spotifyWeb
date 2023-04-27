import classes from "./Controls.module.css";

const Controls = (props) => {
  console.log(props.isPlaying);
  return (
    <button onClick={props.controlMusic} className={classes.button}>
      {props.isPlaying ? "■" : "▶"}
    </button>
  );
};
export default Controls;
