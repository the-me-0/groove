import {Playlist} from "@prisma/client";
import {db} from "@/lib/db";

const getPlaylists = async (): Promise<Playlist[]> => {
    const playlists = await db.playlist.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return playlists || [];
}

export default getPlaylists;
