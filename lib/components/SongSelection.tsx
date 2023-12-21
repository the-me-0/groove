import React, {useState} from "react";
import SearchInput from "@/lib/components/SearchInput";

interface SongSelectionProps {
  onChange: (songs: string[]) => void
}

const SongSelection: React.FC<SongSelectionProps> = ({
  onChange
}) => {
  const [songs, setSongs] = useState<string[]>([])

  // The selected songs display is only handled by the parent component : but if user wants to remove an image from the list ?
  // use a hook "useSongSelection" that will store elements, and revalidate: 0 in both this component and its parent ?

  const onSongSelected = (id: string) => {
    // add song to list
    // call onChange with songs
  }

  const onSongRemoved = (id: string) => {
    // remove song from list
    // call onChange with songs
  }

  const onSearchInput = (query: string) => {
    // update song search result
  }

  return (
    <>
      <div className='w-full p-2 rounded-lg bg-neutral-800'>
        {/* ModalSearchInput -> onOpen('xxxxx', data) */}
        <SearchInput inputPlaceholder={'Search songs to add...'}/>
      </div>
      <div>
        {/* Show search results */}
      </div>
    </>
  );
}

export default SongSelection;
