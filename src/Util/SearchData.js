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

export default SearchData;
