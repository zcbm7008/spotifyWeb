import useStore from "../../store/MusicStore";
import Column from "./Column";
import React from "react";
function CustomPlaylistLogic(props) {
  // const userToken = useStore((state) => state.userToken);
  const customMusicPlayList = useStore((state) => state.customMusicPlayList);
  // const { addMusicList } = useStore((state) => state);
  // useEffect(() => {
  //   async function getData() {
  //     const playlist_id = "51bFi9AlJXrz2hDfZOnqXB";
  //     const data = await SearchData({
  //       token: userToken,
  //       url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
  //     });
  //     addMusicList("custom", data.items);
  //   }
  //   getData();
  // }, []);
  console.log("customplaylist Rendered");

  return <Column key="c_1" id="c_1" tasks={customMusicPlayList} />;
}

export default React.memo(CustomPlaylistLogic);
