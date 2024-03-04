"use client";

import Image from "next/image";
import { Song } from "@prisma/client";
import React from "react";
import PlayButton from "@/lib/components/PlayButton";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/lib/shadcn-components/ui/context-menu';
import toast from 'react-hot-toast';
import {createSongShareLink} from '@/lib/actions/shareLink';

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  onClick
}) => {
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

  return (
    <div
      onClick={() => onClick(song.id)}
      className={`
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3
    `}
    >
      <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
        <ContextMenu>
          <ContextMenuTrigger>
            <Image
              priority={true}
              sizes='100%'
              className='object-cover'
              src={song.imageUrl || '/images/music-placeholder.png'}
              fill
              alt='Image'
            />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => toast.error('Not available yet.')}
          >
            Play Next
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleShare()}
          >
            Share
          </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='font-semibold truncate w-full'>
          {song.name}
        </p>
        <p className='text-neutral-400 text-sm pb-4 w-full truncate'>
          By {song.artist}
        </p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  );
}

export default SongItem;