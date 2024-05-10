import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
const SearchInput = ({ handleFetch, disabled }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleFetch(query);
            // Send Axios request here
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [query])

    const handleSearch = async (q) => {
        setQuery(q)
    };

    return (
        <Form.Control
            disabled={disabled}
            type="text"
            className="mb-3"
            placeholder="Search videos"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
};

export default SearchInput;
