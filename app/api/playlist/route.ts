import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";

export async function POST(
  req: Request
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const playlist = await db.playlist.create({
      data: {
        name: `${profile.name}'s playlist`,
        imageUrl: '',
        type: "PLAYLIST",
        artist: profile.name,
        profileId: profile.id
      }
    });

    return NextResponse.json(playlist);
  } catch (error) {
    console.log('[PLAYLIST_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
