import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from "next-auth"
import bcrypt from 'bcryptjs';

import { LoginSchema } from '@/lib/schemas';
import { getProfileByEmail } from '@/lib/actions/profile';
import {NextRequest, NextResponse} from 'next/server';
import type {Awaitable, Session} from '@auth/core/types';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const profile = await getProfileByEmail(email);
          if (!profile || !profile.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            profile.password
          );

          if (passwordsMatch) return profile;
        }

        return null;
      },
    })
  ]
} satisfies NextAuthConfig;
