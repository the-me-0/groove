import {NextRequest, NextResponse} from 'next/server';
import {streamFileOptimized} from '@/lib/stream-file';
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
    return streamFileOptimized(file, req.headers, params.songName);
  } catch (error) {
    console.log('[ASSETS_SONG]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
