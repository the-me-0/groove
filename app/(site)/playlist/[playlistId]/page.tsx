import Header from "@/lib/components/Header";
import React from "react";
import getPlaylist from "@/lib/actions/getPlaylist";
import getSongsByPlaylistId from "@/lib/actions/getSongsByPlaylistId";
import PlaylistContent from "@/lib/components/playlists/PlaylistContent";
import {redirect} from "next/navigation";
import PlaylistCover from "@/lib/components/playlists/PlaylistCover";

export const revalidate = 0;

const Playlist = async (
  { params }: { params: { playlistId: string } }
) => {
  const playlist = await getPlaylist(params.playlistId);
  if (!playlist) {
    return redirect('/');
  }

  const songs = await getSongsByPlaylistId(params.playlistId);

  return (
    <div
      className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'
    >
      <Header>
        <PlaylistCover playlist={playlist} />
      </Header>
      <PlaylistContent playlist={playlist} songs={songs} />
    </div>
  );
}

export default Playlist;
