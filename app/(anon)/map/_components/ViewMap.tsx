'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../ViewMap.module.scss';
import RoundIconButton from '@/components/Buttons/RoundIconButton';

declare global {
  interface Window {
    kakao: any;
  }
}

const ViewMap = () => {
  const mapRef = useRef<any>(null);
  const [lat, setLat] = useState<number | null>(null); // GPS로 현재 위치 설정
  const [lng, setLng] = useState<number | null>(null);
  const jsApiKey = process.env.NEXT_PUBLIC_KAKAOMAP_JS_KEY;

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

  useEffect(() => {
    if (!lat || !lng) return;

    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${jsApiKey}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const coords = new window.kakao.maps.LatLng(lat, lng);
        const container = document.getElementById('map');
        const options = {
          center: coords,
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const marker = new window.kakao.maps.Marker({
          position: coords,
        });

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI); // 스크립트가 완전히 로드된 후 onLoadKakaoAPI 실행
  }, [lat, lng, jsApiKey]);

  const setCenter = () => {
    console.log('click');
    if (!mapRef.current) return;

    // 버튼 클릭 시 현재 위치로 센터 설정
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        setLat(newLat);
        setLng(newLng);

        const newCenter = new window.kakao.maps.LatLng(newLat, newLng);
        mapRef.current.setCenter(newCenter);

        const marker = new window.kakao.maps.Marker({
          position: newCenter,
        });

        marker.setMap(mapRef.current);
      },
      () => {
        console.error('현재 위치를 가져올 수 없습니다.');
      },
    );
  };

  return (
    <div id='map' className={styles.map}>
      <div className={styles.roundButton}>
        <RoundIconButton iconId={'gps'} onClickIconButton={setCenter} />
      </div>
    </div>
  );
};

export default ViewMap;
