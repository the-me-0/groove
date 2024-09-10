'use server'

import {Song, SongShareLink} from "@prisma/client";
import {db} from "@/lib/db";

const getSongShareLinkWithSong = async (shareLinkValue: string): Promise<SongShareLink & { song: Song } | null> => {
  const songShareLink = await db.songShareLink.findUnique({
    where: {
      value: shareLinkValue
    },
    include: {
      song: true
    }
  });

  // If a song share link is older than 24 hours, delete it
  if (songShareLink && songShareLink.createdAt.getTime()/1000 + 60*60*24 < Date.now()/1000) {
    await db.songShareLink.delete({
      where: {
        value: shareLinkValue
      }
    });
    return null;
  }

  // edit the song's link values to include the share value
  if (songShareLink) {
    songShareLink.song.songUrl = songShareLink.song.songUrl + `?share_key=${shareLinkValue}`;
    songShareLink.song.imageUrl = songShareLink.song.imageUrl + `?share_key=${shareLinkValue}`;
    songShareLink.song.waveUrl = songShareLink.song.waveUrl + `?share_key=${shareLinkValue}`;
  }

  return songShareLink;
}

const createSongShareLink = async (songId: string) => {
  return db.songShareLink.create({
    data: { songId }
  });
}

const verifyShareKey = async (shareKey: string): Promise<boolean> => {
  return await db.songShareLink.findFirst({
    where: {
      value: shareKey
    }
  }) !== null;
}

export { getSongShareLinkWithSong, createSongShareLink, verifyShareKey };
