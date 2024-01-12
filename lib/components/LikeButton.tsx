'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import axios from "axios";
import {twMerge} from "tailwind-merge";

interface LikeButtonProps {
    songId: string;
    size?: number;
    className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    songId,
    size,
    className
}) => {
    const router = useRouter();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/song/${songId}/like`);

                if (response.status === 200 && response.data !== 'Not liked') {
                    setIsLiked(true);
                }
            } catch (error) {/* Error is usually because the get request can throw a 404 */}
        }

        fetchData();
    }, [songId]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (isLiked) {
            const response = await axios.delete(`/api/song/${songId}/like`);

            if (response.status !== 200) {
                toast.error('Failed to remove this favorite');
            } else {
                setIsLiked(false);
            }
        } else {
            const response = await axios.post(`/api/song/${songId}/like`);

            if (response.status !== 200) {
                toast.error('Failed to add this favorite');
            } else {
                setIsLiked(true);
                toast.success('Added this favorite !');
            }
        }

        router.refresh();
    }

    return (
        <button
            className={twMerge('cursor-pointer hover:opacity-75 transition', className)}
            onClick={handleLike}
        >
            <Icon color={isLiked ? '#22c55e' : 'white'} size={size || 25} />
        </button>
    );
}

export default LikeButton;