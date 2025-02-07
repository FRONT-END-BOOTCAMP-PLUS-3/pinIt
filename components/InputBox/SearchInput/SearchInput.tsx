'use client';

import React from 'react';
import Icon from '@/components/Icon/Icon';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value: string; // 입력된 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 변경 핸들러
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchWrap}>
      <div className={styles.icon}>
        <Icon id='search' color='#292526' width={24} height={24} />
      </div>
      <input
        className={styles.searchInput}
        type='text'
        placeholder='검색어를 입력하세요.'
        value={value} // 외부에서 전달받은 value
        onChange={onChange} // 외부에서 전달받은 onChange 핸들러
      />
    </div>
  );
};

export default SearchInput;
