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
import {Input} from "@/lib/shadcn-components/ui/input";
import Button from "@/lib/components/Button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/lib/shadcn-components/ui/form";

export const EditPlaylistModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'edit-playlist';

  // Image rules
  const MAX_IMAGE_SIZE = 5; // 5 MB
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  const formSchema = z.object({
    name: z.optional(z.string()),
    image: z.optional(z.custom<File>()
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
      ))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof  formSchema>) => {
    try {
      if (!data.playlist || (!values.image && !values.name)) {
        // User has not changed the values, return empty.
        onClose();
        return;
      }

      const formData = new FormData();
      if (values.name) formData.append('name', values.name);
      if (values.image) formData.append('image', values.image);

      const response = await axios.patch(`/api/playlist/${data.playlist.id}`, formData);

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
            Edit playlist
          </DialogTitle>
          <DialogDescription className='text-md text-center'>
            Name it change its image
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
                          placeholder={data?.playlist?.name || 'Enter playlist name'}
                          {...someField}
                          onChange={onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* ~~~~~~~~~~~~ SUBMIT ~~~~~~~~~~~~ */}
              <DialogFooter>
                <Button disabled={isLoading} type='submit'>
                  Edit
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}