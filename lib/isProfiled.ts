import { auth } from '@/auth';

export const isProfiled = async (): Promise<boolean> => {
  const session = await auth();

  // Will return true if the user is connected
  return Boolean(session && session.user);
}
