import Sidebar from '@/lib/components/Sidebar';
import React from "react";
import getSongsByProfileId from "@/lib/actions/getSongsByProfileId";
import Player from '@/lib/components/Player';

export const revalidate = 0;

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByProfileId();

  return (
    <>
      <Sidebar songs={userSongs}>
        {children}
      </Sidebar>
      <Player />
    </>
  )
}
