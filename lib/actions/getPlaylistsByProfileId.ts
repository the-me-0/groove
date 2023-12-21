import {Playlist} from "@prisma/client";
import {db} from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";

const getPlaylistsByProfileId = async (): Promise<Playlist[]> => {
  const profile = await currentProfile();

  if (!profile) return [];

  const playlists = await db.playlist.findMany({
    where: {
      profileId: profile.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedPlaylists: Playlist[] = playlists.map((playlist: Playlist) => {
    if (!playlist.imageUrl) playlist.imageUrl = '/songs/images/playlist.png';
    return playlist;
  })

  return formattedPlaylists || [];
}

export default getPlaylistsByProfileId;
