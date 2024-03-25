"use client";

import Image from "next/image";
import { Song } from '@prisma/client';
import React from "react";
import LikeButton from "@/lib/components/LikeButton";

interface LargeMediaItemProps {
  song: Song;
  hideLikeButton?: boolean
}

const LargeMediaItem: React.FC<LargeMediaItemProps> = ({
  song,
  hideLikeButton = false
}) => {
  return (
    <div
      className='flex flex-col items-center gap-y-3 w-full p-2 mb-4'
    >
      <div
        className='relative w-5/6 2xs:w-2/3 aspect-square max-w-screen-2xs'
      >
        <Image
          priority
          src={song.imageUrl || "/images/music-placeholder.png"}
          alt="LargeMediaItem"
          className="rounded-2xl"
          width={500} // Magic number, is formatted by parent div anyway
          height={500} // Same
        />
      </div>
      <div className='absolute rounded-2xl -z-20 mx-auto blur-3xl w-5/6 2xs:w-2/3 aspect-square max-w-screen-2xs'>
        <Image
          sizes='100%'
          fill
          src={song.imageUrl || "/images/music-placeholder.png"}
          alt="LargeMediaItemBlur"
          className="object-cover rounded-md"
        />
      </div>
      <div className='flex justify-between items-center w-[90vw] 2xs:w-[70vw] xs:w-[60vw] sm:w-[385px]'>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{song.name}</p>
          <p className="text-neutral-400 text-sm truncate">
            By {song.artist}
          </p>
        </div>
        {!hideLikeButton && (
          <LikeButton size={30} songId={song.id} />
        )}
      </div>

    </div>
  );
}

export default LargeMediaItem;
