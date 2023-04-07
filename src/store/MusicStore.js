import { create } from "zustand";

const useStore = create((set, get) => ({
  likeMusicList: [],
  artistList: [],
  userToken: "",

  addMusicList: (action, music) => {
    if (action === "like") {
      set((state) => ({
        likeMusicList: [...state.likeMusicList, ...music],
      }));
    }
  },
  getMusic: (action) => {
    if (action === "like") {
      return get().likeMusicList;
    }
  },

  addArtistList: (action, artist) => {
    if (action === "Top") {
      set((state) => ({
        likeMusicList: [...state.artistList, ...artist],
      }));
    }
  },

  setUserToken: (token) => {
    set((state) => ({
      userToken: token,
    }));
  },
}));

export default useStore;
