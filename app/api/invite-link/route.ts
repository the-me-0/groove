import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {InviteLink} from "@prisma/client";

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

        const inviteLink: InviteLink = await db.inviteLink.create({
            data: {}
        });

        return NextResponse.json({
            'message': 'Invite link created. Follow the complete link to create the new account !',
            'complete-link': `http://localhost:3000/sign-up?invite-link=${inviteLink.value}`,
            'raw-value': inviteLink
        });
    } catch (error) {
        console.log('[INVITE_LINK_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}