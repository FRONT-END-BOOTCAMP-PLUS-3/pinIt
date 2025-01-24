'use client';

import Icon from '@/components/Icon/Icon';
import styles from './SearchInput.module.scss';

const SearchInput = () => {
  return (
    <div className={styles.searchWrap}>
      <div className={styles.icon}>
        <Icon id='search' color='#292526' width={24} height={24} />
      </div>
      <input
        className={styles.searchInput}
        type='text'
        placeholder='검색어를 입력하세요.'
      />
    </div>
  );
};

export default SearchInput;
