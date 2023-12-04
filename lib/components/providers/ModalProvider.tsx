"use client";

import {useEffect, useState} from "react";
import {ExampleModal} from "@/lib/components/modals/example-modal";

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
        </>
    );
}

export default ModalProvider;
