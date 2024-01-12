import { db } from '@/lib/db';
import { Sponsorship } from '@prisma/client';

export const getSponsorshipByValue = async (value: string): Promise<Sponsorship | null> => {
  try {
    const sponsorship = await db.sponsorship.findUnique({
      where: {
        value,
      },
    });
    return sponsorship;
  } catch (error) {
    return null;
  }
}
