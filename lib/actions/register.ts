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

  await db.profile.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email
  // TODO: Delete sponsorship link (unique use)

  return { success: 'User created!' };
}