'use client';

import UserNavigation from '@/components/Navigation/UserNavigation/UserNavigation';
// import './globals.scss';
import '@/app/globals.scss';
import HEADER_CONFIG from '@/constants/headerConfig'; // 상수 가져오기
import { usePathname, useRouter } from 'next/navigation';
import HeaderWithIcon from '@/components/Header/HeaderWithIcon/HeaderWithIcon';
import Header from '@/components/Header/Header/Header';
import WhiteHeaderWithBack from '@/components/Header/WhiteHeaderWithBack/WhiteHeaderWithBack';
import BlackHeaderWithBack from '@/components/Header/BlackHeaderWithBack/BlackHeaderWithBack';
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
      case 'BlackHeaderWithBack':
        return <BlackHeaderWithBack />;
      default:
        return null;
    }
  };

  useEffect(() => {
    let themeColorMeta = document.querySelector("meta[name='theme-color']");

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColorMeta);
    }

    const themeColor =
      pageConfig.header === 'WhiteHeaderWithBack' ? '#FFFFFF' : '#292526';

    themeColorMeta.setAttribute('content', themeColor);
  }, [pageConfig.header]); // pageConfig.header 변경 시 실행

  return (
    <html lang='ko'>
      <head>
        <link rel='/manifest' href='/manifest.json' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-title' content='PinIt!' />
        <link rel='apple-touch-icon' sizes='180x180' href='icon-192x192.png' />
        <link
          rel='apple-touch-startup-image'
          media='screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          href='icon-512x512.png'
        />
        <title>PinIt!</title>
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
