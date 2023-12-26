'use client';

import { Song } from "@prisma/client";
import React from "react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import useOnPlay from "@/hooks/use-on-play";

interface LikedContentProps {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs, 'Favorites');

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No liked songs.
            </div>
        );
    }

    // TODO - removed a like ? update the player to remove the id

    return (
        <div className='flex flex-col gap-y-2 w-full p-6'>
            {songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default LikedContent;
