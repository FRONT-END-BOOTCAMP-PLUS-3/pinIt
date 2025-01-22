import { useState, useEffect } from 'react';

const useScrollVisibility = (threshold = 50) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, threshold]);

  return isVisible;
};

export default useScrollVisibility;
