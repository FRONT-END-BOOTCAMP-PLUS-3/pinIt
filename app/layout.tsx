'use client';

import UserNavigation from '@/components/Navigation/UserNavigation/UserNavigation';
import './globals.scss';
import HEADER_CONFIG from '@/constants/headerConfig'; // 상수 가져오기
import { usePathname } from 'next/navigation';
import HeaderWithIcon from '@/components/Header/HeaderWithIcon/HeaderWithIcon';
import Header from '@/components/Header/Header/Header';
import WhiteHeaderWithBack from '@/components/Header/WhiteHeaderWithBack/WhiteHeaderWithBack';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // 현재 경로 가져오기
  const pageConfig = HEADER_CONFIG[pathname] || {}; // 경로별 설정 가져오기

  // 헤더를 동적으로 렌더링
  const renderHeader = () => {
    switch (pageConfig.header) {
      case 'HeaderWithIcon':
        return <HeaderWithIcon />;
      case 'Header':
        return <Header />;
      case 'WhiteHeaderWithBack':
        return <WhiteHeaderWithBack />;
      default:
        return null;
    }
  };

  /* 
    유저 admin 여부 확인하고,
    1. admin이면 <AdminNavigation/>을 띄우고
    2. admin이 아니면 <UserNavigation/>을 띄우도록
    하는 로직 추가해야함!! 일단 지금은 항상 <UserNavigation/>이도록 했음!!
  */

  return (
    <html lang='ko'>
      <head>
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body>
        <div className='container'>
          <div>
            {renderHeader()}
            <div style={{ marginTop: '60px' }}>{children}</div>
            {pageConfig.hasNavigation && <UserNavigation />}{' '}
            {/* 네비게이션 표시 여부 */}
          </div>
        </div>
      </body>
    </html>
  );
}
