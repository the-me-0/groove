import React, {useEffect, useRef, useState} from "react";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2";
import {Slider} from "@/lib/shadcn-components/ui/slider";
import usePlayer from "@/hooks/player/use-player";

const Volume: React.FC = () => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);

    const VolumeIcon = player.volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const oldValue = useRef(1);

    useEffect(() => {
        if (player.volume !== volume) {
            player.setVolume(volume);
        }
    }, [player, volume]);

    const toggleMute = () => {
        // Calls are different because we want this local "volume" to remember the old value while player
        if (volume === 0) {
            setVolume(oldValue.current);
        } else {
            oldValue.current = volume;
            setVolume(0);
        }
    }

    return (
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
    );
}

export default Volume;
