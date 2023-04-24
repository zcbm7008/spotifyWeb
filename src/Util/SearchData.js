import axios from "axios";
import Login from "./Login";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

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
  } catch (error) {
    console.error("fetching error");
    refreshAuthToken(token);
    console.log(error);
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

export async function refreshAuthToken(token) {
  let refreshtoken = window.localStorage.getItem("refreshtoken");
  const url = "https://accounts.spotify.com/api/token";
  const ah = btoa(CLIENT_ID + ":" + CLIENT_SECRET);
  let options = {
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${ah}`,
    },
    params: {
      grant_type: "refresh_token",
      refresh_token: refreshtoken,
    },
  };
  axios(options)
    .then((resp) => {
      console.log("resp", resp.data);
    })
    .catch((err) => {
      console.log("ERR GETTING SPOTIFY ACCESS TOKEN", err);
    });
}

export default SearchData;
