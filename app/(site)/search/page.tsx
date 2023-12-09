import React from "react";
import getSongsByQuery from "@/lib/actions/getSongsByQuery";
import Header from "@/lib/components/Header";
import SearchInput from "@/lib/components/SearchInput";
import SearchContent from "../../../lib/components/SearchContent";

export const revalidate = 0;

interface SearchProps {
    searchParams: {
        query: string;
    }
}

const Search = async ({
    searchParams
}: SearchProps) => {
    const songs = await getSongsByQuery(searchParams.query);

    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
            <Header className='from-bg-neutral-900'>
                <div className='mb-2 flex flex-col gap-y-6'>
                    <h1 className='text-white text-3xl font-semibold'>
                        Search
                    </h1>
                    {/* Search input will set the query in the url */}
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    );
}

export default Search;
