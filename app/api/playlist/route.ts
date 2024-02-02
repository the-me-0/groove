import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";

export async function POST(
  req: Request
) {
  try {
    const profile = await currentProfile();

    const playlist = await db.playlist.create({
      data: {
        name: `${profile.name}'s playlist`,
        imageUrl: '/api/assets/images/playlist-default.png',
        type: "PLAYLIST",
        artist: profile.name || 'dummy',
        profileId: profile.id
      }
    });

    return NextResponse.json(playlist);
  } catch (error) {
    console.log('[PLAYLIST_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
