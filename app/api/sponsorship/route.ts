import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Sponsorship } from "@prisma/client";

export async function POST(
    req: Request
) {
    try {
        // TODO - possible to create one with ApiKey OR if connected

        const { searchParams } = new URL(req.url);

        const apiKey = searchParams.get('api-key');

        if (!apiKey) {
            return new NextResponse('ApiKey is needed', { status: 400 });
        }

        if (apiKey !== process.env.API_KEY) {
            return new NextResponse('Wrong ApiKey', { status: 401 });
        }

        const sponsorship: Sponsorship = await db.sponsorship.create({
            data: {}
        });

        let completeLink = `${req.url.split('/api')[0]}/auth/register?sponsorship=${sponsorship.value}`;
        if (process.env.NODE_ENV === 'production') {
            completeLink = `${process.env.PRODUCTION_URL}auth/register?sponsorship=${sponsorship.value}`;
        }

        return NextResponse.json({
            'message': 'Sponsorship link created. Follow the complete link to create the new account !',
            'complete-link': completeLink,
            'raw-value': sponsorship.value
        });
    } catch (error) {
        console.log('[INVITE_LINK_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}