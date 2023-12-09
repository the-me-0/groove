'use client';

import qs from 'query-string';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from '@/lib/components/input';

import useDebounce from '@/hooks/use-debounce';

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            query: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <Input
            placeholder='What do you want to listen to?'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export default SearchInput;