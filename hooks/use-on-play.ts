import { Song } from "@prisma/client";
import usePlayer from "@/hooks/use-player";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();

    const onPlay = (id: string) => {
        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
}

export default useOnPlay;
