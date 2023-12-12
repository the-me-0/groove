'use client';

import { Song } from "@prisma/client";
import React, { useEffect, useState } from "react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import { Slider } from "@/lib/shadcn-components/ui/slider";
import usePlayer from "@/hooks/use-player";
import useSound from 'use-sound';
import LargeMediaItem from "@/lib/components/LargeMediaItem";
import {ChevronDown, Pause, Play, Repeat2, Share2, SkipBack, SkipForward} from "lucide-react";
import toast from "react-hot-toast";
import useClock from "@/hooks/use-clock";
import Volume from "@/lib/components/player/Volume";

interface PlayerContentProps {
    song: Song
}

interface Skip {
    skip: boolean;
    forced?: boolean;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song
}) => {
    const player = usePlayer();
    const clock = useClock();

    const [isPlaying, setIsPlaying] = useState(false);

    const [skip, setSkip] = useState<Skip>({ skip: false, forced: false });
    const [onRepeat, setOnRepeat] = useState(false);

    const [isMovingProgressBar, setIsMovingProgressBar] = useState(false);
    const [songProgressBar, setSongProgressBar] = useState(0);

    const Icon = isPlaying ? Pause : Play;

    // new onPlayNext
    useEffect(() => {
        if (!skip.skip) return;

        if (player.ids.length === 0) {
            setSkip({ skip: false });
            return;
        }

        if (onRepeat && !skip?.forced) {
            handlePlay();
        } else {
            const currentIndex = player.ids.findIndex((id) => id === player.activeId);
            const nextSong = player.ids[currentIndex + 1];

            if (!nextSong) {
                // Go back to start of the queue
                player.setId(player.ids[0]);
            } else {
                player.setId(nextSong);
            }
        }

        setSkip({ skip: false });
    }, [skip, onRepeat]);

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
    const [play, { pause, sound, duration }] = useSound(
        song.songUrl,
        {
            volume: player.volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                setSkip({ skip: true });
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

    const handleProgressChange = (value: number[]) => {
        setIsMovingProgressBar(true);
        setSongProgressBar(Math.round(value[0]));
    }

    const handleProgressCommit = (value: number[]) => {
        sound.seek(value[0]);
        setTimeout(() => {
            setIsMovingProgressBar(false);
        }, 500);
    }

    // Updates the position of the song progress if it's not being moved by user
    useEffect(() => {
        if (!isMovingProgressBar && sound) {
            setSongProgressBar(Math.round(sound.seek()));
        }
    }, [sound, isMovingProgressBar, clock]);

    const toggleOnRepeat = () => {
        const newOnRepeatValue = !onRepeat;
        setOnRepeat(newOnRepeatValue);
    }

    // TODO - fade-in time slider 0-5s + implementation https://www.npmjs.com/package/use-sound#escape-hatches

    return (
        <div className={`flex ${player.bigPicture && 'flex-col items-center'} md:grid md:grid-cols-3 h-full`}>

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
            {player.bigPicture && (
                <div className='flex 2xs:w-[368px] md:hidden justify-between w-full'>
                    <p className='w-8'>{String(songProgressBar/60).split('.')[0]}:{String(songProgressBar%60).length === 1 ? '0' + songProgressBar%60 : songProgressBar%60}</p>
                    <Slider
                        defaultValue={[0]}
                        value={[songProgressBar]}
                        onValueChange={(value) => handleProgressChange(value)}
                        onValueCommit={(value) => handleProgressCommit(value)}
                        step={duration/100000}
                        max={duration/1000}
                        className='mx-2'
                    />
                    <p className='w-8'>{String(duration/60000).split('.')[0]}:{String((duration/1000)%60).length === 1 ? '0' + String((duration/1000)%60).split('.')[0] : String((duration/1000)%60).split('.')[0] || '0:00'}</p>
                </div>
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
                    onClick={handlePlay}
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
                            className={`text-neutral-400 cursor-pointer transition mx-4 ${onRepeat && 'text-[#22C55E]'}`}
                            onClick={toggleOnRepeat}
                        />
                    </>
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
                    onClick={() => setSkip({ skip: true, forced: true })}
                />
            </div>

            <div className='hidden md:flex w-full justify-end pr-2'>
                <Volume />
            </div>
        </div>
    );
}

export default PlayerContent;
