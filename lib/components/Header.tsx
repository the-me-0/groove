'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {twMerge} from 'tailwind-merge';
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx';
import {HiHome} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi';
import Button from '@/lib/components/Button';
import {UserButton} from '@clerk/nextjs';
import {neobrutalism} from '@clerk/themes';
import toast from "react-hot-toast";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();

    return (
        <div
            className={twMerge(`
                h-fit
                bg-gradient-to-b
                from-emerald-800
                p-6
            `,
                className
            )}
        >
            <div className='w-full mb-4 flex items-center justify-between'>
                <div className='hidden md:flex gap-x-2 items-center'>
                    <button
                        onClick={() => router.back()}
                        className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
                    >
                        <RxCaretLeft className='text-white' size={45}/>
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
                    >
                        <RxCaretRight className='text-white' size={45}/>
                    </button>
                </div>

                <div className='flex md:hidden gap-x-2 items-center'>
                    <button
                        onClick={() => router.push('/')}
                        className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
                    >
                        <HiHome className='text-black' size={20} />
                    </button>
                    <button
                        onClick={() => router.push('/search')}
                        className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
                    >
                        <BiSearch className='text-black' size={20} />
                    </button>
                </div>

                <div className='flex justify-between items-center gap-x-4'>
                    <>
                    {/* <div>
                            <Button
                                onClick={() => {}}
                                className='bg-transparent text-neutral-300 font-medium'
                            >
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => {}}
                                className='bg-white px-6 py-2'
                            >
                                Log in
                            </Button>
                        </div> */}
                        <div>
                            <Button
                                onClick={() => toast.error('Not available yet')}
                                className='bg-transparent text-neutral-300 font-medium'
                            >
                                Get the android App
                            </Button>
                        </div>
                        { /* <ModeToggle /> */ }
                        <UserButton
                          afterSignOutUrl='/'
                          appearance={{
                              baseTheme: neobrutalism,
                              variables: {
                                  colorBackground: '#005B41',
                                  colorText: 'white',
                                  colorPrimary: 'white' // transparent is also an option
                              }
                          }}
                        />
                    </>
                </div>
            </div>

            {children}
        </div>
    );
}

export default Header;
