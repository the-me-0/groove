import { NextRequest, NextResponse } from 'next/server';
import { currentProfile } from "@/lib/current-profile";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import {db} from "@/lib/db";
import path from 'node:path';

export async function POST(req: NextRequest) {
    try {
        const profile = await currentProfile();

        const prodEnv = process.env.NODE_ENV === "production";

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

        console.log(req.url)

        // -- Song Save
        const uploadSongLocation = `./private/songs/${uploadTag}.mp3`;
        const songApiLocation = `/api/assets/songs/${uploadTag}.mp3`;
        const songData = await songFile.arrayBuffer();
        fs.writeFileSync(uploadSongLocation, Buffer.from(songData));

        // -- Image Save
        const uploadImageLocation = `./private/images/${uploadTag}.${imageFile.name.split('.').pop()}`;
        const imageApiLocation = `/api/assets/images/${uploadTag}.${imageFile.name.split('.').pop()}`;
        const imageData = await imageFile.arrayBuffer();
        fs.writeFileSync(uploadImageLocation, Buffer.from(imageData));

        await db.song.create({
            data: {
                name: title,
                imageUrl: imageApiLocation,
                songUrl: songApiLocation,
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