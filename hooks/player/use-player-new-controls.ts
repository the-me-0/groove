import usePlayer from "@/hooks/player/use-player";
import {useEffect, useState} from "react";

interface PlayerControlsExports {
  onPlay: () => void;
  onPlayPrevious: () => void;
  onPlayNext: () => void;
  onLoop: () => void;
}

export const usePlayerControls = (audioPlayer: HTMLAudioElement): PlayerControlsExports => {
  const player = usePlayer();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ON PLAY
  const onPlay = () => {
    if (audioPlayer.paused) {
      audioPlayer.play()
        .then((value) => player.setIsPlaying(true))
        .catch((error) => console.log('audioPlayer.play() returned an error. Please contact the application provider with the corresponding error detail. Error detail:', error));
    } else {
      audioPlayer.pause();
      player.setIsPlaying(false);
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ON LOOP
  const onLoop = () => {
    const newLoopValue = !audioPlayer.loop
    audioPlayer.loop = newLoopValue;
    player.setOnRepeat(newLoopValue);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ON PREVIOUS
  const onPlayPrevious = () => {
    const currentIndex = player.songs.findIndex((song) => song.id === player.activeId);
    const previousSong = player.songs[currentIndex - 1];

    if (!previousSong) {
      // Go to the last item of the queue
      return player.setId(player.songs[player.songs.length - 1].id);
    }

    player.setId(previousSong.id)
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ON NEXT
  const onPlayNext = (forced: boolean = false) => {
    if (player.onRepeat && !forced) return;
    audioPlayer.loop = false;
    player.setOnRepeat(false);

    const currentIndex = player.songs.findIndex((song) => song.id === player.activeId);
    const nextSong = player.songs[currentIndex + 1];

    if (!nextSong) {
      // Go back to start of the queue
      player.setId(player.songs[0].id);
    } else {
      player.setId(nextSong.id);
    }
  }

  return {
    onPlay,
    onPlayPrevious,
    onPlayNext,
    onLoop,
  }
}
