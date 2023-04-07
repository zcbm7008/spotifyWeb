import { Outlet } from "react-router-dom";
import SideBar from "../components/UI/SideBar";
import { useState } from "react";
import {
  useAddLikesList,
  useAddFeaturedList,
  useAddTopList,
} from "../Util/UserDataFetcher";
import useStore from "../store/MusicStore";

function RootLayout() {
  const token = useStore((state) => state.userToken);
  const [showSide, setShowSide] = useState(true);
  return (
    <>
      <SideBar
        onClose={() => {
          setShowSide((prev) => !prev);
        }}
        showSide={showSide}
        onClickLikes={useAddLikesList.bind(null, token)}
        onClickFeatured={useAddFeaturedList.bind(null, token)}
        onClickTop={useAddTopList.bind(null, token)}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
