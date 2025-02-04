'use client';

import Button from '@/components/Buttons/Button';
import styles from '../like.module.scss';

const NoLike = () => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.spanContainer}>
        <span>아직 저장한 핀이 없어요.</span>
        <span>마음에 드는 장소를 둘러보세요!</span>
      </div>
      <Button label={'핀 둘러보기'} />
    </div>
  );
};

export default NoLike;
