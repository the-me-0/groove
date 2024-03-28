'use client';

import React, {useEffect, useState} from 'react';
import usePlayer from '@/hooks/player/use-player';
import useClock from '@/hooks/player/use-clock';

interface TestProps {
  audioPlayer: HTMLAudioElement,
}

const samples = 150;

export const Test: React.FC<TestProps> = ({
  audioPlayer,
}) => {
  const player = usePlayer();
  const clock = useClock();

  const [filteredAudioBuffer, setFilteredAudioBuffer] = useState<Array<number> | null>(null);

  useEffect(() => {
    if (!filteredAudioBuffer || !audioPlayer || isNaN(audioPlayer.duration)) return;

    console.log('audioPlayer.currentTime', audioPlayer.currentTime, ', duration', audioPlayer.duration);

    /**
     * Draws the audio file into a canvas element.
     * @param {Array} normalizedData The filtered array returned from filterData()
     * @returns {Array} a normalized array of data
     */
    const draw = (normalizedData: Array<number>): void => {
      // set up the canvas
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        console.error('Canvas not found');
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      const padding = 75;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error('Canvas context not found');
        return;
      }
      // clear the current state
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.scale(dpr, dpr);
      ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

      const shouldBeColoredUpto = Math.floor(audioPlayer.currentTime / audioPlayer.duration * normalizedData.length);

      // draw the line segments
      const width = canvas.offsetWidth / normalizedData.length;
      let index = 0;

      const drawLine = () => {
        const x = width * index;
        let height = normalizedData[index] * canvas.offsetHeight - padding;
        if (height < 0) {
          height = 0;
        } else if (height > canvas.offsetHeight / 2) {
          height = height - canvas.offsetHeight / 2;
        }

        drawLineSegment(ctx, x, height, width, Boolean((index + 1) % 2), index < shouldBeColoredUpto);

        if (index < normalizedData.length) {
          index++;
          requestAnimationFrame(drawLine);
        }
      }

      drawLine();

      // for (let i = 0; i < normalizedData.length; i++) {
      //   const x = width * i;
      //   let height = normalizedData[i] * canvas.offsetHeight - padding;
      //   if (height < 0) {
      //     height = 0;
      //   } else if (height > canvas.offsetHeight / 2) {
      //     height = height - canvas.offsetHeight / 2;
      //   }
      //
      //   drawLineSegment(ctx, x, height, width, Boolean((i + 1) % 2), i < shouldBeColoredUpto);
      // }
    };

    /**
     * A utility function for drawing our line segments
     * @param {AudioContext} ctx the audio context
     * @param {number} x  the x coordinate of the beginning of the line segment
     * @param {number} height the desired height of the line segment
     * @param {number} width the desired width of the line segment
     * @param {boolean} isEven whether or not the segmented is even-numbered
     */
    const drawLineSegment = (ctx: CanvasRenderingContext2D, x: number, height: number, width: number, isEven: boolean, isColored) => {
      ctx.lineWidth = 1; // how thick the line is
      // ctx.strokeStyle = "#fff"; // what color our line is
      ctx.strokeStyle = isColored ? '#cb4f00' : '#fff';
      ctx.beginPath();
      height = isEven ? height : -height;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
      ctx.lineTo(x + width, 0);
      ctx.stroke();
    };

    draw(filteredAudioBuffer);
  }, [filteredAudioBuffer, clock, audioPlayer]);

  return (
    <div className='hidden sm:flex w-80 xl:w-full max-w-xl mx-auto'>
      <canvas className='h-[80px] w-full'></canvas>
    </div>
  )
}
