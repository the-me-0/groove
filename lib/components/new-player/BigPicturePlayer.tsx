import React from 'react';
import usePlayer from '@/hooks/player/use-player';

interface BigPicturePlayerProps {
  audioPlayer: HTMLAudioElement;
}

export const BigPicturePlayer: React.FC<BigPicturePlayerProps> = ({
  audioPlayer
}) => {
  const player = usePlayer();

  if (!player.bigPicture) return null;

  return (
    <>
      BigPicture player
    </>
  )
}
