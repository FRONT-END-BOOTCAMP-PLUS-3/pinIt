'use client';

import styles from './ViewMap.module.scss';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import PinBox from './_components/PinBox';

const ViewMap = () => {
  return (
    <>
      <div className={styles.mapContainer}>
        <SearchInput />
        <div className={styles.map}></div>
      </div>
      <PinBox />
    </>
  );
};

export default ViewMap;
