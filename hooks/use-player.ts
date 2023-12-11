import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    source: string;
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[], source: string) => void;
    reset: () => void;
    bigPicture: boolean;
    toggleBigPicture: () => void;
}

const usePlayer = create<PlayerStore>((set, getState) => ({
    ids: [],
    source: '',
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[], source: string) => set({ ids: ids, source: source }),
    reset: () => set({ ids: [], activeId: undefined }),
    bigPicture: false,
    toggleBigPicture: () => set({ bigPicture: !getState().bigPicture })
}));

export default usePlayer;
