import {useEffect, useMemo, useState} from "react";
import {Song} from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);

        axios.get(`/api/song/${id}`)
            .then((response) => {
                setSong(response.data as Song);
            })
            .catch((error) => {
                toast.error('Failed to load a song.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
}

export default useGetSongById;
