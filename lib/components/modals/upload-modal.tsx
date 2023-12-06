"use client";

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/lib/shadcn-components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import {useState} from 'react';
import {useRouter} from "next/navigation";

export const UploadModal = () => {
    const router = useRouter();
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === 'upload';

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText('copied');
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            // const response = await axios.patch(``);

            // Call this same modal with refreshed data
            router.refresh();
            onOpen('upload', {});
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Add a song
                    </DialogTitle>
                    <DialogDescription className='text-md text-center'>
                        Upload a mp3 file
                    </DialogDescription>
                </DialogHeader>
                <div className='p-6'>
                    Form
                </div>
            </DialogContent>
        </Dialog>
    )
}