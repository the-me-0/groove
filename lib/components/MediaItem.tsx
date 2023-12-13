"use client";

import Image from "next/image";
import { Song } from '@prisma/client';
import React from "react";

interface MediaItemProps {
    song: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    song,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick(song.id);
        }

        // set the music to this one (player)
    };

    return (
        <div
            onClick={handleClick}
            className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'
        >
            <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
                <Image
                    sizes='100%'
                    fill
                    src={song.imageUrl || "/images/music-placeholder.png"}
                    alt="MediaItem"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{song.name}</p>
                <p className="text-neutral-400 text-sm truncate">
                    By {song.artist}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;