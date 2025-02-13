'use client';

import { useEffect, useState } from 'react';
import styles from '../addLocation.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface MapSectionProps {
  onAddressChange: (location: Location) => void;
  onClose: () => void; // ✅ X 버튼 클릭 시 부모에게 알림
}

const MapSection: React.FC<MapSectionProps> = ({
  onAddressChange,
  onClose,
}) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [map, setMap] = useState<any>(null); // ✅ 지도 객체를 저장
  const jsApiKey = process.env.NEXT_PUBLIC_KAKAOMAP_JS_KEY;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ✅ 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      () => {
        console.error('현재 위치를 가져올 수 없습니다.');
        setLat(33.5563); // 기본값: 제주도 도두봉
        setLng(126.79581);
      },
    );
  }, []);

  // ✅ 좌표를 주소로 변환하는 함수
  const fetchAddress = (latitude: number, longitude: number) => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API is not loaded yet.');
      return;
    }

    // ✅ SDK 로드 후 실행
    window.kakao.maps.load(() => {
      if (!window.kakao.maps.services) {
        console.error('Kakao Maps Services API is missing.');
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        longitude,
        latitude,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const address =
              result[0]?.road_address?.address_name ||
              result[0]?.address?.address_name;
            const name = result[0]?.address?.region_3depth_name || '알 수 없음';
            onAddressChange({ name, address, latitude, longitude });
          }
        },
      );
    });
  };

  useEffect(() => {
    if (!lat || !lng || map) return; // ✅ 이미 지도 객체가 있으면 다시 생성하지 않음

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${jsApiKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };

        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap); // ✅ 생성된 지도 객체 저장
        fetchAddress(lat, lng); // ✅ 최초 로딩 시 주소 변환 실행

        // ✅ 지도 이동 감지
        window.kakao.maps.event.addListener(newMap, 'center_changed', () => {
          const center = newMap.getCenter();
          setLat(center.getLat());
          setLng(center.getLng());
          setIsMoved(true);
          fetchAddress(center.getLat(), center.getLng());
        });
      });
    });
  }, [lat, lng, jsApiKey]);

  // ✅ 현재 위치 버튼 클릭 핸들러
  const handleMoveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newLat = position.coords.latitude;
      const newLng = position.coords.longitude;
      setLat(newLat);
      setLng(newLng);
      if (map) {
        const newCenter = new window.kakao.maps.LatLng(newLat, newLng);
        map.setCenter(newCenter);
      }
      fetchAddress(newLat, newLng);
      setIsMoved(false);
    });
  };

  return (
    <div className={styles.mapSectionContainer}>
      <div id='map' className={styles.map}></div>
      <button className={styles.closeButton} onClick={onClose}>
        X
      </button>
      <div className={styles.centerPin}>
        <img
          src='./custom-pin.png'
          style={{ width: '28px', height: '42px' }}
          alt='Custom Pin'
        />{' '}
      </div>

      {/* ✅ 현재 위치 버튼: 지도 이동 시만 표시 */}
      {isMoved && (
        <button
          onClick={handleMoveToCurrentLocation}
          className={styles.currentLocationButton}
        >
          현재 위치로 이동
        </button>
      )}
    </div>
  );
};

export default MapSection;
