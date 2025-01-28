import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import styles from '../searchPage.module.scss';

const SearchSection: React.FC = () => {
  return (
    <div className={styles.searchSectionContianer}>
      <SearchInput />
    </div>
  );
};

export default SearchSection;
