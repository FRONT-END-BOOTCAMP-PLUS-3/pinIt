'use client'; // React Client Component

import { useRouter } from 'next/navigation'; // useRouter 훅 사용
import styles from '../WhiteHeader.module.scss'; // SCSS 파일 불러오기
import useScrollVisibility from '@/hooks/useScrollVisibility'; // 커스텀 훅 불러오기
import Icon from '@/components/Icon/Icon';

const BlackHeaderWithBack = () => {
  const isVisible = useScrollVisibility(); // 스크롤 가시성 상태 가져오기
  const router = useRouter(); // Next.js 라우터 훅 가져오기

  const handleBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <header
      className={`${styles.blackheader} ${!isVisible ? styles.hidden : ''}`}
    >
      <div
        className={`${styles.icon} ${styles.iconLeft}`}
        onClick={handleBack}
        role='button'
        tabIndex={0}
      >
        <Icon id='left' color='#fff' />
      </div>
    </header>
  );
};

export default BlackHeaderWithBack;
