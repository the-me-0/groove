'use client';

import { Song } from "@prisma/client";
import React, { useEffect, useState } from "react";
import usePlayer from "@/hooks/player/use-player";
import useSound from 'use-sound';
import usePlayerControls from "@/hooks/player/use-player-controls";
import MobilePlayerContent from "@/lib/components/player/MobilePlayerContent";
import DesktopPlayerContent from "@/lib/components/player/DesktopPlayerContent";

interface PlayerContentProps {
    song: Song
}

const PlayerContentWrapper: React.FC<PlayerContentProps> = ({
    song
}) => {
    const player = usePlayer();
    const { setSkip } = usePlayerControls();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // As the useSound hook does not refresh if the song.songUrl is changed,
    //   we need the key attribute to be defined on songUrl on this PlayerContent component.
    const [play, { pause, sound, duration }] = useSound(
        song.songUrl,
        {
            volume: player.volume,
            onplay: () => {
                setIsPlaying(true);
            },
            onend: () => {
                setIsPlaying(false);
                setSkip({ skip: true });
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    // Updates the player object according to the hook state
    useEffect(() => {
        if (isPlaying !== player.isPlaying) {
            player.setIsPlaying(isPlaying);
        }
    }, [player, isPlaying]);

    // When a the howler is ready (useSound), start the song and on unmount, unload it.
    //   Once the howler is started, add the song's infos in the player object & the play/pause switcher
    useEffect(() => {
        // Play the song as soon as this component is mounted
        if (sound) {
            sound.play();
        }

        sound?.once('play', () => {
            player.setHandlePlay(() => {
                if (!sound.playing()) {
                    play();
                } else {
                    pause();
                }
            });
            player.setSound(sound);
            player.setDuration(duration);
        })

        // Removes the song on unmount
        return () => {
            sound?.unload();
        }
    }, [sound]);

    // TODO - fade-in time slider 0-5s + implementation https://www.npmjs.com/package/use-sound#escape-hatches

    return (
        <div className={`flex ${player.bigPicture && 'flex-col'} items-center md:justify-between h-full`}>
            <MobilePlayerContent song={song} />
            <DesktopPlayerContent song={song} />
        </div>
    );
}

export default PlayerContentWrapper;
