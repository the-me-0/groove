import { Profile } from "@prisma/client";
import { auth } from '@/auth';
import { getProfileById } from '@/lib/actions/profile';
import {redirect} from 'next/navigation';

const getUserSession = async (): Promise<null | string> => {
    const session = await auth();

    if (!session || !session.user) return null;

    return session.user.id;
}

const currentProfile = async (): Promise<Profile> => {
    const sessionId = await getUserSession();

    if (!sessionId) {
        console.error('[CURR_PROFILE]', 'No session found');
        redirect('/logout');
    }

    // Look for a profile that matches user's id
    const profile = await getProfileById(sessionId);

    if (!profile) {
        console.error('[CURR_PROFILE]', 'No profile found for sessionId', sessionId);
        redirect('/logout');
    }

    return profile;
}

export { getUserSession, currentProfile };
