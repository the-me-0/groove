import Header from '@/lib/components/Header';
import ListItem from '@/lib/components/ListItem';
import React from "react";
import getSongs from "@/lib/actions/getSongs";
import PageContent from '../../lib/components/PageContent';
import getPlaylists from '@/lib/actions/getPlaylists';
import {currentProfile} from '@/lib/current-profile';

// prevents this page to be cached, in order for it to always be up-to-date
// export const revalidate = 0;

export default async function Home() {
  const profile = await currentProfile();
  const songs = await getSongs();
  const playlists = await getPlaylists();

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>
              Welcome back {profile.name}!
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <ListItem
              image='/api/assets/images/liked.png'
              name='Liked Songs'
              href='liked'
            />
            {playlists.map((playlist) => (
              <ListItem key={playlist.id} image={playlist.imageUrl} name={playlist.name} href={`/playlist/${playlist.id}`} />
            ))}
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-white text-2xl font-semibold'>
            Newest songs
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
