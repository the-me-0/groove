import {NextRequest, NextResponse} from 'next/server';
import {Stats} from 'node:fs';
import fs from 'fs';
import streamFile from '@/lib/stream-file';
import {getSongShareLinkWithSong} from '@/lib/actions/shareLink';

export async function GET(
  req: NextRequest,
  { params }: { params: { shareId: string, songName: string } }
) {
  try {
    if (!params.shareId) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const songShare = await getSongShareLinkWithSong(params.shareId);

    if (!songShare) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    if (!params.songName) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    // remove any non-alphanumeric characters from the imageName, while keeping the dots, dashes, and underscores
    params.songName = params.songName.replace(/[^a-zA-Z\-_0-9. ]/g, "");

    const file = `./private/songs/${params.songName}`;
    const stats: Stats = await fs.promises.stat(file);
    const data: ReadableStream<Uint8Array> = streamFile(file);

    return new NextResponse(data, {
      status: 200,
      headers: new Headers({
        'content-disposition': `attachment; filename=${params.songName}.mp3`,
        'content-type': 'audio/mpeg',
        'content-length': stats.size + '',
        'cache-control': 'public, max-age=31536000, immutable',
      }),
    });
  } catch (error) {
    console.log('[ASSETS_SONG]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}