import SearchData from "./SearchData";
import useStore from "../store/MusicStore";

export const useAddLikesList = async (token, page) => {
  const { addMusicList } = useStore((state) => state);
  const data = await SearchData({
    token,
    url: "https://api.spotify.com/v1/me/tracks",
    params: {
      offset: page * 20,
      limit: 20,
    },
  });
  console.log(data);
  addMusicList("like", data.items);
};

export const useAddTopList = async (token, page) => {
  const { addArtistList } = useStore((state) => state);
  const data = await SearchData({
    token,
    url: "https://api.spotify.com/v1/me/top/artists",
  });
  console.log(data);
  addArtistList("Top", data.items);
};

export const useAddFeaturedList = async (token, page) => {
  const data = await SearchData({
    token,
    url: "https://api.spotify.com/v1/browse/featured-playlists",
  });
  console.log(data);
};
