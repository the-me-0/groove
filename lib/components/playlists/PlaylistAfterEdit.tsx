'use client';

import {Song} from "@prisma/client";
import React, {useEffect, useState} from "react";

interface PlaylistAfterEditProps {
  songs: Song[];
  futureSongs: Song[];
}

const PlaylistAfterEdit: React.FC<PlaylistAfterEditProps> = ({
  songs,
  futureSongs
}) => {
  const [removedSongs, setRemovedSongs] = useState<Song[]>([]);
  const [addedSongs, setAddedSongs] = useState<Song[]>([]);

  useEffect(() => {
    const songsId = songs.map((song) => song.id);
    setAddedSongs(futureSongs.filter((song) => !songsId.includes(song.id)));

    const futureSongsId = futureSongs.map((song) => song.id);
    setRemovedSongs(songs.filter((song) => !futureSongsId.includes(song.id)));
  }, [songs, futureSongs]);

  return (
    <div className='px-8'>
      {addedSongs.length ? (
        <>
          <p className='font-semibold text-xl'>Added songs</p>
          <div>
            {addedSongs.map((song) => (
              <p key={song.name} className='pl-4'> - {song.name}</p>
            ))}
          </div>
        </>
      ) : ''}
      {removedSongs.length ? (
        <>
          <p className='font-semibold text-xl'>Removed songs</p>
          <div>
            {removedSongs.map((song) => (
              <p key={song.name} className='pl-4'> - {song.name}</p>
            ))}
          </div>
        </>
      ) : ''}
    </div>
  );
}

export default PlaylistAfterEdit;
