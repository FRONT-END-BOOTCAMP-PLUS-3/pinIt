'use client';

import styles from './ViewMap.module.scss';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import PinBox from './_components/PinBox';
import ViewMap from './_components/ViewMap';

const Map = () => {
  const change = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.searchInput}>
          <SearchInput value={'남산타워'} onChange={change} />
        </div>
        <ViewMap />
      </div>
      <PinBox />
    </>
  );
};

export default Map;
