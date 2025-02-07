'use client';

import React, { useEffect, useState } from 'react';
import styles from './ComboBox.module.scss';
import Icon from '../Icon/Icon';

interface ComboBoxOption {
  id: string;
  optionName: string;
}

interface ComboBoxProps {
  options: ComboBoxOption[];
  onSelect: (optionId: string) => void;
  sessionStorageKey: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  onSelect,
  sessionStorageKey,
}) => {
  const [selectedId, setSelectedId] = useState<string>(options[0].id);
  const [isOpened, setIsOpened] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Hydration 방지

  useEffect(() => {
    setIsMounted(true);
    const savedSelectedOption = sessionStorage.getItem(sessionStorageKey);
    if (savedSelectedOption) setSelectedId(savedSelectedOption);
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem(sessionStorageKey, selectedId);
      onSelect(selectedId);
    }
  }, [selectedId, sessionStorageKey, onSelect, isMounted]);

  return (
    <div className={styles.combo_box}>
      <button type='button' onClick={() => setIsOpened(!isOpened)}>
        <span className={styles.ellipsis_box}>
          <span>
            {options.find((option) => option.id === selectedId)?.optionName}
          </span>
          <Icon
            id={isOpened ? 'up' : 'down'}
            width={17}
            height={17}
            color='#fff'
          />
        </span>
      </button>
      {isOpened && (
        <ul className={styles.toggle_list}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => {
                setSelectedId(option.id);
                setIsOpened(false);
              }}
              className={selectedId === option.id ? styles.on : ''}
            >
              {option.optionName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
