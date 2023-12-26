"use client";

import Image from "next/image";
import { Song } from '@prisma/client';
import React from "react";
import LikeButton from "@/lib/components/LikeButton";

interface LargeMediaItemProps {
    song: Song;
}

const LargeMediaItem: React.FC<LargeMediaItemProps> = ({
    song
}) => {
    return (
        <div
            className='flex flex-col items-center gap-y-3 w-full h-full hover:bg-gray-800/50 p-2 mb-4'
        >
            <div
                className='relative rounded-md overflow-hidden mt-[10vw] min-h-[90vw] min-w-[90vw] 2xs:min-h-[70vw] 2xs:min-w-[70vw] xs:min-h-[60vw] xs:min-w-[60vw] xs:mt-[5vw] sm:min-h-[385px] sm:min-w-[385px] sm:mt-0'
            >
                <Image
                    sizes='100%'
                    fill
                    src={song.imageUrl || "/images/music-placeholder.png"}
                    alt="LargeMediaItem"
                    className="object-cover"
                />
            </div>
            {/* Image blur, fade */}
            <div className='absolute rounded-full blur-3xl -z-20 inset-0 m-[15vw]'>
                <Image
                    sizes='100%'
                    fill
                    src={song.imageUrl || "/images/music-placeholder.png"}
                    alt="LargeMediaItemBlur"
                    className="object-cover"
                />
            </div>
            <div className='flex justify-between items-center w-[90vw] 2xs:w-[70vw] xs:w-[60vw] sm:w-[385px]'>
                <div className="flex flex-col gap-y-1 overflow-hidden">
                    <p className="text-white truncate">{song.name}</p>
                    <p className="text-neutral-400 text-sm truncate">
                        By {song.artist}
                    </p>
                </div>
                <LikeButton size={30} songId={song.id} />
            </div>

        </div>
    );
}

export default LargeMediaItem;