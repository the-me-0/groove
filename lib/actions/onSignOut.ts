'use server';

import {signOut} from '@/auth';

export const onSignOut = async () => {
  await signOut();
}
