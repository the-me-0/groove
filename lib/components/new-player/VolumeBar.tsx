import React, { useEffect, useRef, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Slider } from "@/lib/shadcn-components/ui/slider";
import usePlayer from "@/hooks/player/use-player";

interface VolumeBarProps {
  audioPlayer: HTMLAudioElement,
}

export const VolumeBar: React.FC<VolumeBarProps> = ({
  audioPlayer,
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(player.volume);

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const oldValue = useRef(player.volume);

  // At each local volume update, update the player variable setting
  useEffect(() => {
    if (player.volume !== volume) {
      player.setVolume(volume);
    }
  }, [player, volume]);

  // Makes the audio tag volume value follow the local one
  useEffect(() => {
    audioPlayer.volume = player.volume;
  }, [audioPlayer, player.volume]);

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
        step={0.01}
        aria-label='Volume'
      />
    </div>
  );
}
