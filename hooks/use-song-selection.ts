import { create } from "zustand";

interface SongSelectionStore {
  // Song(s)
  ids: string[];
  addId: (id: string) => void;
  removeId: (id: string) => void;
  reset: () => void;
}

const useSongSelection = create<SongSelectionStore>((set, getState) => ({
  // Song(s)
  ids: [],
  addId: (id: string) => set({ ids: [...getState().ids, id] }),
  removeId: (id: string) => {
    const actualIds = getState().ids;
    const idIndex = actualIds.indexOf(id);
    if (idIndex !== -1) {
      delete actualIds[idIndex];
      set({ ids: actualIds });
    }
  },
  reset: () => set({ ids: [] })
}));

export default useSongSelection;
