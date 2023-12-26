import {Playlist, Song, SongsOnPlaylists} from "@prisma/client";
import {db} from "@/lib/db";

interface SongsOnPlaylistsWithSong extends SongsOnPlaylists {
  song: Song
}

const getSongsByPlaylistId = async (playlistId: string): Promise<Song[]> => {
  const playlist: Playlist & { songsOnPlaylists: SongsOnPlaylistsWithSong[] } | null = await db.playlist.findUnique({
    where: {
      id: playlistId
    },
    include: {
      songsOnPlaylists: {
        include: {
          song: true
        }
      }
    }
  });

  // We usually already have checked if the playlist exists but just in case
  if (!playlist) return [];

  return playlist.songsOnPlaylists.map(
    (songsOnPlaylist) => ({
      ...songsOnPlaylist.song,
      assignedAt: songsOnPlaylist.assignedAt,
    })
  );
}

export default getSongsByPlaylistId;
