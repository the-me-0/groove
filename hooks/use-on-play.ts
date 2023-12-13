import { Song } from "@prisma/client";
import usePlayer from "@/hooks/player/use-player";

const useOnPlay = (songs: Song[], source: string) => {
    const player = usePlayer();

    const onPlay = (id: string) => {
        player.setId(id);
        player.setIds(songs.map((song) => song.id), source);
    }

    return onPlay;
}

export default useOnPlay;
