"use client";

import Image from "next/image";
import {Song, Playlist, PlaylistType} from '@prisma/client';
import React from "react";
import {BookHeadphones, Disc, LibraryBig} from "lucide-react";

interface MediaItemProps {
    data: Song | Playlist;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
    };

    // If song, then Disc.
    // If playlist, then LibraryBig
    // If album, then BookHeadphones
    const value: any = data;
    const Icon = value?.type === undefined
      ? Disc
      : value.type === PlaylistType.PLAYLIST
        ? LibraryBig
        : BookHeadphones;

    return (
        <div
            onClick={handleClick}
            className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'
        >
            <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
                <Image
                    sizes='100%'
                    fill
                    src={data.imageUrl || "/images/music-placeholder.png"}
                    alt="MediaItem"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <div className='w-full flex items-center gap-x-1'>
                    <Icon size={15} />
                    <p className="text-white truncate">{data.name}</p>
                </div>
                <p className="text-neutral-400 text-sm truncate">
                    By {data.artist}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;