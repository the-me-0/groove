'use client';

import {Song} from "@prisma/client";
import React from "react";
import SongItem from "@/lib/components/SongItem";
import useOnPlay from "@/hooks/use-on-play";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs, 'recent uploads');

    if (songs.length === 0) {
        return (
            <div className='mt-4 text-neutral-400'>
                No songs available.
            </div>
        );
    }

    return (
        <div
            className={`
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
            `}
        >
            {songs.map((song) => (
                <SongItem
                    key={song.id}
                    onClick={(id) => onPlay(id)}
                    song={song}
                />
            ))}
        </div>
    );
}

export default PageContent;
