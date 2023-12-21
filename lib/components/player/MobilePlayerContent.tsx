import React from "react";
import {ChevronDown, Pause, Play, Repeat2, Share2, SkipBack, SkipForward} from "lucide-react";
import usePlayer from "@/hooks/player/use-player";
import usePlayerControls from "@/hooks/player/use-player-controls";
import toast from "react-hot-toast";
import LargeMediaItem from "@/lib/components/player/LargeMediaItem";
import MediaItem from "@/lib/components/MediaItem";
import {Song} from "@prisma/client";
import LikeButton from "@/lib/components/LikeButton";
import ProgressBar from "@/lib/components/player/ProgressBar";

const MobilePlayerContent = ({
    song
}: { song: Song }) => {
    const player = usePlayer();
    const { toggleOnRepeat, onPlayPrevious, setSkip } = usePlayerControls();

    const Icon = player.isPlaying ? Pause : Play;

    return (
        <>
            {/* Mobile song display with BigPicture enabled */}
            <div
                className={`flex md:hidden w-full justify-start ${player.bigPicture && 'flex-col items-center justify-center'}`}
            >
                {player.bigPicture && (
                    <>
                        <div className='flex justify-between items-center py-4 px-2 xs:px-4 w-full'>
                            <ChevronDown size={40} className='cursor-pointer rounded-full hover:bg-gray-800/50' onClick={player.toggleBigPicture} />
                            <p className='flex-grow text-center text-sm uppercase line-clamp-2'>LISTENING FROM <span className='font-bold'>{player.source}</span></p>
                            <Share2 size={40} className='cursor-pointer rounded-xl hover:bg-gray-800/50 p-2' onClick={() => toast.error('Share is not available for now.')} />
                        </div>
                        <LargeMediaItem song={song}/>
                    </>
                )}
                {!player.bigPicture && (
                    <MediaItem data={song} onClick={player.toggleBigPicture}/>
                )}
            </div>

            {/* Mobile controller */}
            {player.bigPicture && (
                <ProgressBar sound={player.sound} duration={player.duration} className={'2xs:w-[368px] md:hidden'} />
            )}
            <div className={`flex md:hidden col-auto w-fit justify-end items-center ${player.bigPicture && 'w-full justify-center'}`}>
                {!player.bigPicture && (
                    <LikeButton songId={song.id} className='p-3' size={32}/>
                )}
                {player.bigPicture && (
                    <>
                        {/* TODO - add shuffle option */}
                        <SkipBack
                            size={30}
                            className='text-neutral-400 cursor-pointer hover:text-white transition mx-4'
                            onClick={onPlayPrevious}
                        />
                    </>
                )}
                <div
                    onClick={player.handlePlay}
                    className='h-20 w-20 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-800/50 m-2'
                >
                    <Icon size={50} className='text-white p-1'/>
                </div>
                {player.bigPicture && (
                    <>
                        <SkipForward
                            size={30}
                            className='text-neutral-400 cursor-pointer hover:text-white transition mx-4'
                            onClick={() => setSkip({ skip: true, forced: true })}
                        />
                        <Repeat2
                            size={30}
                            className={`text-neutral-400 cursor-pointer transition mx-4 ${player.onRepeat && 'text-spotify-green'}`}
                            onClick={toggleOnRepeat}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default MobilePlayerContent;
