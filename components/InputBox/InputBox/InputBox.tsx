'use client';

import React from 'react';
import styles from './InputBox.module.scss';
import Icon from '@/components/Icon/Icon';

interface InputBoxProps {
  placeholder: string;
  value?: string;
  rightIcon?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  value = '',
  rightIcon,
  readOnly = false,
  onChange,
}) => {
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // 폼 데이터 처리 로직 작성
    console.log('Form submitted');
  };

  return (
    <div className={`${styles.input_box}${rightIcon ? ' '+styles.iconAdded : ''}`}>
      <input
        type='text'
        placeholder={placeholder}
        defaultValue={value}
        readOnly={readOnly} // readOnly 지원
        onChange={onChange}
      />
      {rightIcon && (
      <button onClick={handleSubmit}>
        <Icon id={rightIcon} width={26} height={26} color='#252526' />
      </button>
      )}
    </div>
  );
};

export default InputBox;
