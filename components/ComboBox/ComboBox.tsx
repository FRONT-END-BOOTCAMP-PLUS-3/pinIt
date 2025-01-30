"use client";

import React, { JSX, useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./ComboBox.module.scss";

interface ComboBoxOptions {
    optionName: string;
    optionComponent?: JSX.Element;
    /* 챌린지 주제 관련 옵션 */
    optionPeriodStart?: string;
    optionPeriodEnd?: string;
    /* 리스트 데이터 관련 옵션 */
    optionData?: any;
}

interface ComboBoxProps {
  options: ComboBoxOptions[];
  onSelect: (option: ComboBoxOptions) => void;
  sub?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSelect, sub = false }) => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpened, setIsOpened] = useState(false);

    const handleToggle = () => {
        setIsOpened(prevState => !prevState);
    };

    const handleClick = (option: ComboBoxOptions) => {
        setSelected(option);
        setIsOpened(false);
        onSelect(option);
    }

    return (
        <div className={`${styles.combo_box} ${sub ? styles.sub : ""}`}>
            <button type="button" onClick={handleToggle}>
                <span className={styles.ellipsis_box}>
                    <span>
                        {selected.optionName}
                        {selected.optionPeriodStart && selected.optionPeriodEnd && (
                            <strong>({selected.optionPeriodStart} ~ {selected.optionPeriodEnd})</strong>
                        )}
                    </span>
                    <Icon id={isOpened ? "up" : "down"} width={17} height={17} color="#fff" />
                </span>
            </button>
            <ul className={styles.toggle_list} style={{display: isOpened ? "block" : "none"}}>
                {options.map(option => (
                    <li key={option.optionName} onClick={() => handleClick(option)}
                    className={`${selected.optionName === option.optionName ? styles.on : ""}`}>
                        <span className={styles.ellipsis_box}>
                        <span>
                        {option.optionName}
                        {option.optionPeriodStart && option.optionPeriodEnd && (
                            <strong>({option.optionPeriodStart} ~ {option.optionPeriodEnd})</strong>
                        )}
                        </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 사용예시
// const OPTIONS = ["전체 게시글", "챌린지에 등록된 핀", "챌린지 주제"];
// return (... <ComboBox options={OPTIONS} /> ...);

export default ComboBox;