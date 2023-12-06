"use client";

import {useEffect, useState} from "react";
import {ExampleModal} from "@/lib/components/modals/example-modal";
import {UploadModal} from "@/lib/components/modals/upload-modal";

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
            <ExampleModal />
            <UploadModal />
        </>
    );
}

export default ModalProvider;
