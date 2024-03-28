'use client';

import React, { useEffect, useState } from "react";
import { Slider } from "@/lib/shadcn-components/ui/slider";
import { twMerge } from "tailwind-merge";
import useClock from '@/hooks/player/use-clock';
import {useWaveDrawer} from '@/hooks/wave/useWaveDrawer';
import usePlayer from '@/hooks/player/use-player';
import toast from 'react-hot-toast';

interface MarsProgressBarProps {
  audioPlayer: HTMLAudioElement,
  className?: string,
}

export const MarsProgressBar: React.FC<MarsProgressBarProps> = ({
  audioPlayer,
  className,
}) => {
  const player = usePlayer();
  const clock = useClock();
  const { drawCanvas, drawProgression } = useWaveDrawer();
  const skeletonCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const progressCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const [waveData, setWaveData] = useState<Array<number> | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [songProgress, setSongProgress] = useState(0);
  const [isMovingProgress, setIsMovingProgress] = useState(false);

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

  useEffect(() => {
    if (!skeletonCanvasRef?.current ||!audioPlayer || !player.activeId || waveData) return;

    setWaveData([]); // just to prevent another fetch while this one is still running
    const canvas = skeletonCanvasRef.current;

    fetch(player.songs.find((song) => song.id === player.activeId)?.waveUrl || '', {
      method: 'GET',
    }).then(async (response) => {
      const fetchedWaveData = await response.json();

      setWaveData(fetchedWaveData as Array<number>);
      drawCanvas(fetchedWaveData, canvas);
    }).catch((error) => {
      console.error('Error while fetching wave data', error);
      toast.error('Error while fetching wave data');
    });
  }, [audioPlayer, drawCanvas, player, waveData]);

  // Updates the position of the song progress
  useEffect(() => {
    if (!isMovingProgress && audioPlayer.currentTime !== songProgress) {
      setSongProgress(audioPlayer.currentTime);
    }
  }, [audioPlayer, songProgress, clock, isMovingProgress]);

  // Updates the color of the progress bar
  useEffect(() => {
    if (!progressCanvasRef.current || !duration || !waveData) return;

    drawProgression(waveData, progressCanvasRef.current, songProgress, duration);
  }, [songProgress, duration, drawProgression, clock, waveData]);

  const handleProgressChange = (value: number[]) => {
    if (!isMovingProgress) setIsMovingProgress(true);
    setSongProgress(Math.round(value[0]));
  }

  const handleProgressCommit = (value: number[]) => {
    setIsMovingProgress(false);
    audioPlayer.currentTime = value[0];
  }

  return (
    <div className='w-1/2 flex items-center gap-x-2'>
      {duration !== null && (
        <>
          <p
            className='w-10'>{String(Math.round(songProgress) / 60).split('.')[0]}:{String(Math.round(songProgress) % 60).length === 1 ? '0' + Math.round(songProgress) % 60 : Math.round(songProgress) % 60}
          </p>
          <div className='w-full h-[80px] relative'>
            <canvas className='w-full h-full' ref={skeletonCanvasRef} />
            <canvas className='w-full h-full absolute inset-0' ref={progressCanvasRef} />
            <Slider
              defaultValue={[0]}
              value={[songProgress]}
              onValueChange={(value) => handleProgressChange(value)}
              onValueCommit={(value) => handleProgressCommit(value)}
              step={duration / 10000}
              max={duration}
              className='w-full h-full absolute inset-0 cursor-pointer opacity-0'
            />
          </div>
          <p
            className='w-8'>{String(duration / 60).split('.')[0]}:{String(duration % 60).length === 1 ? '0' + String(duration % 60).split('.')[0] : ((String(duration % 60).split('.')[0].length === 1 ? '0' : '') + String(duration % 60).split('.')[0]) || '0:00'}
          </p>
        </>
      )}
    </div>
  );
}
