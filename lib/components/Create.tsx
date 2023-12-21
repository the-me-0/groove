'use client';

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/lib/shadcn-components/ui/dropdown-menu";
import {useModal} from "@/hooks/use-modal-store";
import {AiOutlinePlus} from "react-icons/ai";
import {BookHeadphones, Disc, LibraryBig} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import {redirect, useRouter} from "next/navigation";
import {revalidatePath} from "next/cache";
import clearCachesByServerAction from "@/lib/actions/revalidate";

const Create: React.FC = () => {
  const { onOpen } = useModal();
  const router = useRouter();

  const onPlaylistCreate = async () => {
    const response = await axios.post('/api/playlist');

    if (response.status !== 200) {
      toast.error('Something went wrong.');
      return;
    }

    await clearCachesByServerAction();
    router.push(`/playlist/${response.data.id}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='focus:outline-none'
        asChild
      >
        <button>
          <AiOutlinePlus
            size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition'
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-40 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'
      >
        <DropdownMenuItem
          onClick={() => onOpen('upload')}
          className='text-neutral-300 px-3 py-2 text-sm cursor-pointer'
        >
          <Disc className='h-4 w-4' />
          <p className='ml-1 mr-auto'>Create Song</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onPlaylistCreate()}
          className='text-neutral-300 hover:text-spotify-green px-3 py-2 text-sm cursor-pointer'
        >
          <BookHeadphones className='h-4 w-4' />
          <p className='ml-1 mr-auto'>Create Album</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onPlaylistCreate()}
          className='text-neutral-300 hover:text-spotify-green px-3 py-2 text-sm cursor-pointer'
        >
          <LibraryBig className='h-4 w-4' />
          <p className='ml-1 mr-auto'>Create Playlist</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Create;
