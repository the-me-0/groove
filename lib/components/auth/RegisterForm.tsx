'use client';

import { useForm } from 'react-hook-form';
import {useEffect, useState, useTransition} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RegisterSchema } from '@/lib/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/shadcn-components/ui/form';
import { CardWrapper } from '@/lib/components/auth/CardWrapper';
import { Input } from '@/lib/shadcn-components/ui/input';
import { Button } from '@/lib/shadcn-components/ui/button';
import { FormError } from '@/lib/components/FormError';
import { FormSuccess } from '@/lib/components/FormSuccess';
import { register } from '@/lib/actions/register';

interface RegisterFormProps {
  sponsorship: string | null;
}

export const RegisterForm = ({
  sponsorship
}: RegisterFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      sponsorship: sponsorship || '',
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // clear messages
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data?.error || '');
          setSuccess(data?.success || '');
        })
    });
  }

  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel="Already have an account ?"
      backButtonHref='/auth/login'
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='John Doe'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sponsorship'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sponsorship key</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='2d65e49e-b83c-45cb-b171-7872afefbb83'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type='submit'
            className='w-full'
            disabled={isPending}
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
