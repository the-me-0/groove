'use client';

import React, {useCallback, useEffect, useState} from 'react';

import usePlayer from '@/hooks/player/use-player';
import useGetSongById from '@/hooks/use-get-song-by-id';
import { StandardPlayer } from '@/lib/components/player/StandardPlayer';
import { BigPicturePlayer } from '@/lib/components/player/BigPicturePlayer';
import {MarsStandardPlayer} from '@/lib/components/player/MarsStandardPlayer';

interface PlayerProps {
  hideLikeButton: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  hideLikeButton
}) => {
  const player = usePlayer();
  const song = player.songs.find((song) => song.id === player.activeId);
  const [ audioPlayer, setAudioPlayer ] = useState<HTMLAudioElement | null>(null);

  const onEndReached = useCallback(() => {
    if (player.onRepeat) return;

    const currentIndex = player.songs.findIndex((song) => song.id === player.activeId);
    const nextSong = player.songs[currentIndex + 1];

    if (!nextSong) {
      // Go back to start of the queue
      player.setId(player.songs[0].id);
    } else {
      player.setId(nextSong.id);
    }
  }, [player]);
  
  useEffect(() => {
    if (song && !audioPlayer) {
      const audio = new Audio(song.songUrl);

      audio.onended = onEndReached;
      audio.textContent = song.songUrl;

      setAudioPlayer(audio);

      // When a music is loaded, start playing it directly
      audio.play().then((value) => player.setIsPlaying(true));
    } else if (song && audioPlayer && audioPlayer.textContent !== song.songUrl) {
      // Then this player is not fresh, the user switched the song manually

      audioPlayer.src = song.songUrl;
      audioPlayer.onended = onEndReached; // We have to update the audioPlayer onend function with up-to-date info
      audioPlayer.textContent = song.songUrl;
      audioPlayer.play().then((value) => player.setIsPlaying(true));
    }
  }, [song, audioPlayer, player, onEndReached]);

  if (!song || !player.activeId) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 bg-black w-full py-2 h-[80px] px-4 transition-all flex items-center md:justify-between ${player.bigPicture && 'h-full'}`}
      key={song.songUrl}
    >
      {audioPlayer && (
        <>
          {/*<StandardPlayer audioPlayer={audioPlayer} song={song} hideLikeButton={hideLikeButton} />*/}
          <MarsStandardPlayer audioPlayer={audioPlayer} song={song} hideLikeButton={hideLikeButton} />
          <BigPicturePlayer audioPlayer={audioPlayer} song={song} hideLikeButton={hideLikeButton} />
        </>
      )}
    </div>
  );
}
