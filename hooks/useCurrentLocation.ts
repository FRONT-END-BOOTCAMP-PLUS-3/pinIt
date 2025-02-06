import { useEffect, useState } from 'react';

const useCurrentLocation = () => {
  const [lat, setLat] = useState<number | null>(null); // GPS로 현재 위치 설정
  const [lng, setLng] = useState<number | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        setLat(newLat);
        setLng(newLng);
      },
      () => {
        console.error('현재 위치를 가져올 수 없습니다.');
        setLat(33.5563); // 기본값: 제주도 도두봉
        setLng(126.79581);
      },
    );
  }, []);

  return { lat, lng, setLat, setLng };
};

export default useCurrentLocation;
