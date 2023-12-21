'use client';

import {Playlist} from "@prisma/client";
import React, {useState} from "react";
import Image from "next/image";
import {useModal} from "@/hooks/use-modal-store";
import {Pencil} from "lucide-react";

interface PlaylistCoverProps {
  playlist: Playlist;
}

const PlaylistCover: React.FC<PlaylistCoverProps> = ({
  playlist
}) => {
  const { onOpen } = useModal();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className='mt-20'>
      <div
        className='flex flex-col md:flex-row items-center gap-x-5 hover:cursor-pointer'
        onClick={() => onOpen("edit-playlist", { playlist })}
        onMouseOver={() => setShowEdit(true)}
        onMouseOut={() => setShowEdit(false)}
      >
        <div className='relative h-32 w-32 lg:h-44 lg:w-44'>
          <Image
            sizes={'100%'}
            fill
            src={playlist.imageUrl}
            alt='Playlist'
            className='object-cover'
          />
        </div>
        <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
          <p className='hidden md:block font-semibold text-sm'>
            Playlist
          </p>
          <h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold flex justify-start items-center'>
            {playlist.name}
            <Pencil className={`hidden ${showEdit && 'md:block'} m-2 ml-6`} size={48} />
          </h1>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCover;
