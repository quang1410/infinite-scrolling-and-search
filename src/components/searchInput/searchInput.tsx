import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useDebounce } from '../../hooks/useDebounce';
import styles from './searchInput.module.css'

type Props = {
    type: string;
    placeholder: string;
    className?: string;
    fetchSearch: (value: string) => void;
}

const SearchInput = (props: Props) => {
    const { type, placeholder, fetchSearch } = props;

    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 300);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const valueSearch = event.target.value;
        setValue(valueSearch);
    };

    useEffect(() => {
        fetchSearch(debouncedValue);
    }, [debouncedValue]);

    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                className={styles.search_input}
            />
        </div>
    )
}

export default SearchInput