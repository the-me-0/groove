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
import { useUser } from "@/hooks/use-user";
import {useRouter} from "next/navigation";
import SearchInput from "@/lib/components/SearchInput";
import {Song} from "@prisma/client";

export const CreatePlaylistModal = () => {
  const router = useRouter();
  const userContext = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [songs, setSongs] = useState<Song[]>([]);

  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      image: null
    }
  });

  const isModalOpen = isOpen && type === 'create-playlist';

  const onChange = () => {
    reset();
    onClose();
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];

      if (!imageFile || !userContext.user) {
        toast.error('Missing fields');
        return;
      }

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image', imageFile);
      formData.append('songs', songs.map((song) => song.id));

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
            Create a playlist
          </DialogTitle>
          <DialogDescription className='text-md text-center'>
            Name it & add songs
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
            <div className='w-full p-2 rounded-lg bg-neutral-800'>
              <SearchInput inputPlaceholder={'Search songs to add...'} />
            </div>
            <div>

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