import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
    bigPicture: boolean;
    toggleBigPicture: () => void;
}

const usePlayer = create<PlayerStore>((set, getState) => ({
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids: ids }),
    reset: () => set({ ids: [], activeId: undefined }),
    bigPicture: false,
    toggleBigPicture: () => set({ bigPicture: !getState().bigPicture })
}));

export default usePlayer;
