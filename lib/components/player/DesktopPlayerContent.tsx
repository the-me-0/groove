import {Song} from "@prisma/client";
import usePlayer from "@/hooks/player/use-player";
import usePlayerControls from "@/hooks/player/use-player-controls";
import {Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward} from "lucide-react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import Volume from "@/lib/components/player/Volume";
import React from "react";
import toast from "react-hot-toast";
import ProgressBar from "@/lib/components/player/ProgressBar";

const DesktopPlayerContent = ({
    song
}: { song: Song }) => {
    const player = usePlayer();
    const { onPlayPrevious, toggleOnRepeat, setSkip} = usePlayerControls();

    const Icon = player.isPlaying ? Pause : Play;

    return (
        <>
            {/* Desktop song display */}
            <div
                className='hidden md:flex w-fit justify-start'
            >
                <div className='flex items-center gap-x-4 w-40 lg:w-full'>
                    <MediaItem data={song} onClick={() => {}}/>
                    <LikeButton songId={song.id} className={'hidden md:block'}/>
                </div>
            </div>

            {/* Desktop controller */}
            <div className='hidden md:flex flex-col h-full w-full'>
                <div className='h-full mx-auto flex justify-center items-center w-full max-w-[722px] gap-x-6'>
                    <Shuffle
                        size={26}
                        className={`text-neutral-400 cursor-pointer transition mx-4 ${false && 'text-spotify-green'}`}
                        onClick={() => toast.error('Shuffle is not yet available')}
                    />
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
                        onClick={() => setSkip({skip: true, forced: true})}
                    />
                    <Repeat2
                        size={30}
                        className={`text-neutral-400 cursor-pointer transition mx-4 ${player.onRepeat && 'text-spotify-green'}`}
                        onClick={toggleOnRepeat}
                    />
                </div>
                <ProgressBar sound={player.sound} duration={player.duration} className='w-80 lg:w-full max-w-xl mx-auto' />
            </div>

            <div className='hidden md:flex min-w-fit justify-end pr-2'>
                <Volume/>
            </div>
        </>
    );
}

export default DesktopPlayerContent;
