'use client';

import Header from '@/components/Header/Header/Header';
import UserNavigation from '@/components/Navigation/UserNavigation/UserNavigation';
import { usePathname } from 'next/navigation';

const AnonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // 현재 경로를 가져옴

  // 경로에 따라 조건부 레이아웃 설정
  const isMainLayout = pathname.startsWith('/'); // '/'로 시작하는 경로는 헤더/네비게이션 필요

  return (
    <>
      <Header />
      {children}
      {isMainLayout && <UserNavigation />}
    </>
  );
};

export default AnonLayout;
