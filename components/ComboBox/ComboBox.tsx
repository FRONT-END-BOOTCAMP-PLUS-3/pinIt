"use client";

import React, { useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./ComboBox.module.scss";

interface ComboBoxOptions {
    options: string[];
}

const ComboBox: React.FC<ComboBoxOptions> = ({ options }) => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpened, setIsOpened] = useState(false);

    const handleToggle = () => {
        setIsOpened(prevState => !prevState);
    };

    const handleClick = (option: string) => {
        setSelected(option);
        setIsOpened(false);
    }

    return (
        <div className={styles.combo_box}>
            <button type="button" onClick={handleToggle}>
                <span>{selected}</span>
                <Icon id={isOpened ? "right" : "left"} width={17} height={17} color="#fff" />
            </button>
            <ul className={styles.toggle_list} style={{display: isOpened ? "block" : "none"}}>
                {options.map(option => (
                    <li key={option} onClick={() => handleClick(option)}
                    className={`${
                        selected === option ? styles.on : ""
                    }`}>{option}</li>
                ))}
            </ul>
        </div>
    );
}

// 사용예시
// const OPTIONS = ["전체 게시글", "챌린지에 등록된 핀", "챌린지 주제"];
// return (... <ComboBox options={OPTIONS} /> ...);

export default ComboBox;