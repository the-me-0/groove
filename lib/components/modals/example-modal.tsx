"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/shadcn-components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/lib/shadcn-components/ui/label';
import { Input } from '@/lib/shadcn-components/ui/input';
import { Button } from '@/lib/shadcn-components/ui/button';
import {Check, Copy, RefreshCw} from 'lucide-react';
import {useOrigin} from '@/hooks/use-origin';
import {useState} from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";

export const ExampleModal = () => {
    const router = useRouter();

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === 'example';

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
            onOpen('example', {});
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
                        Example modal
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                        Server invite link
                    </Label>
                    <div className='flex items-center mt-2 gap-x-2'>
                        <Input
                            disabled={isLoading}
                            className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                            value={'test-modal-text'}
                        />
                        <Button disabled={isLoading} size='icon' onClick={onCopy}>
                            {copied
                                ? <Check className='w-4 h-4' />
                                : <Copy className='w-4 h-4' />
                            }
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={isLoading}
                        variant='link'
                        size='sm'
                        className='text-xs text-zinc-500 mt-4'
                    >
                        Generate a new link
                        <RefreshCw className='w-4 h-4 ml-2' />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}