'use client';

import React, { useState, useEffect } from 'react';
import styles from '../pinForm.module.scss';

interface DatePickerProps {
  onChange: (date: Date) => void;
  initialDate?: string | Date; // ✅ 문자열 또는 Date 타입 가능하도록 수정
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (initialDate) {
      const parsedDate =
        typeof initialDate === 'string' ? new Date(initialDate) : initialDate;
      setSelectedDate(parsedDate.toISOString().split('T')[0]);
    }
  }, [initialDate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    onChange(new Date(date));
  };

  return (
    <div
      className={`${styles.datePickerContainer} ${selectedDate ? styles.selected : ''}`}
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
