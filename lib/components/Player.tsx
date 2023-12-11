'use client';

import usePlayer from "@/hooks/use-player";
import useGetSongById from "@/hooks/use-get-song-by-id";
import PlayerContent from "@/lib/components/PlayerContent";
import {useState} from "react";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    if (!song || !player.activeId) {
        return null;
    }

    return (
        <div
            className={`fixed bottom-0 bg-black w-full py-2 h-[80px] px-4 transition-all ${ player.bigPicture && 'h-full'} md:h-[80px]`}
        >
            {/* PlayerContent has a key value as if the key changes, it re-renders */}
            <PlayerContent
                key={song.songUrl}
                song={song}
            />
        </div>
    );
}

export default Player;
