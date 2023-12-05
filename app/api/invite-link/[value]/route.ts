import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { value: string } }
) {
    try {
        if (!params.value) {
            return new NextResponse('Invite link value missing', { status: 400 });
        }

        const inviteLink = await db.inviteLink.findUnique({
            where: {
                value: params.value
            }
        });

        if (!inviteLink) {
            console.log('[INVITE_LINK_GET] - tried to access with invalid link');
            return new NextResponse('Invite link does not exist', { status: 404 });
        }

        return NextResponse.json(inviteLink);
    } catch (error) {
        console.log('[INVITE_LINK_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
