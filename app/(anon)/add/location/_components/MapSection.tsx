'use client';

import { useEffect, useState } from 'react';
import styles from '../addLocation.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapSectionProps {
  onAddressChange: (name: string, address: string) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ onAddressChange }) => {
  const [lat, setLat] = useState<number | null>(null); // GPS로 현재 위치 설정
  const [lng, setLng] = useState<number | null>(null);
  const [isMoved, setIsMoved] = useState(false); // 지도 이동 여부 상태
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

  // 좌표를 주소로 변환하는 함수
  const fetchAddress = (latitude: number, longitude: number) => {
    if (!window.kakao || !window.kakao.maps) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(longitude, latitude, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const roadAddr =
          result[0]?.road_address?.address_name ||
          result[0]?.address?.address_name;
        const placeName =
          result[0]?.address?.region_3depth_name || '알 수 없음';
        onAddressChange(placeName, roadAddr || '주소를 찾을 수 없음');
      }
    });
  };

  useEffect(() => {
    if (!lat || !lng) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${jsApiKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const coords = new window.kakao.maps.LatLng(lat, lng);
        const container = document.getElementById('map');
        const options = {
          center: coords,
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 초기에 현재 위치의 주소 변환 실행
        fetchAddress(lat, lng);

        // 지도 이동 시 중심 좌표 업데이트 & 버튼 표시
        window.kakao.maps.event.addListener(map, 'center_changed', () => {
          const center = map.getCenter();
          setLat(center.getLat());
          setLng(center.getLng());

          // 현재 위치와 다르면 버튼 표시
          setIsMoved(true);

          fetchAddress(center.getLat(), center.getLng()); // API 호출
        });

        // 현재 위치 버튼 클릭 시 지도 중심 이동 & 버튼 숨김
        document
          .getElementById('currentLocationButton')
          ?.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition((position) => {
              const newLat = position.coords.latitude;
              const newLng = position.coords.longitude;
              setLat(newLat);
              setLng(newLng);
              const newCenter = new window.kakao.maps.LatLng(newLat, newLng);
              map.setCenter(newCenter);
              fetchAddress(newLat, newLng); // API 호출

              // 현재 위치로 돌아오면 버튼 숨김
              setIsMoved(false);
            });
          });
      });
    });
  }, [lat, lng, jsApiKey]);

  return (
    <div className={styles.mapSectionContainer}>
      <div id='map' className={styles.map}></div>
      <div className={styles.centerPin}>📍</div>

      {/* 현재 위치와 다를 때만 버튼 표시 */}
      {isMoved && (
        <button
          id='currentLocationButton'
          className={styles.currentLocationButton}
        >
          현재 위치로 이동
        </button>
      )}
    </div>
  );
};

export default MapSection;
