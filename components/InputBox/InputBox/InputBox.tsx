"use client";

import React, { useState } from "react";
import styles from "./InputBox.module.scss";

const InputBox = ({value} : {value: string}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFocus = () => {
        if (!isFocused) {
            setInputValue(""); // 포커스 시 초기값을 지움
            setIsFocused(true);
        }
    };

    const handleBlur = () => {
        if (inputValue.trim() === "") {
            setInputValue(value); // 값이 비어있을 경우 초기값으로 되돌림
        }
        setIsFocused(false);
    };

    return (
        <div className={styles.input_box}>
            <input type="text" value={inputValue} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
    );
}

export default InputBox;