'use client';

import React from 'react';
import styles from '../Navigation.module.scss'; // SCSS 파일 불러오기
import Icon from '@/components/Icon/Icon';
import useScrollVisibility from '@/hooks/useScrollVisibility'; // 커스텀 훅 불러오기

const AdminNavigation = () => {
  const isVisible = useScrollVisibility(); // 스크롤 가시성 상태 가져오기

  return (
    <nav className={`${styles.navigation} ${!isVisible ? styles.hidden : ''}`}>
      <div className={`${styles.navItem} ${styles.admin}`}>
        <Icon id='home-bold' />
      </div>
      <div className={`${styles.navItem} ${styles.admin}`}>
        <Icon id='map-bold' />
      </div>
      <div className={`${styles.navItem} ${styles.admin}`}>
        <Icon id='create-bold' />
      </div>
      <div className={`${styles.navItem} ${styles.admin}`}>
        <Icon id='heart-bold' />
      </div>
      <div className={`${styles.navItem} ${styles.admin}`}>
        <Icon id='person-bold' />
      </div>
      <div className={`${styles.navItem} ${styles.admin}`}>
        <Icon id='setting-bold' />
      </div>
    </nav>
  );
};

export default AdminNavigation;
