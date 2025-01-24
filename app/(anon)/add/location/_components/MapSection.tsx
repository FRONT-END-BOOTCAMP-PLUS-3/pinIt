'use client';

import styles from '../addLocation.module.scss';

const MapSection: React.FC = () => {
  return (
    <div className={styles.mapSectionContainer}>
      <div className={styles.map}>지도 영역</div>
    </div>
  );
};

export default MapSection;
