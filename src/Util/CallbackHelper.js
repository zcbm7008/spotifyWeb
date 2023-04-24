import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/MusicStore";
import { useState } from "react";

function CallbackHelper() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { setUserToken } = useStore((state) => state);

  useEffect(() => {
    const hash = window.location.hash;
    let localtoken = window.localStorage.getItem("localtoken");
    let refreshtoken = window.localStorage.getItem("refreshtoken");
    if (!token && !localtoken && hash) {
      let urlParams = new URLSearchParams(
        window.location.hash.replace("#", "?")
      );
      localtoken = urlParams.get("access_token");
      refreshtoken = urlParams.get("refresh_token");
      window.location.hash = "";
      window.localStorage.setItem("localtoken", localtoken);
      window.localStorage.setItem("refreshtoken", refreshtoken);
      setUserToken(localtoken);
    }

    if (!token && localtoken) {
      setUserToken(localtoken);
    }

    // if (token) useAddLikesList(token);
  }, [token]);

  return navigate("/browse");
}

export default CallbackHelper;
