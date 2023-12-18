"use client";

import {useEffect, useState} from "react";
import {UploadModal} from "@/lib/components/modals/upload-modal";
import {CreatePlaylistModal} from "@/lib/components/modals/create-playlist-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <UploadModal />
            <CreatePlaylistModal />
        </>
    );
}

export default ModalProvider;
