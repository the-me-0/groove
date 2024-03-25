import React, { useEffect, useState } from "react";
import { Slider } from "@/lib/shadcn-components/ui/slider";
import { twMerge } from "tailwind-merge";
import useClock from '@/hooks/player/use-clock';

interface ProgressBarProps {
  audioPlayer: HTMLAudioElement,
  className?: string,
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  audioPlayer,
  className
}) => {
  const clock = useClock();
  const [songProgressBar, setSongProgressBar] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [isMovingProgressBar, setIsMovingProgressBar] = useState(false);

  // Duration init
  useEffect(() => {
    if (isNaN(audioPlayer.duration)) {
      audioPlayer.onloadedmetadata = () => {
        setDuration(Math.round(audioPlayer.duration));
      }
    } else if (duration !== Math.round(audioPlayer.duration)) {
      setDuration(Math.round(audioPlayer.duration));
    }
  }, [audioPlayer, duration]);

  // Updates the position of the song progress
  useEffect(() => {
    if (!isMovingProgressBar && audioPlayer.currentTime !== songProgressBar) {
      setSongProgressBar(audioPlayer.currentTime);
    }
  }, [audioPlayer, songProgressBar, clock, isMovingProgressBar]);

  const handleProgressChange = (value: number[]) => {
    if (!isMovingProgressBar) setIsMovingProgressBar(true);
    setSongProgressBar(Math.round(value[0]));
  }

  const handleProgressCommit = (value: number[]) => {
    setIsMovingProgressBar(false);
    audioPlayer.currentTime = value[0];
  }

  return (
    <div className={twMerge('flex justify-between w-full', className)}>
      {duration !== null && (
        <>
          <p
            className='w-8'>{String(Math.round(songProgressBar) / 60).split('.')[0]}:{String(Math.round(songProgressBar) % 60).length === 1 ? '0' + Math.round(songProgressBar) % 60 : Math.round(songProgressBar) % 60}
          </p>
          <Slider
            defaultValue={[0]}
            value={[songProgressBar]}
            onValueChange={(value) => handleProgressChange(value)}
            onValueCommit={(value) => handleProgressCommit(value)}
            step={duration / 10000}
            max={duration}
            className='mx-2'
          />
          <p
            className='w-8'>{String(duration / 60).split('.')[0]}:{String(duration % 60).length === 1 ? '0' + String(duration % 60).split('.')[0] : ((String(duration % 60).split('.')[0].length === 1 ? '0' : '') + String(duration % 60).split('.')[0]) || '0:00'}
          </p>
        </>
      )}
    </div>
  );
}
