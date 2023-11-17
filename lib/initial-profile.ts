import {currentUser, redirectToSignIn} from '@clerk/nextjs';
import {db} from '@/lib/db';

export const initialProfile = async () => {
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
  if (profile) return profile;

  // Then no profile exists for this user yet, we create one
  return db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });
}