'use client';

import styles from '../pinDetail.module.scss';

interface PinImageProps {
  pinImage: string;
}

const PinImageSection: React.FC<PinImageProps> = ({ pinImage }) => {
  return (
    <div className={styles.pinImageSection}>
      <img src={pinImage} alt='핀 이미지' />
    </div>
  );
};

export default PinImageSection;
