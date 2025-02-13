'use client';

import { useEffect, useState } from 'react';
import styles from '../pinDetail.module.scss';

interface MapProps {
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const MapSection: React.FC<{ map: MapProps }> = ({ map }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const jsApiKey = process.env.NEXT_PUBLIC_KAKAOMAP_JS_KEY;
  const customMarkerImage = '/custom-pin.png'; // ✅ 커스텀 마커 이미지 경로
  const markerSize = { width: 20, height: 30 }; // ✅ 마커 크기 지정

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        console.log('✅ 카카오맵 로드 완료');
        initMap();
      } else {
        console.log('📢 카카오맵 스크립트 추가 중...');
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${jsApiKey}&autoload=false`;
        document.head.appendChild(script);

        script.addEventListener('load', () => {
          console.log('✅ 카카오맵 스크립트 로드 완료');
          window.kakao.maps.load(initMap);
        });
      }
    };

    const initMap = () => {
      console.log('🚀 지도 초기화 실행');
      const coords = new window.kakao.maps.LatLng(map.latitude, map.longitude);
      const container = document.getElementById('map');
      const options = {
        center: coords,
        level: 3,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);

      // ✅ 커스텀 마커 이미지 생성
      const imageSize = new window.kakao.maps.Size(
        markerSize.width,
        markerSize.height,
      );
      const markerImage = new window.kakao.maps.MarkerImage(
        customMarkerImage,
        imageSize,
      );

      // ✅ 마커 생성 (커스텀 이미지 적용)
      const marker = new window.kakao.maps.Marker({
        position: coords,
        image: markerImage, // 👈 커스텀 이미지 적용
      });

      marker.setMap(kakaoMap);
      setIsMapLoaded(true);
    };

    loadKakaoMap();
  }, [map.latitude, map.longitude]);

  return (
    <div className={styles.mapSection}>
      <div id='map' className={styles.map}></div>
      {!isMapLoaded && (
        <p className={styles.loadingText}>📍 지도 불러오는 중...</p>
      )}
    </div>
  );
};

export default MapSection;
