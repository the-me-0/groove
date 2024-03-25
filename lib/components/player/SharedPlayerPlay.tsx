'use client';

import usePlayer from '@/hooks/player/use-player';
import {Song, SongShareLink} from "@prisma/client";
import React, {useEffect} from 'react';
import {Play} from 'lucide-react';
import useOnPlay from '@/hooks/use-on-play';

interface SharedPlayerPlayProps {
  songShared: SongShareLink & { song: Song };
}

export const SharedPlayerPlay = ({
  songShared
}: SharedPlayerPlayProps) => {
  const player = usePlayer();
  const onPlay = useOnPlay([songShared.song], 'Shared');

  // Only show the play button if the player is not active
  //     we are forced to have an initial button as autoplay is forbidden
  if (player.activeId) return null;

  return (
    <div className='w-5/6 2xl:w-2/3 sm:w-1/3 mx-auto'>
      <div
        onClick={() => onPlay(songShared.song.id)}
        className='cursor-pointer rounded-full mx-10 mb-3 bg-green-500 p-4 right-5 hover:opacity-80'
      >
        <Play size={20} className='text-black mx-auto'/>
      </div>
    </div>
  );
}
