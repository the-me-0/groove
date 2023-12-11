'use client';

import { Song } from "@prisma/client";
import React, { useEffect, useState } from "react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Slider } from "@/lib/shadcn-components/ui/slider";
import usePlayer from "@/hooks/use-player";
import useSound from 'use-sound';
import LargeMediaItem from "@/lib/components/LargeMediaItem";
import {ChevronDown, Pause, Play, Share2, SkipBack, SkipForward} from "lucide-react";
import toast from "react-hot-toast";

interface PlayerContentProps {
    song: Song
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? Pause : Play;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            // Go back to start of the queue
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            // Go to the last item of the queue
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong)
    }

    // As the useSound hook does not refresh if the song.songUrl is changed,
    //   we need the key attribute to be defined on songUrl on this PlayerContent component.
    const [play, { pause, sound }] = useSound(
        song.songUrl,
        {
            volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        // Play the song as soon as this component is mounted
        sound?.play();

        // Removes the song on unmount
        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            // TODO - make toggle remember what was the volume before mute (if there was one)
            setVolume(0);
        }
    }

    return (
        <div className={`flex ${player.bigPicture && 'flex-col'} md:grid md:grid-cols-3 h-full`}>

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
                    <MediaItem song={song} onClick={player.toggleBigPicture}/>
                )}
            </div>

            {/* Mobile controller */}
            <div className={`flex md:hidden col-auto w-fit justify-end items-center ${player.bigPicture && 'w-full justify-center'}`}>
                {!player.bigPicture && (
                    <LikeButton songId={song.id} className='p-3' size={32}/>
                )}
                {player.bigPicture && (
                    <SkipBack
                        size={30}
                        className='text-neutral-400 cursor-pointer hover:text-white transition mx-4'
                        onClick={onPlayPrevious}
                    />
                )}
                <div
                    onClick={handlePlay}
                    className='h-20 w-20 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-800/50 m-2'
                >
                    <Icon size={50} className='text-white p-1'/>
                </div>
                {player.bigPicture && (
                    <SkipForward
                        size={30}
                        className='text-neutral-400 cursor-pointer hover:text-white transition mx-4'
                        onClick={onPlayNext}
                    />
                )}
            </div>

            {/* Desktop controller */}
            <div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
                <SkipBack
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                    onClick={onPlayPrevious}
                />
                <div
                    onClick={handlePlay}
                    className='flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-800/50 p-1 cursor-pointer'
                >
                    <Icon size={50} className='text-white'/>
                </div>
                <SkipForward
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                    onClick={onPlayNext}
                />
            </div>

            <div className='hidden md:flex w-full justify-end pr-2'>
                <div className='flex items-center gap-x-2 w-[120px]'>
                    <VolumeIcon
                        onClick={toggleMute}
                        className='cursor-pointer'
                        size={34}
                    />
                    <Slider
                        defaultValue={[1]}
                        value={[volume]}
                        onValueChange={(value) => setVolume(value[0])}
                        max={1}
                        step={0.1}
                        aria-label='Volume'
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;
