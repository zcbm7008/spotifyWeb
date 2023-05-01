import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/MusicStore";

function CallbackHelper() {
  const navigate = useNavigate();
  const { setUserToken } = useStore((state) => state);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const access_token = urlParams.get("access_token");
    const refresh_token = urlParams.get("refresh_token");
    window.localStorage.setItem("localtoken", access_token);
    window.localStorage.setItem("refreshtoken", refresh_token);
    setUserToken(access_token);
  }, []);

  return navigate("/browse");
}

export default CallbackHelper;
