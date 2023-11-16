import { PrismaClient } from '@prisma/client';

declare global {
    let prisma: PrismaClient | undefined;
}

// The whole "globalThis" section is about not creating lots of prisma clients on hot reloads :
//      with the adjustment below, one PrismaClient is created per npm run dev ;
//      if we removed the "globalThis" thing, a client would be created each time we modify a file while npm run dev is running.
// @ts-ignore
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") { // @ts-ignore
    globalThis.prisma = db;
}