'use client'; // React Client Component

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.scss'; // SCSS 파일 불러오기

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // 스크롤 아래로: 헤더 숨기기
      setIsVisible(false);
    } else {
      // 스크롤 위로: 헤더 보이기
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
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
