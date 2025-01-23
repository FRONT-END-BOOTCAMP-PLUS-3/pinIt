"use client";

import React, { useState } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./SearchInput.module.scss";

const SearchInput = () => {
    const DEFAULT_VALUE = "검색";
    const [value, setValue] = useState(DEFAULT_VALUE);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleFocus = () => {
        if (!isFocused) {
            setValue(""); // 포커스 시 초기값을 지움
            setIsFocused(true);
        }
    }

    const handleBlur = () => {
        if (value.trim() === "") {
            setValue(DEFAULT_VALUE); // 값이 비어있을 경우 초기값으로 되돌림
            setIsFocused(false);
        }
    };

    return (
        <div className={styles.wrap_search}>
            <h1 className={styles.icon}>
                <Icon id="search" color="#fff" width={24} height={24} />
            </h1>
            <div className={styles.inner_search}>
                <input type="text" value={value} className={styles.input_box} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
        </div>
    );
}

export default SearchInput;