'use client';

import React from 'react';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import styles from './NicknameInput.module.scss';

const NicknameInput = ({ value, onChange }: { value?:string, onChange: (val: string) => void }) => {
  return (
    <div className={styles.nickname_input}>
      <h3 className={styles.title}>닉네임</h3>
      <div className={styles.input} style={{ cursor: 'pointer' }}>
        <InputBox value={value} placeholder='닉네임을 입력해주세요.' onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
};

export default NicknameInput;
