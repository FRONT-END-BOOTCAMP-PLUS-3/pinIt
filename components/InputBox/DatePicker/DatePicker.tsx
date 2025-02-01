'use client';

import React, { useState } from 'react';
import styles from './DatePicker.module.scss';

const DatePicker = (
  {
    title = '제목',
    value,
    placeholder,
    readOnly = false,
    onChange,
  }:
  {
    title: string,
    value?: string,
    placeholder:string,
    readOnly?: boolean,
    onChange?: (date: string) => void,
  }) => {
  const [inputType, setInputType] = useState<'text' | 'date'>(
    value ? 'date' : 'text'
  );

  const handleFocus = () => {
    setInputType('date'); // 클릭 시 date 타입으로 변경
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setInputType('text'); // 값이 없으면 다시 text 타입으로 변경
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputDate = event.target.value;

    // YYYY-MM-DD 형식 유지 (6자리 연도 방지)
    if (inputDate.length > 10) {
      inputDate = inputDate.slice(0, 10);
    }

    // 상위 컴포넌트로 전달
    onChange?.(inputDate);
  };

  return (
    <div className={`${styles.datepicker} ${value ? styles.selected : ''}`}>
      <h3 className={styles.title}>{title}</h3>
      <div>
        <input
          id="date-picker"
          type={inputType} // 클릭 시 date, 포커스 해제 시 text
          placeholder={placeholder}
          value={value}
          max="9999-12-31" // 4자리 연도 제한
          onFocus={handleFocus} // 클릭 시 type="date"로 변경
          onBlur={handleBlur} // 값이 없으면 다시 type="text"
          onChange={handleChange} // 날짜 입력 시 값 업데이트
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default DatePicker;
