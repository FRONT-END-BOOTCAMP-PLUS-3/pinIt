'use client';

import React, { useEffect, useState } from 'react';
import styles from './ComboBox.module.scss';
import Icon from '@/components/Icon/Icon';

export interface ComboBoxOption {
  id: string;
  topic: string;
  startDate?: Date;
  endDate?: Date;
}

const ComboBox = ({
  options, // 콤보 박스 옵션 (제목, 시작날짜?, 끝나는 날짜?)
  selectedOption, // 선택된 옵션 (useState)
  setSelectedOption, // 선택된 옵션 바꾸기 (useState)
}: {
  options: ComboBoxOption[] | undefined;
  selectedOption: ComboBoxOption | null;
  setSelectedOption: (option: ComboBoxOption | null) => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const STORAGE_KEY = 'selectedComboBoxOption';

  const handleOnClickComboBox = () => {
    setIsOpened((prevState) => !prevState);
  };

  const handleOnClickOption = (option: ComboBoxOption) => {
    setSelectedOption(option);
    setIsOpened(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(option));
  };

  useEffect(() => {
    const savedOptionJSON = localStorage.getItem(STORAGE_KEY);
    if (savedOptionJSON) {
      const parsedOption = JSON.parse(savedOptionJSON);
      setSelectedOption(parsedOption);
    } else if (options?.length) {
      setSelectedOption(options[0]);
    }
  }, [options, setSelectedOption]);

  return (
    <div className={`${styles.combo_box}`}>
      <button
        type='button'
        className={styles.button}
        onClick={handleOnClickComboBox}
      >
        <span className={styles.ellipsis_box}>
          <span>
            {selectedOption?.topic}{' '}
            {selectedOption?.startDate && selectedOption?.endDate && (
              <strong>
                (
                {new Date(selectedOption.startDate).toISOString().split('T')[0]}{' '}
                ~{' '}
                {new Date(selectedOption.startDate).toISOString().split('T')[0]}
                )
              </strong>
            )}
          </span>
          <Icon
            id={isOpened ? 'up' : 'down'}
            width={17}
            height={17}
            color='#fff'
          />
        </span>
      </button>
      <ul
        className={`${styles.toggle_list} ${isOpened ? styles.open : styles.close}`}
        style={{ display: isOpened ? 'block' : 'none' }}
      >
        {options?.map((option) => (
          <li key={option.topic} onClick={() => handleOnClickOption(option)}>
            <span className={styles.ellipsis_box}>
              <span>
                {option.topic}{' '}
                {option.startDate && option.endDate && (
                  <strong>
                    ({new Date(option.startDate).toISOString().split('T')[0]} ~{' '}
                    {new Date(option.startDate).toISOString().split('T')[0]})
                  </strong>
                )}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComboBox;
