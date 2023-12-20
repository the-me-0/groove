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
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useState} from "react";
import {Input} from "@/lib/shadcn-components/ui/input";
import Button from "@/lib/components/Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/use-user";
import {useRouter} from "next/navigation";
import SearchInput from "@/lib/components/SearchInput";
import {Song} from "@prisma/client";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/lib/shadcn-components/ui/form";

export const CreatePlaylistModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const userContext = useUser();
  const [songs, setSongs] = useState<Song[]>([]);

  const isModalOpen = isOpen && type === 'create-playlist';

  // Image rules
  const MAX_IMAGE_SIZE = 5; // 5 MB
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  const formSchema = z.object({
    name: z.string().min(1, {
      message: 'Playlist name is required.'
    }),
    image: z.custom<File>()
      .refine(
        (file) => file !== undefined, {
          message: 'Please provide an image.'
        }
      )
      .refine(
        (file) => !file || (!!file && file.size <= MAX_IMAGE_SIZE*1048576), // *1024*1024
        {
          message: `The playlist picture must be a maximum of ${MAX_IMAGE_SIZE}MB.`,
        }
      )
      .refine(
        (file) => ALLOWED_IMAGE_TYPES.includes(file?.type),
        "Only these types are allowed .jpg, .jpeg, .png and .webp"
      ),
    songsId: z.array(z.string()) // no refine because we handle this one directly in this component
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof  formSchema>) => {
    try {
      if (!userContext.user) {
        toast.error("Couldn't find user");
        return;
      }

      if (!songs.length) {
        toast.error("Please select at least one song.");
        return;
      }

      if (!form.getValues().image) {
        toast.error("Please select a background image !");
        return;
      }

      const response = await axios.post('/api/playlists', values);

      if (response.status !== 200) {
        return toast.error('Song upload failed.');
      }

      toast.success('Playlist created !');

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-neutral-900 text-white overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create a playlist
          </DialogTitle>
          <DialogDescription className='text-md text-center'>
            Name it & add songs
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-4'
          >
            <div className="space-y-8">
              {/* ~~~~~~~~~~~~ IMAGE UPLOAD ~~~~~~~~~~~~ */}
              <div>
                <div className='pb-1'>
                  Select an image
                </div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange }, ...field }) => {
                    // Passing fieldState and formState to the Input seem to provoke errors in console
                    const { fieldState, formState, ...someField } = field;

                    return (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        {/* File Upload */}
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            disabled={form.formState.isSubmitting}
                            { ...someField }
                            onChange={(event) => onChange(event.target.files ? event.target.files[0] : null)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* ~~~~~~~~~~~~ NAME ~~~~~~~~~~~~ */}
              <FormField
                control={form.control}
                name={'name'}
                render={({ field: { onChange }, ...field }) => {
                  // Passing fieldState and formState to the Input seem to provoke errors in console
                  const {fieldState, formState, ...someField} = field;

                  return (
                    <FormItem>
                      <FormLabel>
                        Playlist name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={'Enter playlist name'}
                          {...someField}
                          onChange={onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* ~~~~~~~~~~~~ SONGS SELECTION ~~~~~~~~~~~~ */}
              <div className='w-full p-2 rounded-lg bg-neutral-800'>
                {/* ModalSearchInput -> onOpen('xxxxx', data) */}
                <SearchInput inputPlaceholder={'Search songs to add...'}/>
              </div>
              <div>

              </div>
              {/* ~~~~~~~~~~~~ SUBMIT ~~~~~~~~~~~~ */}
              <DialogFooter>
                <Button disabled={isLoading} type='submit'>
                  Create
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}