import { NextRequest, NextResponse } from 'next/server';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function POST(
    req: NextRequest,
    { params }: { params: { songId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!params.songId) {
            return new NextResponse('Missing fields', { status: 400 });
        }

        const song = await db.song.findUnique({
            where: {
                id: params.songId
            }
        });

        if (!song) {
            return new NextResponse('Invalid song ID', { status: 400 });
        }

        const like = await db.likesOnSongs.create({
            data: {
                songId: params.songId,
                profileId: profile.id
            }
        });

        return NextResponse.json(like);
    } catch (error) {
        console.log('[SONG_LIKE_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { songId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!params.songId) {
            return new NextResponse('Missing fields', { status: 400 });
        }

        const song = await db.song.findUnique({
            where: {
                id: params.songId
            }
        });

        if (!song) {
            return new NextResponse('Invalid song ID', { status: 400 });
        }

        const like = await db.likesOnSongs.findUnique({
            where: {
                songId_profileId: {
                    songId: params.songId,
                    profileId: profile.id
                }
            }
        });

        if (!like) {
            return new NextResponse('Not liked', { status: 200 });
        }

        return NextResponse.json(like);
    } catch (error) {
        console.log('[SONG_LIKE_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { songId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!params.songId) {
            return new NextResponse('Missing fields', { status: 400 });
        }

        const song = await db.song.findUnique({
            where: {
                id: params.songId
            }
        });

        if (!song) {
            return new NextResponse('Invalid song ID', { status: 400 });
        }

        const like = await db.likesOnSongs.delete({
            where: {
                songId_profileId: {
                    songId: params.songId,
                    profileId: profile.id
                }
            }
        });

        return NextResponse.json(like);
    } catch (error) {
        console.log('[SONG_LIKE_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
