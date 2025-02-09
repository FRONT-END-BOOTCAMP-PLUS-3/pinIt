'use client';

import Button from '@/components/Buttons/Button';
import styles from '../like.module.scss';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

const NoLike = () => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.spanContainer}>
        <span>아직 저장한 핀이 없어요.</span>
        <span>마음에 드는 장소를 둘러보세요!</span>
      </div>
      <Link href={ROUTES.home}>
        <Button label={'핀 둘러보기'} />
      </Link>
    </div>
  );
};

export default NoLike;
