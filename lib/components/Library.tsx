"use client";

import {TbPlaylist} from 'react-icons/tb';
import React from "react";
import {Playlist, Song} from "@prisma/client";
import MediaItem from "@/lib/components/MediaItem";
import useOnPlay from "@/hooks/use-on-play";
import Create from "@/lib/components/Create";

interface LibraryProps {
    songs: Song[];
    playlists: Playlist[];
}

const Library: React.FC<LibraryProps> = ({
  songs,
  playlists
}) => {
    const onPlay = useOnPlay(songs, 'your uploads');

    return (
        <div className='flex flex-col'>
            <div
                className='flex items-center justify-between px-5 pt-4'
            >
                <div className='inline-flex items-center gap-x-2'>
                    <TbPlaylist className='text-neutral-400' size={26}/>
                    <p className='text-neutral-400 font-medium text-md'>
                        Your Library
                    </p>
                </div>
                <Create />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 px-3'>
              {/*
              {playlists.map((playlist) => (
                <MediaItem
                  onClick={(id: string) => onPlay(id)}
                  key={playlist.id}
                  data={playlist}
                />
              ))}
              */}
              {songs.map((song) => (
                  <MediaItem
                      onClick={(id: string) => onPlay(id)}
                      key={song.id}
                      data={song}
                  />
              ))}
            </div>
        </div>
    )
}

export default Library;
