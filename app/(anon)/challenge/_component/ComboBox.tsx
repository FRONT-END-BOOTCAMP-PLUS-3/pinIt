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
  const [isPrevRegister, setIsPrevRegister] = useState(false); // 이전 페이지
  const [filteredOptions, setFilteredOptions] = useState<
    ComboBoxOption[] | undefined
  >(options); // 필터된 옵션 상태

  const handleOnClickComboBox = () => {
    setIsOpened((prevState) => !prevState);
  };

  const handleOnClickOption = (option: ComboBoxOption) => {
    setSelectedOption(option);
    setIsOpened(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(option));
  };

  useEffect(() => {
    // 이전 페이지 확인
    if (document.referrer.includes('/challenge/add')) {
      setIsPrevRegister(true);
    }

    const savedOptionJSON = localStorage.getItem(STORAGE_KEY);
    const savedOption = savedOptionJSON ? JSON.parse(savedOptionJSON) : null;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 🔥 시간 초기화 (00:00:00)

    // 🔥 오늘 날짜가 포함된 챌린지 찾기
    const ongoingChallenge =
      options?.find((option) => {
        if (!option.startDate || !option.endDate) return false;
        const startDate = new Date(option.startDate);
        const endDate = new Date(option.endDate);
        return startDate <= today && today <= endDate;
      }) || null;

    // options에서 startDate가 오늘보다 늦은 항목을 제외
    const filtered = options?.filter((option) => {
      if (!option.startDate) return true; // startDate가 없는 경우 제외하지 않음
      const startDate = new Date(option.startDate);
      return startDate <= today; // 오늘보다 늦게 시작하는 항목은 제외
    });

    setFilteredOptions(filtered); // 필터된 옵션 상태에 저장

    if (filtered?.length) {
      setSelectedOption(ongoingChallenge);
      return;
    }

    if (isPrevRegister && filtered?.length) {
      setSelectedOption(ongoingChallenge);
    } else {
      setSelectedOption(savedOption || options?.[0] || null);
    }
  }, [options, setSelectedOption, isPrevRegister]);

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
                ~ {new Date(selectedOption.endDate).toISOString().split('T')[0]}
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
        {filteredOptions?.map((option) => (
          <li key={option.topic} onClick={() => handleOnClickOption(option)}>
            <span className={styles.ellipsis_box}>
              <span>
                {option.topic}{' '}
                {option.startDate && option.endDate && (
                  <strong>
                    ({new Date(option.startDate).toISOString().split('T')[0]} ~{' '}
                    {new Date(option.endDate).toISOString().split('T')[0]})
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
