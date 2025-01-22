'use client';

import React from 'react';
import styles from '../Navigation.module.scss'; // SCSS 파일 불러오기
import Icon from '@/components/Icon/Icon';
import useScrollVisibility from '@/hooks/useScrollVisibility'; // 커스텀 훅 불러오기

const UserNavigation = () => {
  const isVisible = useScrollVisibility(); // 스크롤 가시성 상태 가져오기

  return (
    <nav className={`${styles.navigation} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.navItem}>
        <Icon id='home-bold' />
      </div>
      <div className={styles.navItem}>
        <Icon id='map-bold' />
      </div>
      <div className={styles.navItem}>
        <Icon id='create-bold' />
      </div>
      <div className={styles.navItem}>
        <Icon id='heart-bold' />
      </div>
      <div className={styles.navItem}>
        <Icon id='person-bold' />
      </div>
    </nav>
  );
};

export default UserNavigation;
