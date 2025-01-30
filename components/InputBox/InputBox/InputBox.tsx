'use client';

import React from 'react';
import styles from './InputBox.module.scss';

interface InputBoxProps {
  placeholder: string;
  value?: string;
  readOnly?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  value = '',
  readOnly = false,
}) => {
  return (
    <div className={styles.input_box}>
      <input
        type='text'
        placeholder={placeholder}
        defaultValue={value}
        readOnly={readOnly} // readOnly 지원
      />
    </div>
  );
};

export default InputBox;
