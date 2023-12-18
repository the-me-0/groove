'use client';

import qs from 'query-string';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from '@/lib/components/input';

import useDebounce from '@/hooks/use-debounce';

interface SearchInputProps {
    inputPlaceholder?: string;
    setInputText?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  inputPlaceholder,
  setInputText
}) => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      query: debouncedValue,
    };

    if (setInputText) {
      setInputText(query.query);
    } else {
      const url = qs.stringifyUrl({
        url: '/search',
        query
      });

      router.push(url);
    }
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder={inputPlaceholder || 'What do you want to listen to?'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SearchInput;