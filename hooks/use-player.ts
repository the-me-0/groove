import { create } from "zustand";
import {number} from "prop-types";

interface PlayerStore {
    ids: string[];
    source: string;
    fadeTime: number;
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[], source: string) => void;
    reset: () => void;
    bigPicture: boolean;
    toggleBigPicture: () => void;
    setFadeTime: (value: number) => void;
}

const usePlayer = create<PlayerStore>((set, getState) => ({
    ids: [],
    source: '',
    fadeTime: 0,
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[], source: string) => set({ ids: ids, source: source }),
    reset: () => set({ ids: [], activeId: undefined }),
    bigPicture: false,
    toggleBigPicture: () => set({ bigPicture: !getState().bigPicture }),
    setFadeTime: (fadeTime: number) => set({ fadeTime: fadeTime })
}));

export default usePlayer;
