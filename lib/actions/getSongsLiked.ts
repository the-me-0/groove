import {LikesOnSongs, Song} from '@prisma/client';
import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";

const getLikedSongs = async (): Promise<Song[]> => {
    const profile = await currentProfile();

    const likeRelations: (LikesOnSongs & { song: Song })[] = await db.likesOnSongs.findMany({
        where: {
            profileId: profile.id
        },
        include: {
            song: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return likeRelations.map((relation) => relation.song);
};

export default getLikedSongs;