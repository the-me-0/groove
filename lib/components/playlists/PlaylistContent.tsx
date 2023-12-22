'use client';

import { Playlist, Song } from "@prisma/client";
import React, {useEffect, useState} from "react";
import MediaItem from "@/lib/components/MediaItem";
import LikeButton from "@/lib/components/LikeButton";
import useOnPlay from "@/hooks/use-on-play";
import SongSelection from "@/lib/components/SongSelection";
import useSongSelection from "@/hooks/use-song-selection";
import { Delete } from "lucide-react";
import PlaylistAfterEdit from "@/lib/components/playlists/PlaylistAfterEdit";

interface PlaylistContentProps {
  playlist: Playlist,
  songs: Song[]
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({
  playlist,
  songs
}) => {
  const selection = useSongSelection();
  const onPlay = useOnPlay(songs, playlist.name);
  const [futureSongs, setFutureSongs] = useState<Song[]>([])

  // On component load, set ths selection ids to the already added songs
  useEffect(() => {
    selection.setSongs(songs);
  }, []);

  useEffect(() => {
    setFutureSongs(selection.songs);
  }, [selection.songs]);

  const onSongRemoved = (id: string) => {
    selection.removeSong(id);
  }

  if (songs.length === 0) {
    return (
      <>
        <div className='flex flex-col gap-y-2 w-full px-6 pb-6 text-neutral-400'>
          There is no songs in this playlist.
        </div>
        <PlaylistAfterEdit songs={songs} futureSongs={selection.songs} />
        <SongSelection confirmPath={`/api/playlist/${playlist.id}/songs`} revalidatePath={`/playlist/${playlist.id}`} />
      </>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-y-2 w-full p-6'>
        {songs.map((song) => (
          <div key={song.id} className='flex items-center gap-x-4 w-full'>
            <div className='flex-1'>
              <MediaItem onClick={(id: string) => onPlay(id)} data={song}/>
            </div>
            <LikeButton songId={song.id}/>
            <Delete
              size={32}
              onClick={() => onSongRemoved(song.id)}
              className='mx-5 hover:cursor-pointer hover:text-spotify-green hidden 2xs:block'
            />
          </div>
        ))}
      </div>
      <PlaylistAfterEdit songs={songs} futureSongs={selection.songs} />
      <SongSelection confirmPath={`/api/playlist/${playlist.id}/songs`} revalidatePath={`/playlist/${playlist.id}`} />
    </>
  );
}

export default PlaylistContent;
