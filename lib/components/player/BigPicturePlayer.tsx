'use client';

import React from 'react';
import usePlayer from '@/hooks/player/use-player';
import {ChevronDown, Pause, Play, Repeat2, Share2, SkipBack, SkipForward} from 'lucide-react';
import LargeMediaItem from '@/lib/components/player/LargeMediaItem';
import {Song} from '@prisma/client';
import {createSongShareLink} from '@/lib/actions/shareLink';
import toast from 'react-hot-toast';
import {ProgressBar} from '@/lib/components/player/ProgressBar';
import {usePlayerControls} from '@/hooks/player/use-player-new-controls';

interface BigPicturePlayerProps {
  audioPlayer: HTMLAudioElement;
  song: Song;
  hideLikeButton: boolean;
}

export const BigPicturePlayer: React.FC<BigPicturePlayerProps> = ({
  audioPlayer,
  song,
  hideLikeButton,
}) => {
  const player = usePlayer();
  const { onPlay, onPlayPrevious, onPlayNext, onLoop } = usePlayerControls(audioPlayer);

  const handleShare = () => {
    createSongShareLink(song.id)
      .then((shareLink) => {
        navigator.clipboard.writeText(window.location.toString() + `shared/${shareLink.value}`)
          .then((r) => toast.success('Share link copied.'));
      })
      .catch((error) => {
        console.log('Failed to create a share link for a song.');
        toast.error('Try again later.')
      })
  }

  const Icon = player.isPlaying ? Pause : Play;

  if (!player.bigPicture) return null;

  return (
    <div
      className='flex w-full h-full flex-col items-center justify-start'
    >
      <div className='flex justify-between items-center py-4 px-2 xs:px-4 w-full'>
        <ChevronDown size={40} className='cursor-pointer rounded-full hover:bg-gray-800/50'
                     onClick={player.toggleBigPicture}/>
        <p className='flex-grow text-center text-sm uppercase line-clamp-2'>LISTENING FROM <span
          className='font-bold'>{player.source}</span></p>
        <Share2 size={40} className='cursor-pointer rounded-xl hover:bg-gray-800/50 p-2'
                onClick={() => handleShare()}/>
      </div>
      <LargeMediaItem song={song} hideLikeButton={hideLikeButton} />
      <ProgressBar audioPlayer={audioPlayer} className='max-w-[420px]' />
      <div className='flex md:hidden col-auto items-center w-full justify-center'>
        <SkipBack
          size={30}
          className='text-neutral-400 cursor-pointer hover:text-white transition mx-4'
          onClick={onPlayPrevious}
        />
        <div
          onClick={onPlay}
          className='h-20 w-20 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-800/50 m-2'
        >
          <Icon size={50} className='text-white p-1'/>
        </div>
        <>
          <SkipForward
            size={30}
            className='text-neutral-400 cursor-pointer hover:text-white transition mx-4'
            onClick={onPlayNext}
          />
          <Repeat2
            size={30}
            className={`text-neutral-400 cursor-pointer transition mx-4 ${player.onRepeat && 'text-spotify-green'}`}
            onClick={onLoop}
          />
        </>
      </div>
    </div>
  )
}
