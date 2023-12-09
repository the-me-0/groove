import { NextRequest, NextResponse } from 'next/server';
import { currentProfile } from "@/lib/current-profile";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import {db} from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const formData = await req.formData();
        const title = formData.get('title') as string;
        const author = formData.get('author') as string;
        const songFile = formData.get('songFile') as File;
        const imageFile = formData.get('imageFile') as File;

        if (!title || !author || !songFile || !imageFile) {
            return new NextResponse('Missing fields', { status: 400 });
        }

        const uuid = uuidv4();
        const uploadTag = `${author.replace(/\s+/g, '-').toLowerCase()}_${uuid}`;

        // -- Song Save
        const uploadSongLocation = `/songs/${uploadTag}.mp3`;
        const songData = await songFile.arrayBuffer();
        fs.writeFileSync('./public' + uploadSongLocation, Buffer.from(songData));

        // -- Image Save
        let imageNameSliced = imageFile.name.split('.');
        const uploadImageLocation = `/songs/images/${uploadTag}.${imageNameSliced[imageNameSliced.length-1]}`;
        const imageData = await imageFile.arrayBuffer();
        fs.writeFileSync('./public' + uploadImageLocation, Buffer.from(imageData));

        await db.song.create({
            data: {
                name: title,
                imageUrl: uploadImageLocation,
                songUrl: uploadSongLocation,
                artist: author,
                profileId: profile.id
            }
        });

        return NextResponse.json({ message: 'Files Created' });
    } catch (error) {
        console.log('[SONG_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}