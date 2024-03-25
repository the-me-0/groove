import { Song } from "@prisma/client";
import usePlayer from "@/hooks/player/use-player";

const useOnPlay = (songs: Song[], source: string) => {
    const player = usePlayer();

    const onPlay = (id: string) => {
        player.setId(id);
        // TODO: if we stored the songs directly, we could change L18 in Player.tsx, therefore removing a useless call to DB and fix the shared player issue
        player.setIds(songs, source);
    }

    return onPlay;
}

export default useOnPlay;
