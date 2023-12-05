import {NextResponse} from "next/server";
import {db} from "@/lib/db";

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

        // TODO - check if api key is valid

        const inviteLink = await db.inviteLink.create({
            data: {}
        });

        return NextResponse.json(inviteLink);
    } catch (error) {
        console.log('[INVITE_LINK_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}