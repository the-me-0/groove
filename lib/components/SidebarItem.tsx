import React from 'react';
import {IconType} from 'react-icons';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon, active, label, href
}) => {
    return (
        <Link
            href={href}
            className={twMerge(`
                flex flex-row items-center
                h-auto w-full gap-x-4 py-1
                text-md font-medium
                cursor-pointer
                hover:text-white text-neutral-400
                transition
            `,
                active && 'text-white'
            )}
        >
            <Icon size={26} />
            <p className='truncate w-full'>{label}</p>
        </Link>
    )
}

export default SidebarItem;
