import {NextRequest, NextResponse} from 'next/server';
import {streamFileOptimized} from '@/lib/stream-file';
import {getSongShareLinkWithSong} from '@/lib/actions/shareLink';

export async function GET(
  req: NextRequest,
  { params }: { params: { shareId: string, imageName: string } }
) {
  try {
    if (!params.shareId) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const songShare = await getSongShareLinkWithSong(params.shareId);

    if (!songShare) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    if (!params.imageName) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    // remove any non-alphanumeric characters from the imageName, while keeping the dots, dashes, and underscores
    params.imageName = params.imageName.replace(/[^a-zA-Z\-_0-9. ]/g, "");

    const file = `./private/images/${params.imageName}`;
    return streamFileOptimized(file, req.headers, params.imageName);
  } catch (error) {
    console.log('[ASSETS_SONG]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
