import { db } from '@/lib/db';

export const getProfileByEmail = async (email: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        email,
      },
    });
    return profile;
  } catch (error) {
    return null;
  }
}

export const getProfileById = async (id: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        id,
      },
    });
    return profile;
  } catch (error) {
    return null;
  }
}
