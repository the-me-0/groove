import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {InviteLink} from "@prisma/client";

export async function GET(
    req: Request,
    { params }: { params: { value: string } }
) {
    try {
        if (!params.value) {
            return new NextResponse('Invite link value missing', { status: 400 });
        }

        const inviteLink: InviteLink | null = await db.inviteLink.findUnique({
            where: {
                value: params.value
            }
        });

        if (!inviteLink) {
            console.log('[INVITE_LINK_GET] - tried to access with invalid link');
            return new NextResponse('Invite link does not exist', { status: 401 });
        } else {
            console.log(`Using invite-link, expires the ${inviteLink.expiresAt.getDate()} and we are ${new Date().getDate()}`);
        }

        // TODO - if expired, return 401 status

        // As an invite-link can only be used once, we delete this one
        await db.inviteLink.delete({
            where: {
                id: inviteLink.id
            }
        });

        return NextResponse.json(inviteLink);
    } catch (error) {
        console.log('[INVITE_LINK_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
