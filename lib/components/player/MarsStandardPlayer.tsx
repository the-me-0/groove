import React from 'react';
import MediaItem from '@/lib/components/MediaItem';
import LikeButton from '@/lib/components/LikeButton';
import { Song } from '@prisma/client';
import { Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { usePlayerControls } from '@/hooks/player/use-player-controls';
import usePlayer from '@/hooks/player/use-player';
import { getBreakpointValue } from '@/lib/getBreakpointValue';
import {MarsProgressBar} from '@/lib/components/player/MarsProgressBar';
import {MarsVolumeBar} from '@/lib/components/player/MarsVolumeBar';

interface MarsStandardPlayerProps {
  audioPlayer: HTMLAudioElement;
  song: Song;
  hideLikeButton: boolean;
}

export const MarsStandardPlayer: React.FC<MarsStandardPlayerProps> = ({
  audioPlayer,
  song,
  hideLikeButton,
}) => {
  const { onPlay, onPlayPrevious, onPlayNext, onLoop } = usePlayerControls(audioPlayer);
  const player = usePlayer();

  const Icon = player.isPlaying ? Pause : Play;

  if (player.bigPicture) return null;

  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='h-full flex justify-center items-center w-fit mr-0 max-w-[722px] gap-x-6'>
          <SkipBack
            size={30}
            className='hidden sm:inline text-neutral-400 cursor-pointer hover:text-white transition'
            onClick={onPlayPrevious}
          />
          <div
            onClick={onPlay}
            className='flex items-center h-12 w-12 rounded-full hover:bg-gray-800/50 p-1 cursor-pointer'
          >
            <Icon size={50} className='text-white'/>
          </div>
          <SkipForward
            size={30}
            className='hidden sm:inline text-neutral-400 cursor-pointer hover:text-white transition'
            onClick={onPlayNext}
          />
          <Repeat2
            size={30}
            className={`hidden sm:inline text-neutral-400 cursor-pointer transition mx-4 ${player.onRepeat && 'text-spotify-green'}`}
            onClick={onLoop}
          />
        </div>
      </div>

      <MarsProgressBar audioPlayer={audioPlayer} />

      <div
        className='flex h-full items-center gap-x-4 mr-4 w-1/5'
      >
        <div className='w-5/6'>
          <MediaItem data={song} onClick={() => {
            const mdSize = getBreakpointValue('md');
            if (window.innerWidth < mdSize) {
              player.toggleBigPicture();
            }
          }}/>
        </div>
        {!hideLikeButton && (
          <div className='w-1/6'><LikeButton songId={song.id} className='hidden md:inline'/></div>
        )}
      </div>

      <div className='hidden md:flex min-w-fit justify-end items-center pr-2'>
        <MarsVolumeBar audioPlayer={audioPlayer}/>
      </div>
    </>
  )
}
