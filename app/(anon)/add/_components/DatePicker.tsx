'use client';

import React, { useState } from 'react';
import styles from '../add.module.scss';

interface DatePickerProps {
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    onChange(new Date(date));
  };

  return (
    <div
      className={`${styles.datePickerContainer} ${
        selectedDate ? styles.selected : ''
      }`}
    >
      <h3 className={styles.title}>촬영 날짜 *</h3>
      <div>
        <input
          id='date-picker'
          type='date'
          placeholder='언제 촬영한 사진인가요?'
          value={selectedDate || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;
