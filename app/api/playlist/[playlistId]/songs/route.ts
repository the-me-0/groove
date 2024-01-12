import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import {Playlist, SongsOnPlaylists} from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!params.playlistId) {
      return new NextResponse('Missing playlistId', { status: 400 });
    }

    const data: { ids?: string[] } = await req.json();
    if (data.ids === undefined) {
      return new NextResponse('Missing ids', { status: 400 });
    }

    // We find the existing ids
    const playlist: Playlist & { songsOnPlaylists: SongsOnPlaylists[] } | null = await db.playlist.findUnique({
      where: {
        id: params.playlistId,
        profileId: profile.id
      },
      include: {
        songsOnPlaylists: true
      }
    })

    if (!playlist) {
      return new NextResponse('This playlist does not exist or is not your own', { status: 400 });
    }

    const existingIds = playlist.songsOnPlaylists.map((link) => link.songId);
    const idsToRemove = existingIds.filter((id) => !data.ids!.includes(id));
    const idsToAdd = data.ids!.filter((id) => !existingIds.includes(id));

    // We remove those ids
    await db.$transaction(
      idsToRemove.map((id) => db.songsOnPlaylists.delete({
        where: {
          playlistId_songId: {
            playlistId: params.playlistId,
            songId: id
          }
        }
      }))
    );

    // We add the new ons
    await db.$transaction(
      idsToAdd.map((id) => db.songsOnPlaylists.create({
        data: {
          playlistId: params.playlistId,
          songId: id
        }
      }))
    );

    const { songsOnPlaylists, ...playlistWithoutSongs } = playlist;
    return NextResponse.json(playlistWithoutSongs);
  } catch (error) {
    console.log('[PLAYLIST_ID_SONGS_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}