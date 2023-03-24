import axios from "axios";

const searchPlayLists = async ({ token, url, params }) => {
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

export default searchPlayLists;
