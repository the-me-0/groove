import {Song} from "@prisma/client";
import {db} from "@/lib/db";

const getSongs = async (): Promise<Song[]> => {
    const songs = await db.song.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return songs || [];
}

export default getSongs;
