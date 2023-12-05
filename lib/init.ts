import { db } from "@/lib/db";
import { ApiKey } from "@prisma/client";

export default async function init() {
    console.log("💿 Welcome to GROOVE !");

    let apiKey: ApiKey | null = await db.apiKey.findFirst({});

    if (!apiKey) {
        // create a new one
        console.log("Creating ApiKey...");
        apiKey = await db.apiKey.create({
            data: {}
        });
    } else if (apiKey.createdAt.valueOf()+(60*60*24) <= new Date().valueOf()) {
        // api key is too old, we have to delete it and create a new one
        console.log("Deleting old ApiKey...");
        await db.apiKey.delete({
            where: {
                id: apiKey.id
            }
        });
        console.log("Creating ApiKey...");
        apiKey = await db.apiKey.create({
            data: {}
        });
    }

    console.log('  ~ ApiKey', apiKey?.value);
}