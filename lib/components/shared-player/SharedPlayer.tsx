'use client';

import usePlayer from "@/hooks/player/use-player";
import PlayerContentWrapper from "@/lib/components/player/PlayerContentWrapper";
import {Song} from '@prisma/client';

interface SharedPlayerProps {
  sharedSong: Song;
}

const SharedPlayer = ({
  sharedSong
}: SharedPlayerProps) => {
  const player = usePlayer();

  if (!player.activeId) {
    return null;
  }

  return (
    <div className='hidden'>
      {/* PlayerContent has a key value as if the key changes, it re-renders */}
      <PlayerContentWrapper
        key={sharedSong.songUrl}
        song={sharedSong}
      />
    </div>
  );
}

export default SharedPlayer;
