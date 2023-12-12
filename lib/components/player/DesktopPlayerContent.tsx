import {Song} from "@prisma/client";
import usePlayer from "@/hooks/player/use-player";
import usePlayerControls from "@/hooks/player/use-player-controls";
import {Pause, Play, SkipBack, SkipForward} from "lucide-react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import Volume from "@/lib/components/player/Volume";
import React from "react";

const DesktopPlayerContent = ({
    song
}: { song: Song }) => {
    const player = usePlayer();
    const { onPlayPrevious, setSkip} = usePlayerControls();

    const Icon = player.isPlaying ? Pause : Play;

    return (
        <>
            {/* Desktop song display */}
            <div
                className='hidden md:flex w-full justify-start'
            >
                <div className='flex items-center gap-x-4'>
                    <MediaItem song={song} onClick={() => {
                    }}/>
                    <LikeButton songId={song.id} className={'hidden md:block'}/>
                </div>
            </div>

            {/* Desktop controller */}
            <div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
                <SkipBack
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                    onClick={onPlayPrevious}
                />
                <div
                    onClick={player.handlePlay}
                    className='flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-800/50 p-1 cursor-pointer'
                >
                    <Icon size={50} className='text-white'/>
                </div>
                <SkipForward
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                    onClick={() => setSkip({ skip: true, forced: true })}
                />
            </div>

            <div className='hidden md:flex w-full justify-end pr-2'>
                <Volume />
            </div>
        </>
    );
}

export default DesktopPlayerContent;
