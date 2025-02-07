import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import styles from '../searchPage.module.scss';
import { useState } from 'react';

const SearchSection: React.FC<{ setKeyword: (keyword: string) => void }> = ({
  setKeyword,
}) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    setKeyword(newValue); // 최신 값으로 바로 업데이트
  };

  return (
    <div className={styles.searchSectionContainer}>
      <SearchInput value={input} onChange={handleInputChange} />
    </div>
  );
};

export default SearchSection;
