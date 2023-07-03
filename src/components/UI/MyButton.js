import classes from "./MyButton.module.css";

function MyButton(props) {
  const buttonStyle = {
    width: props.width,
    marginTop: props.marginTop,
  };
  return (
    <button className={classes.btn} style={buttonStyle} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default MyButton;
