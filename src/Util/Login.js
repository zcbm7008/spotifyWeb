import { useState, useEffect } from "react";
import useStore from "../store/MusicStore";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import MyButton from "../components/UI/MyButton";
function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { setUserToken } = useStore((state) => state);

  const onClickHandler = async (e) => {
    window.location.href = "http://localhost:8080/getcode";
  };

  useEffect(() => {
    let localtoken = window.localStorage.getItem("localtoken");

    if (!token && localtoken) {
      setUserToken(localtoken);
      navigate("/browse");
    }
  }, [token]);
  return (
    <div className={classes.center}>
      <div className={classes.title}>
        <h2>Spotify PlayLists</h2>
      </div>
      {/* {!token && (
        <div className={classes.phrase}>
          <h2>Please Login</h2>
        </div>
      )} */}

      {!token ? (
        <MyButton onClick={onClickHandler}>Login to spotify</MyButton>
      ) : (
        <button>already Logiined</button>
      )}
    </div>
  );
}

export default Login;
