'use client';

import React, {useEffect, useState} from "react";
import SearchInput from "@/lib/components/SearchInput";
import getSongsByQuery from "@/lib/actions/getSongsByQuery";
import useSongSelection from "@/hooks/use-song-selection";
import {Song} from "@prisma/client";
import MediaItem from "@/lib/components/MediaItem";
import { Button } from "@/lib/shadcn-components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import clearCachesByServerAction from "@/lib/actions/revalidate";

interface SongSelectionProps {
  confirmPath: string;
  revalidatePath: string;
}

const SongSelection: React.FC<SongSelectionProps> = ({
  confirmPath,
  revalidatePath
}) => {
  // The selected songs display is only handled by the parent component : but if user wants to remove an image from the list ?
  // use a hook "useSongSelection" that will store elements, and revalidate: 0 in both this component and its parent ?
  const selection = useSongSelection();
  const [searchedSongs, setSearchedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // On unmount, reset the selection
  useEffect(() => {
    return () => {
      selection.reset();
    }
  }, []);

  const onSongSelected = (song: Song) => {
    selection.addSong(song);
  }

  const onSongRemoved = (id: string) => {
    selection.removeSong(id);
  }

  const onSearchInput = async (query: string) => {
    const searchResult = await getSongsByQuery(query);
    setSearchedSongs(searchResult);
  }

  const onChangeConfirm = async () => {
    setIsLoading(true);

    try {
      const response = await axios.patch(confirmPath, { ids: selection.songs.map((song) => song.id) });

      if (response.status !== 200) {
        toast.error('Something went wrong.');
        console.log(`[SONG_SELECTION_UPDATE] Server responded with status ${response.status}. (context: ${confirmPath})`);
      } else {
        toast.success('Playlist successfully modified !');
        await clearCachesByServerAction(revalidatePath);
      }
    } catch (error) {
      console.error('[SONG_SELECTION_UPDATE] ERROR', error, `(context: ${confirmPath})`)
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full p-2 mt-2 flex flex-col space-y-2 items-start'>
      <h1 className='text-2xl font-semibold p-4 pb-1'>Add some songs</h1>
      <div className='px-3 w-full flex space-x-3'>
        <div className='flex-1'>
          <SearchInput inputPlaceholder={'Search songs to add...'} onSearchInput={onSearchInput} />
        </div>
        <Button
          onClick={() => onChangeConfirm()}
          disabled={isLoading}
          className='h-10 my-auto bg-deep-green border-2 border-neutral-300 text-neutral-300 hover:bg-neutral-900 hover:border-neutral-400 hover:text-neutral-400'
        >
          Confirm
        </Button>
      </div>
      {searchedSongs.map((song: Song) => (
        <div key={song.name} className='pl-4 w-full flex flex-col space-y-2 space-x-2 2xs:flex-row'>
          <MediaItem data={song} onClick={() => {}} />
          <div className='flex'>
            <div className='2xs:hidden flex-1 h-5 border-b-4 border-l-4 border-deep-green rounded-bl-2xl ml-2 mr-5'></div>
            {selection.songs.map((song) => song.id).includes(song.id) && (
              <Button
                onClick={() => onSongRemoved(song.id)}
                className='w-32 h-8 my-auto rounded-full font-bold bg-neutral-900 border-2 border-deep-green text-deep-green hover:bg-deep-green hover:text-neutral-300 hover:border-neutral-400'
              >
                Remove
              </Button>
            )}
            {!selection.songs.map((song) => song.id).includes(song.id) && (
              <Button
                onClick={() => onSongSelected(song)}
                className='w-32 h-8 my-auto rounded-full font-bold bg-neutral-900 border-2 border-deep-green text-deep-green hover:bg-deep-green hover:text-neutral-300 hover:border-neutral-400'
              >
                Add
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongSelection;
