'use client';

import Header from '@/components/Header/Header/Header';
import AdminNavigation from '@/components/Navigation/AdminNavigation/AdminNavigation';
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // 현재 경로를 가져옴

  // 경로에 따라 조건부 레이아웃 설정
  const isMainLayout = pathname.startsWith('/'); // '/admin'로 시작하는 경로는 헤더/네비게이션 필요

  return (
    <>
      <Header />
      {children}
      {isMainLayout && <AdminNavigation />}
    </>
  );
};

export default AdminLayout;
