import {Playlist, Song} from "@prisma/client";
import { db } from "@/lib/db";

const getSongsByPlaylistId = async (playlistId: string): Promise<Song[]> => {
  const playlist: Playlist & { songs: Song[] } | null = await db.playlist.findUnique({
    where: {
      id: playlistId
    },
    include: {
      songs: true
    }
  });

  // We usually already have checked if the playlist exists but just in case
  if (!playlist) return [];

  return playlist.songs;
}

export default getSongsByPlaylistId;
