import Sidebar from '@/lib/components/Sidebar';
import React from "react";
import getSongsByProfileId from "@/lib/actions/getSongsByProfileId";
import getPlaylistsByProfileId from "@/lib/actions/getPlaylistsByProfileId";

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
    </>
  )
}
