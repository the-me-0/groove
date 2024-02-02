import {Playlist} from "@prisma/client";
import {db} from "@/lib/db";

const getPlaylists = async (): Promise<Playlist[]> => {
    const playlists = await db.playlist.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedPlaylists: Playlist[] = playlists.map((playlist: Playlist) => {
        if (!playlist.imageUrl) playlist.imageUrl = '/api/assets/images/playlist.png';
        return playlist;
    })

    return formattedPlaylists || [];
}

export default getPlaylists;
