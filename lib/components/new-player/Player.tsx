'use client';

import React, {useCallback, useEffect, useState} from 'react';

import usePlayer from '@/hooks/player/use-player';
import useGetSongById from '@/hooks/use-get-song-by-id';
import { StandardPlayer } from '@/lib/components/new-player/StandardPlayer';
import { BigPicturePlayer } from '@/lib/components/new-player/BigPicturePlayer';

export const Player = (): React.JSX.Element | null => {
  const player = usePlayer();
  const { song  } = useGetSongById(player.activeId);
  const [ audioPlayer, setAudioPlayer ] = useState<HTMLAudioElement | null>(null);

  const onEndReached = useCallback(() => {
    if (player.onRepeat) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      // Go back to start of the queue
      player.setId(player.ids[0]);
    } else {
      player.setId(nextSong);
    }
  }, [player]);
  
  useEffect(() => {
    if (song && !audioPlayer) {
      const audio = new Audio(song.songUrl);
      audio.textContent = song.songUrl;

      // When the song ends, skip to the next one
      audio.onended = onEndReached;

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
          <StandardPlayer audioPlayer={audioPlayer} song={song} />
          <BigPicturePlayer audioPlayer={audioPlayer} />

          {/* We add the audio element here once it is created */}
          {/*<div ref={ref => ref?.appendChild(audioPlayer)}></div>*/}
          {/*<input*/}
          {/*  type="button"*/}
          {/*  value="play/pause"*/}
          {/*  onClick={onPlayPause}*/}
          {/*/>*/}
        </>
      )}
    </div>
  );
}
