import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET(
    req: NextRequest,
    { params }: { params: { songId: string } }
) {
    try {
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

        return NextResponse.json(song);
    } catch (error) {
        console.log('[SONG_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}