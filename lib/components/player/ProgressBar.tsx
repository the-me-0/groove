import React, {useEffect, useState} from "react";
import useClock from "@/hooks/player/use-clock";
import {Slider} from "@/lib/shadcn-components/ui/slider";
import {twMerge} from "tailwind-merge";
import player from "@/lib/components/player/Player";
import usePlayer from "@/hooks/player/use-player";

interface ProgressBarProps {
    sound: any,
    duration: number,
    className?: string,
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    sound,
    duration,
    className
}) => {
    const player = usePlayer();
    const clock = useClock();

    const [isMovingProgressBar, setIsMovingProgressBar] = useState(false);
    const [songProgressBar, setSongProgressBar] = useState(0);

    const handleProgressChange = (value: number[]) => {
        setIsMovingProgressBar(true);
        setSongProgressBar(Math.round(value[0]));
    }

    // Updates the position of the song progress if it's not being moved by user
    useEffect(() => {
        if (!isMovingProgressBar && sound) {
            setSongProgressBar(Math.round(sound.seek()));
        }
    }, [sound, isMovingProgressBar, clock]);

    const handleProgressCommit = (value: number[]) => {
        sound.seek(value[0]);
        setIsMovingProgressBar(false);
        if (!player.isPlaying) {
            player.handlePlay();
        }
    }

    return (
        <div className={twMerge('flex justify-between w-full', className)}>
            <p className='w-8'>{String(songProgressBar / 60).split('.')[0]}:{String(songProgressBar % 60).length === 1 ? '0' + songProgressBar % 60 : songProgressBar % 60}</p>
            <Slider
                defaultValue={[0]}
                value={[songProgressBar]}
                onValueChange={(value) => handleProgressChange(value)}
                onValueCommit={(value) => handleProgressCommit(value)}
                step={duration / 100000}
                max={duration / 1000}
                className='mx-2'
            />
            <p className='w-8'>{String(duration / 60000).split('.')[0]}:{String((duration / 1000) % 60).length === 1 ? '0' + String((duration / 1000) % 60).split('.')[0] : ((String((duration / 1000) % 60).split('.')[0].length === 1 ? '0': '') + String((duration / 1000) % 60).split('.')[0]) || '0:00'}</p>
        </div>
    );
}

export default ProgressBar;
