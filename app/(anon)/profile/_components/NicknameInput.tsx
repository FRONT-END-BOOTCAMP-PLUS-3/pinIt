'use client';

import React from 'react';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import styles from './NicknameInput.module.scss';
import Button from '@/components/Buttons/Button';

const NicknameInput = () => {
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // 폼 데이터 처리 로직 작성
    console.log('Form submitted');
  };

  return (
    <div className={styles.nickname_input}>
      <h3 className={styles.title}>닉네임</h3>
      <div className={styles.input} style={{ cursor: 'pointer' }}>
        <InputBox placeholder='닉네임을 입력해주세요.' />
        <Button label='저장' onClickButton={handleSubmit} />
      </div>
    </div>
  );
};

export default NicknameInput;
