import { Song } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

const getSongsByProfileId = async (): Promise<Song[]> => {
    const profile = await currentProfile();
    if (!profile) return [];

    const songs = await db.song.findMany({
        where: {
            profileId: profile.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return songs || [];
}

export default getSongsByProfileId;
