import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import {v4 as uuidv4} from "uuid";
import fs from "fs";

interface EditPlaylistParams {
  name?: string;
  imageUrl?: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    if (!params.playlistId) {
      return new NextResponse('Missing playlistId', { status: 400 });
    }

    const prodEnv = process.env.NODE_ENV === "production";

    const formData = await req.formData();
    const name = formData.get('name') as string | null;
    const imageFile = formData.get('image') as File | null;

    let editedData: EditPlaylistParams = {
      name: name || undefined,
      imageUrl: ''
    }

    if (imageFile) {
      const uuid = uuidv4();
      const uploadTag = `${(profile.name || 'dummy').replace(/\s+/g, '-').toLowerCase()}_${uuid}`;

      // -- Image Save
      const uploadImageLocation = `./private/images/${uploadTag}.${imageFile.name.split('.').pop()}`;
      const imageApiLocation = `/api/assets/images/${uploadTag}.${imageFile.name.split('.').pop()}`;
      const imageData = await imageFile.arrayBuffer();
      fs.writeFileSync(uploadImageLocation, Buffer.from(imageData));

      editedData.imageUrl = imageApiLocation;
    } else {
      delete editedData.imageUrl;
    }

    if (!name) {
      delete editedData.name;
    }

    const playlist = await db.playlist.update({
      where: {
        id: params.playlistId,
        profileId: profile.id
      },
      data: editedData
    });

    return NextResponse.json(playlist);
  } catch (error) {
    console.log('[PLAYLIST_ID_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}