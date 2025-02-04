'use client';

import React from 'react';
import { usePathname } from 'next/navigation'; // 현재 경로 가져오기
import styles from '../Navigation.module.scss'; // SCSS 파일 불러오기
import Icon from '@/components/Icon/Icon';
import useScrollVisibility from '@/hooks/useScrollVisibility'; // 커스텀 훅 불러오기
import Link from 'next/link';
import ROUTES from '@/constants/routes';

const AdminNavigation = () => {
  const isVisible = useScrollVisibility(); // 스크롤 가시성 상태 가져오기
  const pathname = usePathname(); // 현재 경로 가져오기

  // 현재 경로와 일치하면 bold 아이콘으로 변경
  const isActive = (route: string) => pathname === route;
  const getIconId = (route: string, iconId: string) => {
    return pathname === route ? `${iconId}-bold` : iconId;
  };

  return (
    <nav className={`${styles.navigation} ${!isVisible ? styles.hidden : ''}`}>
      {[
        { route: ROUTES.home, icon: 'home' },
        { route: ROUTES.map, icon: 'map' },
        { route: ROUTES.add.nav, icon: 'create' },
        { route: ROUTES.like, icon: 'heart' },
        { route: ROUTES.profile.nav, icon: 'person' },
        { route: ROUTES.admin.nav, icon: 'setting' },
      ].map(({ route, icon }) => (
        <Link key={route} className={styles.navItem} href={route}>
          <Icon id={getIconId(route, icon)} />
          {isActive(route) && <span className={styles.activeDot} />}
        </Link>
      ))}
    </nav>
  );
};

export default AdminNavigation;
