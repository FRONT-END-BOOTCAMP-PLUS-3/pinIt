'use client';

import UserNavigation from '@/components/Navigation/UserNavigation/UserNavigation';
// import './globals.scss';
import '@/app/globals.scss';
import HEADER_CONFIG from '@/constants/headerConfig'; // 상수 가져오기
import { usePathname, useRouter } from 'next/navigation';
import HeaderWithIcon from '@/components/Header/HeaderWithIcon/HeaderWithIcon';
import Header from '@/components/Header/Header/Header';
import WhiteHeaderWithBack from '@/components/Header/WhiteHeaderWithBack/WhiteHeaderWithBack';
import { useEffect, useState } from 'react';
import AdminNavigation from '@/components/Navigation/AdminNavigation/AdminNavigation';

interface PageConfig {
  header: string | null;
  hasNavigation: boolean;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // 현재 경로 가져오기
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/check-admin');
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('🚨 관리자 여부 확인 오류:', error);
        setIsAdmin(false); // 기본값은 일반 사용자로 설정
      }
    };

    checkAdmin();
  }, [isAdmin, pathname, router]);

  // isAdmin이 false이고, pathname이 '/admin'으로 시작하면 리다이렉트
  useEffect(() => {
    if (isAdmin === false && pathname.startsWith('/admin')) {
      router.push('/');
    }
  }, []);

  // HEADER_CONFIG에서 현재 경로에 해당하는 설정 찾기
  const pageConfig: PageConfig = HEADER_CONFIG.find(({ path }) =>
    path.test(pathname),
  )?.config || {
    header: null,
    hasNavigation: false,
  };

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

  return (
    <html lang='ko'>
      <head>
        <link rel='/manifest' href='/manifest.json' />
      </head>
      <body>
        <div
          className='container'
          style={
            pathname === '/login'
              ? { backgroundColor: '#292526' }
              : { backgroundColor: '#ffffff' }
          }
        >
          <div>
            {renderHeader()}
            <div style={{ marginTop: '60px' }}>{children}</div>
            {pageConfig.hasNavigation &&
              (isAdmin === null ? null : isAdmin ? (
                <AdminNavigation />
              ) : (
                <UserNavigation />
              ))}
            {/* 네비게이션 표시 여부 */}
          </div>
        </div>
      </body>
    </html>
  );
}
