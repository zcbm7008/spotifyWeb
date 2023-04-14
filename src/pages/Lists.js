import CustomPlayLists from "../components/CustomPlayLists";
import { useEffect } from "react";
import SearchData from "../Util/SearchData";
import useStore from "../store/MusicStore";

function ListsLayout() {
  const userToken = useStore((state) => state.userToken);
  const { addMusicList } = useStore((state) => state);
  useEffect(() => {
    async function getData() {
      const playlist_id = "51bFi9AlJXrz2hDfZOnqXB";
      const data = await SearchData({
        token: userToken,
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      });
      console.log("custom", data);
      addMusicList("custom", data.items);
    }

    getData();
  }, []);

  return <CustomPlayLists />;
}

export default ListsLayout;
