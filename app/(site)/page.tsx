import Header from '@/lib/components/Header';
import ListItem from '@/lib/components/ListItem';
import {initialProfile} from '@/lib/initial-profile';
import React from "react";
import getSongs from "@/lib/actions/getSongs";
import PageContent from '../../lib/components/PageContent';

// prevents this page to be cached, in order for it to always be up-to-date
export const revalidate = 0;

export default async function Home() {
  await initialProfile(); // We don't need the returned value there, but we still need to generate an account for new users
  const songs = await getSongs();

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>
              Welcome back
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <ListItem
              image='/songs/images/liked.png'
              name='Liked Songs'
              href='liked'
            />
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
