'use server'

import {Song, SongShareLink} from "@prisma/client";
import {db} from "@/lib/db";

export const getSongShareLinkWithSong = async (songShareLinkValue: string): Promise<SongShareLink & { song: Song } | null> => {
  const songShareLink = await db.songShareLink.findUnique({
    where: {
      value: songShareLinkValue
    },
    include: {
      song: true
    }
  });

  // If a song share link is older than 24 hours, delete it
  if (songShareLink && songShareLink.createdAt.getTime()/1000 + 60*60*24 < Date.now()/1000) {
    await db.songShareLink.delete({
      where: {
        value: songShareLinkValue
      }
    });
    return null;
  }

  // edit the song's link values to include the share value
  if (songShareLink) {
    songShareLink.song.songUrl = `/api/shared/${songShareLinkValue}` + songShareLink.song.songUrl.split('/api')[1];
    songShareLink.song.imageUrl = `/api/shared/${songShareLinkValue}` + songShareLink.song.imageUrl.split('/api')[1];
  }

  return songShareLink;
}

export const createSongShareLink = async (songId: string) => {
  return db.songShareLink.create({
    data: { songId }
  });
}
