import { create } from "zustand";
import { Wave as WaveObject } from "@foobar404/wave";

type playHandler = () => void;

interface PlayerStore {
    // Song(s)
    ids: string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[], source: string) => void;
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

    wave: WaveObject | null;
    canvas: HTMLCanvasElement | null;
    setWave: (wave: WaveObject, canvas: HTMLCanvasElement) => void;

    // Handlers
    handlePlay: playHandler;
    setHandlePlay: (handlePlay: playHandler) => void;
}

const usePlayer = create<PlayerStore>((set, getState) => ({
    // Song(s)
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[], source: string) => set({ ids: ids, source: source }),
    reset: () => set({ ids: [], activeId: undefined }),

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
    wave: null,
    canvas: null,
    setWave: (wave: WaveObject, canvas: HTMLCanvasElement) => {
        set({ wave: wave });
        set({ canvas: canvas });
    },

    // Handlers
    handlePlay: () => { console.log('init handlePlay called') },
    setHandlePlay: (handlePlay: playHandler) => set({ handlePlay: handlePlay }),
}));

export default usePlayer;
