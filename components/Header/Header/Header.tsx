'use client'; // React Client Component

import Image from 'next/image';
import styles from './Header.module.scss'; // SCSS 파일 불러오기
import useScrollVisibility from '@/hooks/useScrollVisibility'; // 커스텀 훅 불러오기

const Header = () => {
  const isVisible = useScrollVisibility(); // 스크롤 가시성 상태 가져오기

  return (
    <header className={`${styles.header} ${!isVisible ? styles.hidden : ''}`}>
      <Image
        className={styles.img}
        alt='PinIt 헤더 로고'
        src='/headerLogo.png'
        layout='intrinsic' // 이미지 비율 유지
        width={1300} // 원본 너비
        height={446} // 원본 높이
        priority // 로딩 우선순위 지정
      />
    </header>
  );
};

export default Header;
