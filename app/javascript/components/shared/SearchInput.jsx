import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import {useTranslation} from "react-i18next";
const SearchInput = ({ onSearch, placeholder, disabled }) => {
    const {t} = useTranslation("translation", { keyPrefix: "components.shared.SearchInput" });

    const [query, setQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(query);
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
            placeholder={placeholder || t("placeholder")}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
};

export default SearchInput;
