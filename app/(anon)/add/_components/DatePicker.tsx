'use client';

import React, { useState } from 'react';
import styles from '../add.module.scss';

const DatePicker: React.FC = () => {
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDateSelected(!!event.target.value); // 값이 있는지 확인
  };

  return (
    <div
      className={`${styles.datePickerContainer} ${isDateSelected ? styles.selected : ''}`}
    >
      <h3 className={styles.title}>촬영 날짜 *</h3>
      <div>
        <input
          id='date-picker'
          type='date'
          placeholder='언제 촬영한 사진인가요?'
          onChange={handleChange} // 날짜 선택 이벤트 처리
        />
      </div>
    </div>
  );
};

export default DatePicker;
