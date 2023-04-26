import { useState, useEffect } from "react";
import useStore from "../store/MusicStore";
import { useNavigate } from "react-router-dom";

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
    <>
      <h2>Login</h2>
      {!token && <h2>Please Login</h2>}

      {!token ? (
        <button onClick={onClickHandler}>Login to spotify</button>
      ) : (
        <button>already Logiined</button>
      )}
    </>
  );
}

export default Login;
