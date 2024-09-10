import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/current-profile';
import streamFile from '@/lib/stream-file';
import mime from 'mime';
import { sanitizeString } from '@/lib/utils';
import { verifyShareKey } from '@/lib/actions/shareLink';

export async function GET(
  req: NextRequest,
  { params }: { params: { songName: string } }
) {
  try {
    const session = await getUserSession();
    const shareKey = req.nextUrl.searchParams.get('share_key');

    if (!session && !(shareKey && await verifyShareKey(shareKey))) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    if (!params.songName) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    // remove any non-alphanumeric characters from the imageName, while keeping the dots, dashes, and underscores
    params.songName = sanitizeString(params.songName);

    const file = `./private/songs/${params.songName}`;

    const data: ReadableStream<Uint8Array> = streamFile(file, false);

    let mimeType = mime.getType(file) || 'application/octet-stream';

    return new NextResponse(data, {
      status: 200,
      headers: new Headers({
        'Content-Encoding': '',
        'content-type': mimeType,
        'cache-control': 'public, max-age=604800, immutable',
      }),
    });
  } catch (error) {
    console.log('[API_ASSETS_SONGS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
