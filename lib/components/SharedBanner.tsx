'use client'

import {useRouter} from 'next/navigation';
import {HiHome} from 'react-icons/hi';
import React from 'react';
import {Profile} from '@prisma/client';
import TimeLeft from '@/lib/components/timer/TimeLeft';

interface SharedBannerInterface {
  originDate: Date;
  durationInHours: number;
}

const SharedBanner = ({
  originDate,
  durationInHours
}: SharedBannerInterface) => {
  const router = useRouter();

  return (
    <div className='grid grid-cols-2 2xs:flex px-5 gap-6 items-center text-2xl justify-between'>
      <button
        onClick={() => router.push('/')}
        className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
      >
        <HiHome className='text-black' size={20}/>
      </button>
      <h1 className='md:mr-[55%] text-3xl md:text-4xl'>Groove</h1>
      <div className='flex flex-col col-span-2 mx-5 2xs:mx-auto'>
        <p className='text-sm text-center text-neutral-400 font-semibold'>This link expires in</p>
        <TimeLeft originDate={originDate} durationInHours={durationInHours}/>
      </div>
    </div>
  );
}

export default SharedBanner;
