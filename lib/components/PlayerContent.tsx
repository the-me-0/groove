'use client';

import { Song } from "@prisma/client";
import React, { useEffect, useState } from "react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Slider } from "@/lib/shadcn-components/ui/slider";
import usePlayer from "@/hooks/use-player";
import useSound from 'use-sound';

interface PlayerContentProps {
    song: Song
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
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
        <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
            <div className='flex w-full justify-start'>
                <div className='flex items-center gap-x-4'>
                    <MediaItem song={song} onClick={() => {}} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            {/* Mobile controller */}
            <div className='flex md:hidden col-auto w-full justify-end items-center'>
                <div
                    onClick={handlePlay}
                    className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'
                >
                    <Icon size={30} className='text-black' />
                </div>
            </div>

            {/* Desktop controller */}
            <div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
                <AiFillStepBackward
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                    onClick={onPlayPrevious}
                />
                <div
                    onClick={handlePlay}
                    className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'
                >
                    <Icon size={30} className='text-black' />
                </div>
                <AiFillStepForward
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
