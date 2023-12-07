import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { Profile } from "@prisma/client";

export const currentProfile = async (): Promise<Profile | null> => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    return db.profile.findUnique({
        where: {
            userId
        }
    });
}