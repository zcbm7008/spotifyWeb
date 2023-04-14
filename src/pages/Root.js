import { Outlet } from "react-router-dom";
import SideBar from "../components/UI/SideBar";
import { useEffect, useState } from "react";
import {
  useAddLikesList,
  useAddFeaturedList,
  useAddTopList,
} from "../Util/UserDataFetcher";
import useStore from "../store/MusicStore";
import { useNavigate } from "react-router-dom";
function RootLayout() {
  const navigate = useNavigate();
  const { setUserToken } = useStore((state) => state);

  function Logout() {
    setUserToken("");
    window.localStorage.removeItem("localtoken");
    navigate("/");
  }

  const token = useStore((state) => state.userToken);
  const [showSide, setShowSide] = useState(true);

  const onCLickLikes = () => {
    navigate("likes");
  };

  useEffect(() => {
    onCLickLikes();
  }, []);

  return (
    <>
      <SideBar
        onClose={() => {
          setShowSide((prev) => !prev);
        }}
        showSide={showSide}
        onClickLikes={onCLickLikes}
        onClickFeatured={useAddFeaturedList.bind(null, token)}
        onClickTop={useAddTopList.bind(null, token)}
        onClickLogout={Logout}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
