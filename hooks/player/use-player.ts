import {create} from "zustand";
import {Song} from '@prisma/client';

interface PlayerStore {
    // Song(s)
    songs: Song[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (songs: Song[], source: string) => void;
    reset: () => void;

    // Player display related
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    onRepeat: boolean;
    setOnRepeat: (onRepeat: boolean) => void;
    source: string; // Place where the player is taking musics from (favorites, playlist name)
    bigPicture: boolean;
    toggleBigPicture: () => void;

    // Other values
    volume: number;
    setVolume: (volume: number) => void;
}

const usePlayer = create<PlayerStore>((set, getState) => ({
    // Song(s)
    songs: [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (songs: Song[], source: string) => set({ songs: songs, source: source }),
    reset: () => set({ songs: [], activeId: undefined }),

    // Player display related
    isPlaying: false,
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
    onRepeat: false,
    setOnRepeat: (onRepeat: boolean) => set({ onRepeat: onRepeat }),
    source: '',
    bigPicture: false,
    toggleBigPicture: () => set({ bigPicture: !getState().bigPicture }),

    // Other values
    volume: 1,
    setVolume: (volume: number) => set({ volume: volume }),
}));

export default usePlayer;
