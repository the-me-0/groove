import {Playlist} from "@prisma/client";
import {db} from "@/lib/db";

const getPlaylist = async (playlistId: string): Promise<Playlist | null> => {
  const playlist: Playlist = await db.playlist.findUnique({
    where: {
      id: playlistId
    }
  });

  if (!playlist.imageUrl) playlist.imageUrl = '/songs/images/playlist.png';

  return playlist;
}

export default getPlaylist;
