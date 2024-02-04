import { Profile } from "@prisma/client";
import { auth } from '@/auth';
import { getProfileById } from '@/lib/actions/profile';
import {redirect} from 'next/navigation';

export const currentProfile = async (): Promise<Profile> => {
    const session = await auth();

    // User is not connected, redirect to the login/sign-in page
    if (!session || !session.user) throw new Error('User not connected');

    // Look for a profile that matches user's id
    const profile = await getProfileById(session.user.id)

    if (!profile) {
        console.error('[CURR_PROFILE]', 'No profile found for user', session.user.id);
        redirect('/logout');
    }

    return profile;
}