import { create } from "zustand";

const useStore = create((set, get) => ({
  likeMusicList: [],
  artistList: [],

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
}));

export default useStore;
