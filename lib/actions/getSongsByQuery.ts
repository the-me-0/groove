'use server';

import {Song} from "@prisma/client";
import {db} from "@/lib/db";
import getSongs from "@/lib/actions/getSongs";

const getSongsByQuery = async (query: string): Promise<Song[]> => {
    if (!query) {
        return await getSongs();
    }

    // TODO - search is a security fault. Searching '*:' will cause postgresql error
    query = query.replace(/[^a-zA-Z ]/g, "");
    // I don't know how to fix that
    // remove characters that are not numbers or letters ? Will that now be a problem for some songs ?

    // We have to detect spaces and replace them
    const splitQuery = query.split(' ');
    let definitiveQuery = '';
    splitQuery.forEach((part) => {
        // If it's not the first part (definitiveQuery not '*:') AND part is not empty, we add the separator
        if (definitiveQuery && part) {
            definitiveQuery += ' | ';
        }
        definitiveQuery += part;
        // If we have a word, add this to match partial words
        if (part) {
            definitiveQuery += ':*';
        }
    });

    const songs = await db.song.findMany({
        where: {
            OR: [{
                name: {
                    search: definitiveQuery,
                    mode: 'insensitive'
                }
            }, {
                artist: {
                    search: definitiveQuery,
                    mode: 'insensitive'
                }
            }]
        },
        orderBy: {
            _relevance: {
                fields: ['name', 'artist'],
                search: definitiveQuery,
                sort: 'asc'
            }
        }
    });

    return songs;
}

export default getSongsByQuery;
