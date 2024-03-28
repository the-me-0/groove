import React, { useEffect, useRef, useState } from 'react';
import { Slider } from '@/lib/shadcn-components/ui/slider';
import usePlayer from '@/hooks/player/use-player';
import {Volume1, Volume2, VolumeX} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/shadcn-components/ui/popover';

interface MarsVolumeBarProps {
  audioPlayer: HTMLAudioElement,
}

export const MarsVolumeBar: React.FC<MarsVolumeBarProps> = ({
  audioPlayer,
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(player.volume);

  const VolumeIcon = volume === 0 ? VolumeX : volume <= 1/3 ? Volume1 : Volume2;

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

  // could use Skeleton from shadcn while loading ?

  return (
    <Popover>
      <PopoverTrigger className='h-full'>
        <VolumeIcon
          // onClick={toggleMute}
          className='cursor-pointer'
          size={34}
        />
      </PopoverTrigger>
      <PopoverContent className='w-fit rounded-none bg-neutral-950 border-neutral-900 mb-1'>
        <Slider
          orientation='vertical'
          className='w-2 h-32 flex flex-col'
          defaultValue={[1]}
          value={[volume]}
          onValueChange={(value) => setVolume(value[0])}
          max={1}
          step={0.01}
          aria-label='Volume'
        />
      </PopoverContent>
    </Popover>
  );
}
