import axios from "axios";

const SearchData = async ({ url, params = null, token = null }) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const { data } = await axios.get(url, {
      headers,
      params,
    });
    console.log(data);
    return data;
  } catch {
    console.error("fetching error");
  }
};

export const createEmptyPlayList = async (token, name = "My PlayLists") => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const url = "https://api.spotify.com/v1/me/playlists";
  try {
    const { data } = await axios.post(
      url,
      {
        name: name,
        description: "created by app",
        public: true,
      },
      { headers }
    );
    console.log(data);
    return data;
  } catch {
    console.error("creating PlayList error");
  }
};

export async function createPlayList(tracksUri, token, name = "My PlayList") {
  return await createEmptyPlayList(token, name).then(async (playlist) => {
    const url = `https://api.spotify.com/v1/playlists/${
      playlist.id
    }/tracks?uris=${tracksUri.join(",")}`;

    const headers = {
      authorization: `Bearer ${token}`,
    };

    console.log(headers);

    const res = await axios.post(url, {}, { headers });
    console.log(res);
    return playlist;
  });
}

export default SearchData;
