import usePlayer from "@/hooks/player/use-player";
import {useEffect, useState} from "react";

interface Skip {
    skip: boolean;
    forced?: boolean;
}

interface PlayerControlsExports {
    onPlayPrevious: () => void;
    setSkip: () => void;
    toggleOnRepeat: () => void;
}

function usePlayerControls() {
    const player = usePlayer();

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ON REPEAT
    const toggleOnRepeat = () => {
        const newOnRepeatValue = !player.onRepeat;
        player.setOnRepeat(newOnRepeatValue);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ON PREVIOUS
    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            // Go to the last item of the queue
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong)
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ON NEXT
    const [skip, setSkip] = useState<Skip>({ skip: false, forced: false });

    // new onPlayNext
    useEffect(() => {
        if (!skip.skip) return;

        if (player.ids.length === 0) {
            setSkip({ skip: false });
            return;
        }

        if (player.onRepeat && !skip?.forced) {
            player.handlePlay();
        } else {
            if (player.onRepeat) {
                toggleOnRepeat();
            }

            const currentIndex = player.ids.findIndex((id) => id === player.activeId);
            const nextSong = player.ids[currentIndex + 1];

            if (!nextSong) {
                // Go back to start of the queue
                player.setId(player.ids[0]);
            } else {
                player.setId(nextSong);
            }
        }

        setSkip({ skip: false });
    }, [skip]);

    return {
        onPlayPrevious,
        setSkip,
        toggleOnRepeat,
    }
}

export default usePlayerControls;