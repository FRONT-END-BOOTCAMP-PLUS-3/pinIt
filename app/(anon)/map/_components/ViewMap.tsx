'use client';

import styles from '../ViewMap.module.scss';
import RoundIconButton from '@/components/Buttons/RoundIconButton';
import { SelectedLocation } from './MapSection';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useKakaoMap from '@/hooks/useKakaoMap';
import useCenteringMap from '@/hooks/useCenteringMap';

interface ViewMapProps {
  selectedLocation: SelectedLocation | null;
}

const ViewMap: React.FC<ViewMapProps> = ({ selectedLocation }) => {
  const { lat, lng, setLat, setLng } = useCurrentLocation();
  const jsApiKey = process.env.NEXT_PUBLIC_KAKAOMAP_JS_KEY;
  const { mapRef, markerRef } = useKakaoMap({ lat, lng, jsApiKey });

  useCenteringMap({ mapRef, markerRef, selectedLocation });

  const setCenter = () => {
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
