'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ROUTES from '@/constants/routes';

const useScrollVisibility = (threshold = 50) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname(); // 현재 경로 가져오기

  // 항상 true로 설정할(= 스크롤을해도 바가 사라지지 않게 할) 경로를 담은 배열
  const alwaysVisiblePaths = [ROUTES.add.location];

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > threshold) {
      setIsVisible(false); // 스크롤 아래로: 숨기기
    } else {
      setIsVisible(true); // 스크롤 위로: 보이기
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    if (!alwaysVisiblePaths.includes(pathname)) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setIsVisible(true); // 특정 경로에서는 항상 true
    }
  }, [lastScrollY, threshold, pathname]);

  return isVisible;
};

export default useScrollVisibility;
