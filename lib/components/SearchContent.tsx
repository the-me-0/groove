'use client';

import {Song} from "@prisma/client";
import React from "react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import useOnPlay from "@/hooks/use-on-play";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No songs found.
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-y-2 w-full px-6'>
            {songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem onClick={(id: string) => onPlay(id)} song={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default SearchContent;
