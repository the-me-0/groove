import { NextRequest, NextResponse } from 'next/server';
import { currentProfile } from '@/lib/current-profile';
import { streamFile } from '@/lib/stream-file';

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

    const file = `./private/waves/${params.songName}`;
    return streamFile(file, params.songName);
  } catch (error) {
    console.log('[ASSETS_WAVE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
