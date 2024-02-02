"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/lib/shadcn-components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import Input from "@/lib/components/input";
import Button from "@/lib/components/Button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export const UploadModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    });

    const isModalOpen = isOpen && type === 'upload';

    const onChange = () => {
        reset();
        onClose();
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile) {
                toast.error('Missing fields');
                return;
            }

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('author', values.author);
            formData.append('songFile', songFile);
            formData.append('imageFile', imageFile);

            const response = await fetch('/api/song', {
                method: 'POST',
                body: formData,
            });

            if (response.status !== 200) {
                return toast.error('Song upload failed.');
            }

            router.refresh();
            toast.success('Song created !');
            reset();
            onClose();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onChange}>
            <DialogContent className='bg-neutral-900 text-white overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Add a song
                    </DialogTitle>
                    <DialogDescription className='text-md text-center'>
                        Upload a mp3 file
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-y-4'
                >
                    <div className="space-y-8">
                        <Input
                            id='title'
                            disabled={isLoading}
                            {...register('title', {required: true})}
                            placeholder='Song title'
                        />
                        <Input
                            id='author'
                            disabled={isLoading}
                            {...register('author', {required: true})}
                            placeholder='Song author'
                        />
                        <div>
                            <div className='pb-1'>
                                Select a song file
                            </div>
                            <Input
                                id='song'
                                type='file'
                                disabled={isLoading}
                                accept='.mp3'
                                {...register('song', {required: true})}
                            />
                        </div>
                        <div>
                            <div className='pb-1'>
                                Select an image
                            </div>
                            <Input
                                id='image'
                                type='file'
                                disabled={isLoading}
                                accept='image/*'
                                {...register('image', {required: true})}
                            />
                        </div>
                        <DialogFooter>
                            <Button disabled={isLoading} type='submit'>
                                Create
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}