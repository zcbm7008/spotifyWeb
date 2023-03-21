import { create } from "zustand";

const useStore = create((set, get) => ({
  likeMusicList: [],

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
}));

export default useStore;
