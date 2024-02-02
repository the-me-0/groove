import Sidebar from '@/lib/components/Sidebar';
import React from "react";
import getSongsByProfileId from "@/lib/actions/getSongsByProfileId";
import Player from '@/lib/components/player/Player';
import getPlaylists from "@/lib/actions/getPlaylists";
import getPlaylistsByProfileId from "@/lib/actions/getPlaylistsByProfileId";

// export const revalidate = 0;

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByProfileId();
  const userPlaylists = await getPlaylistsByProfileId();

  return (
    <>
      <Sidebar songs={userSongs} playlists={userPlaylists}>
        {children}
      </Sidebar>
      <Player />
    </>
  )
}
