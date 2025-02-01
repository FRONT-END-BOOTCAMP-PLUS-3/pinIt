'use client';

import React from 'react';
import styles from './InputBox.module.scss';

interface InputBoxProps {
  placeholder: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  value = '',
  readOnly = false,
  onChange,
}) => {
  return (
    <div className={styles.input_box}>
      <input
        type='text'
        placeholder={placeholder}
        defaultValue={value}
        readOnly={readOnly} // readOnly 지원
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
