'use client'

import {Song} from '@prisma/client';
import useOnPlay from '@/hooks/use-on-play';
import React, {useEffect} from 'react';
import usePlayer from '@/hooks/player/use-player';
import {Pause, Play} from 'lucide-react';
import {twMerge} from 'tailwind-merge';

interface MinimalistControlProps {
  song: Song;
  source: string;
  className?: string;
}

const MinimalistControl = ({
  song,
  source,
  className,
}: MinimalistControlProps) => {
  const onPlay = useOnPlay([song], source);
  const player = usePlayer();

  const Icon = player.isPlaying ? Pause : Play;

  return (
    <div className={className}>
      <div
        onClick={() => onPlay(song.id)}
        className={`transition duration-500 cursor-pointer rounded-full mx-10 mb-3 bg-green-500 p-4 right-5 hover:opacity-80 ${player.activeId ? 'hidden' : ''}`}
      >
        <Play size={20} className='text-black mx-auto'/>
      </div>
      <div
        onClick={player.handlePlay}
        className={`transition duration-500 cursor-pointer rounded-full mx-10 mb-3 bg-green-500 p-4 right-5 hover:opacity-80 ${player.activeId ?? 'hidden'}`}
      >
        <Icon size={20} className='text-black mx-auto'/>
      </div>
    </div>
  );
}

export default MinimalistControl;
