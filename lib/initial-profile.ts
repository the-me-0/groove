import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { Profile } from "@prisma/client";

export const initialProfile = async (): Promise<Profile & { justCreated: boolean }> => {
  const user = await currentUser();

  // User is not connected, redirect to the login/sign-in page
  if (!user) return redirectToSignIn();

  // Look for a profile that matches user's id
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });

  // If a profile for this user already exists in the database, return this profile
  if (profile) return { ...profile && { justCreated: false } };

  // Then no profile exists for this user yet, we create one
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: user.username,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return { ...newProfile && { justCreated: true } };
}