import {NextRequest, NextResponse} from 'next/server';
import {currentProfile} from '@/lib/current-profile';
import {Stats} from 'node:fs';
import fs from 'fs';
import streamFile from '@/lib/stream-file';

export async function GET(
  req: NextRequest,
  { params }: { params: { songName: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
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
