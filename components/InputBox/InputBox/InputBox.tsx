'use client';

import styles from './InputBox.module.scss';

const InputBox = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className={styles.input_box}>
      <input
        type='text'
        placeholder={placeholder} // placeholder 추가
      />
    </div>
  );
};

export default InputBox;
