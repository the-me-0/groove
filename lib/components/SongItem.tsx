"use client";

import Image from "next/image";
import { Song } from "@prisma/client";
import React from "react";
import PlayButton from "@/lib/components/PlayButton";

interface SongItemProps {
    song: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
    song,
    onClick
}) => {
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
                <Image
                    priority={true}
                    sizes='100%'
                    className='object-cover'
                    src={song.imageUrl || '/images/music-placeholder.png'}
                    fill
                    alt='Image'
                />
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