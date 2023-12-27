import {Playlist} from "@prisma/client";
import {db} from "@/lib/db";

const getPlaylist = async (playlistId: string): Promise<Playlist | null> => {
  const playlist: Playlist | null = await db.playlist.findUnique({
    where: {
      id: playlistId
    }
  });

  if (!playlist) return null;

  if (!playlist.imageUrl) playlist.imageUrl = '/songs/images/playlist.png';

  return playlist;
}

export default getPlaylist;
