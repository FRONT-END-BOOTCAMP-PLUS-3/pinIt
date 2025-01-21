'use client'; // React Client Component

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './UserNavigation.module.scss'; // SCSS 파일 불러오기

const UserNavigation = () => {
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
    <nav className={`${styles.navigation} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.navItem}>
        <Image src='/icons/home.svg' alt='홈' width={24} height={24} />
      </div>
      <div className={styles.navItem}>
        <Image src='/icons/map.svg' alt='지도' width={24} height={24} />
      </div>
      <div className={styles.navItem}>
        <Image src='/icons/add.svg' alt='추가' width={24} height={24} />
      </div>
      <div className={styles.navItem}>
        <Image src='/icons/heart.svg' alt='좋아요' width={24} height={24} />
      </div>
      <div className={styles.navItem}>
        <Image src='/icons/profile.svg' alt='프로필' width={24} height={24} />
      </div>
    </nav>
  );
};

export default UserNavigation;
