import { create } from "zustand";
import {Song} from "@prisma/client";

interface SongSelectionStore {
  // Song(s)
  songs: Song[];
  addSong: (song: Song) => void;
  removeSong: (idToRemove: string) => void;
  setSongs: (songs: Song[]) => void;
  reset: () => void;
}

const useSongSelection = create<SongSelectionStore>((set, getState) => ({
  // Song(s)
  songs: [],
  addSong: (song: Song) => set({ songs: [...getState().songs, song] }),
  removeSong: (idToRemove: string) => {
    const actualSongs = getState().songs;
    set({ songs: actualSongs.filter((song) => song.id !== idToRemove) }); // We keep all elements that are not the given id
  },
  setSongs: (songs: Song[]) => set({ songs: songs }),
  reset: () => set({ songs: [] })
}));

export default useSongSelection;
