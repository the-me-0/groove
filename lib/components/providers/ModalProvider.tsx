"use client";

import {useEffect, useState} from "react";
import {UploadModal} from "@/lib/components/modals/upload-modal";
import {NewUploadModal} from "@/lib/components/modals/new-upload-modal";
import {EditPlaylistModal} from "@/lib/components/modals/edit-playlist-modal";

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
            <NewUploadModal />
            <EditPlaylistModal />
        </>
    );
}

export default ModalProvider;
