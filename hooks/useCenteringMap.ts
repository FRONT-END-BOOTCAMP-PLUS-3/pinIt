import { SelectedLocation } from '@/app/(anon)/map/page';
import { useEffect } from 'react';

const useCenteringMap = ({
  mapRef,
  markerRef,
  selectedLocation,
}: {
  mapRef: any;
  markerRef: any;
  selectedLocation: SelectedLocation | null;
}) => {
  // 검색된 장소로 지도 이동
  useEffect(() => {
    if (!mapRef.current || !selectedLocation) return;

    const { latitude, longitude } = selectedLocation;
    const newCenter = new window.kakao.maps.LatLng(latitude, longitude);

    mapRef.current.setCenter(newCenter);

    // 기존 마커 삭제
    markerRef.current?.setMap(null);
  }, [selectedLocation, mapRef, markerRef]);
};

export default useCenteringMap;
