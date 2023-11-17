import Header from '@/lib/components/Header';
import ListItem from '@/lib/components/ListItem';
import { UserButton } from "@clerk/nextjs";
import {initialProfile} from '@/lib/initial-profile';
import {ModeToggle} from '@/lib/components/mode-toggle';

export default async function Home() {
  const profile = await initialProfile();

  // console.log(profile);

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>
              Welcome back
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <ListItem
              image='/images/liked.png'
              name='Liked Songs'
              href='liked'
            />
          </div>
        </div>
      </Header>
        <p className='font-semibold text-5xl py-8 px-8'>
          This is a protected route.
        </p>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-white text-2xl font-semibold'>
            Newest songs
          </h1>
        </div>
        <div>
          List of Songs!
        </div>
      </div>
    </div>
  )
}
