'use client';

import React, { useState } from 'react';
import styles from '../add.module.scss';

const TextArea: React.FC = () => {
  const [text, setText] = useState('');
  const maxLength = 100;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.textAreaContainer}>
      <textarea
        placeholder='사진과 함께 이야기를 적어주세요!'
        maxLength={maxLength}
        rows={3}
        value={text}
        onChange={handleChange}
      />
      <span className={styles.characterCount}>
        {text.length}/{maxLength}
      </span>
    </div>
  );
};

export default TextArea;
