import React from 'react';
import MediaItem from '@/lib/components/MediaItem';
import LikeButton from '@/lib/components/LikeButton';
import { Song } from '@prisma/client';
import { Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Maximize2 } from 'lucide-react';
import { ProgressBar } from '@/lib/components/new-player/ProgressBar';
import { VolumeBar } from '@/lib/components/new-player/VolumeBar';
import { usePlayerControls } from '@/hooks/player/use-player-new-controls';
import usePlayer from '@/hooks/player/use-player';
import { getBreakpointValue } from '@/lib/getBreakpointValue';

interface StandardPlayerProps {
  audioPlayer: HTMLAudioElement;
  song: Song;
}

export const StandardPlayer: React.FC<StandardPlayerProps> = ({
  audioPlayer,
  song,
}) => {
  const { onPlay, onPlayPrevious, onPlayNext, onLoop } = usePlayerControls(audioPlayer);
  const player = usePlayer();

  const Icon = player.isPlaying ? Pause : Play;

  if (player.bigPicture) return null;

  return (
    <>
      <div
        className='flex w-fit justify-start'
      >
        <div className='flex items-center gap-x-4 w-40 2xs:w-60 md:w-40 lg:w-72'>
          <MediaItem data={song} onClick={() => {
            const mdSize = getBreakpointValue('md');
            if (window.innerWidth < mdSize) {
              player.toggleBigPicture();
            }
          }}/>
          <LikeButton songId={song.id} className={'hidden md:block'}/>
        </div>
      </div>

      {/* Desktop controller */}
      <div className='flex flex-col h-full w-full items-end md:items-center'>
        <div className='h-full flex justify-center items-center w-fit mr-0 sm:w-full max-w-[722px] gap-x-6'>
          <Shuffle
            size={26}
            className={`hidden sm:inline text-neutral-400 cursor-pointer transition mx-4 ${false && 'text-spotify-green'}`}
            // onClick={() => toast.error('Shuffle is not yet available')}
          />
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
        <ProgressBar audioPlayer={audioPlayer} className='hidden sm:flex w-80 xl:w-full max-w-xl mx-auto' />
      </div>

      <div className='hidden md:flex min-w-fit justify-end items-center pr-2'>
        <VolumeBar audioPlayer={audioPlayer} />
        <Maximize2
          size={26}
          className='hidden md:inline text-neutral-400 cursor-pointer mx-4 hover:text-white'
          onClick={player.toggleBigPicture}
        />
      </div>
    </>
  )
}
