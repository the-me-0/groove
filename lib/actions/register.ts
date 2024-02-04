'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/lib/schemas';
import { Profile } from '@prisma/client';
import { getProfileByEmail } from '@/lib/actions/profile';
import { getSponsorshipByValue } from '@/lib/actions/sponsorship';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { username, sponsorship, email, password } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  // make sure the sponsorship exists
  const existingSponsorship = await getSponsorshipByValue(sponsorship);
  if (!existingSponsorship) {
    return { error: 'Invalid sponsorship!' };
  }

  // make sure the email is unique
  const existingProfile: Profile | null = await getProfileByEmail(email);
  if (existingProfile) {
    return { error: 'Email already exists' };
  }

  console.log('[REGISTER] Using sponsorship key to create user "', username, '", with mail "', email, '"');

  await db.profile.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  // one use only sponsorship
  await db.sponsorship.delete({
    where: {
      id: existingSponsorship.id
    }
  });

  // TODO: Send verification token email

  return { success: 'User created!' };
}