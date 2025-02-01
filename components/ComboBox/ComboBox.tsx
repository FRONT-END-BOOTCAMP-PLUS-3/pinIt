"use client";

import React, { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./ComboBox.module.scss";

interface ComboBoxOption {
    optionName: string;
    /* 챌린지 주제 관련 옵션 */
    optionPeriodStart?: string;
    optionPeriodEnd?: string;
    /* 리스트 데이터 관련 옵션 */
    optionData?: any;
}

interface ComboBoxProps {
  options: ComboBoxOption[];
  onSelect: (option: ComboBoxOption, index: number) => void;
  sub?: boolean;
  localStorageKey: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSelect, sub = false, localStorageKey }) => {
    // localStorage에서 저장된 selectedOptionIndex 가져오기
    const savedOptionIndex = localStorage.getItem(localStorageKey);

    // 초기 선택 상태 설정
    const initialSelectedOption = savedOptionIndex && !isNaN(parseInt(savedOptionIndex))
        ? options[parseInt(savedOptionIndex)]
        : options[0];

    const [selected, setSelected] = useState(initialSelectedOption);
    const [isOpened, setIsOpened] = useState(false);

    const handleToggle = () => {
        setIsOpened(prevState => !prevState);
    };

    const handleClick = (option: ComboBoxOption, index: number) => {
        setSelected(option);
        setIsOpened(false);
        onSelect(option, index);
    }

    useEffect(() => {
        // selectedOption이 변경될 때마다 localStorage에 저장
        const selectedIndex = options.indexOf(selected);
        if (selectedIndex !== -1) {
            localStorage.setItem(localStorageKey, selectedIndex.toString());
        }
    }, [selected, options, localStorageKey]);

    return (
        <div className={`${styles.combo_box} ${sub ? styles.sub : ""}`}>
            <button type="button" onClick={handleToggle}>
                <span className={styles.ellipsis_box}>
                    <span>
                        {selected?.optionName}
                        {selected?.optionPeriodStart && selected?.optionPeriodEnd && (
                            <strong>({selected.optionPeriodStart} ~ {selected.optionPeriodEnd})</strong>
                        )}
                    </span>
                    <Icon id={isOpened ? "up" : "down"} width={17} height={17} color="#fff" />
                </span>
            </button>
            <ul className={styles.toggle_list} style={{display: isOpened ? "block" : "none"}}>
                {options.map((option, index) => (
                    <li key={option.optionName} onClick={() => handleClick(option, index)}
                    className={`${selected?.optionName === option.optionName ? styles.on : ""}`}>
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