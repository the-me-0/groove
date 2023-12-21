"use client";

import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from '@/lib/components/Box';
import SidebarItem from '@/lib/components/SidebarItem';
import Library from '@/lib/components/Library';
import {Playlist, Song} from "@prisma/client";
import usePlayer from "@/hooks/player/use-player";
import {twMerge} from "tailwind-merge";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
    playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
    songs,
    playlists
}) => {
    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/'
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search'
        }
    ], [pathname]);

    return (
        <div className={twMerge('flex h-full', player.activeId && 'h-[calc(100%-80px)]')}>
            <div className='hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2'>
                <Box>
                    <div className='flex flex-col gap-y-4 px-5 py-4'>
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library songs={songs} playlists={playlists}/>
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </div>
    );
}

export default Sidebar;
