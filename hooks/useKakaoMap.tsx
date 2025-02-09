'use client';

import ReactDOM from 'react-dom/client';
import { ShowNearByPinListDto } from '@/application/usecases/map/dto/ShowNearByPinListDto';
import { useEffect, useRef, useState } from 'react';
import MapPin from '@/components/MapPin/MapPin';

declare global {
  interface Window {
    kakao: any;
  }
}

const useKakaoMap = ({
  lat,
  lng,
  jsApiKey,
}: {
  lat: number | null;
  lng: number | null;
  jsApiKey: string | undefined;
}) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const markerRefs = useRef<any[]>([]);
  const [boundsState, setBoundsState] = useState<{
    sw: any | null;
    ne: any | null;
  }>({
    sw: null,
    ne: null,
  });
  const boundsRef = useRef<{ sw: any | null; ne: any | null } | null>(null);

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

        // 현재 위치 마커 이미지 설정
        const imageSrc =
          'https://i.pinimg.com/originals/9b/91/aa/9b91aada2439fe652a512ded67218623.png'; // 현재 위치 마커 이미지 경로
        const imageSize = new window.kakao.maps.Size(30, 30); // 이미지 크기 조정
        const imageOption = { offset: new window.kakao.maps.Point(25, 50) }; // 마커 중심 조정

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        );

        // 초기 지도 범위 내 장소 가져오기
        setTimeout(() => {
          fetchPin(map.getBounds());
        }, 500);

        // 현재 위치에 마커 표시
        const marker = new window.kakao.maps.Marker({
          position: coords,
          image: markerImage,
        });

        marker.setMap(map);
        markerRef.current = marker;

        // 지도 이동할 때마다 fetchPin 실행
        window.kakao.maps.event.addListener(map, 'dragend', () => {
          fetchPin(map.getBounds());
        });

        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          fetchPin(map.getBounds());
        });
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI); // 스크립트가 완전히 로드된 후 onLoadKakaoAPI 실행
  }, [lat, lng, jsApiKey]);

  const fetchPin = async (bounds: any) => {
    if (!window.kakao?.maps || !bounds.getSouthWest || !bounds.getNorthEast) {
      console.error('fetchPin에 전달된 bounds 값이 올바르지 않습니다.', bounds);
      return;
    }

    // 남서쪽 좌표(왼쪽 아래), 북동쪽 좌표(오른쪽 위)
    const newBounds = {
      sw: bounds.getSouthWest(),
      ne: bounds.getNorthEast(),
    };

    // useRef를 활용하여 bounds 값을 강제 적용
    boundsRef.current = newBounds;
    setBoundsState(newBounds);
  };

  const updateMarkers = (pins: ShowNearByPinListDto[]) => {
    if (!mapRef.current || !window.kakao.maps) return;

    // 기존 마커 삭제
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    // 새 마커 추가
    pins.forEach((pin) => {
      const position = new window.kakao.maps.LatLng(
        pin.latitude,
        pin.longitude,
      );
      const markerContainer = document.createElement('div');
      markerContainer.id = `customMarker${pin.id}`;
      const marker = new window.kakao.maps.CustomOverlay({
        position,
        content: markerContainer,
        yAnchor: 1,
      });

      marker.setMap(mapRef.current);
      markerRefs.current.push(marker);

      setTimeout(() => {
        if (markerContainer) {
          ReactDOM.createRoot(markerContainer).render(
            <MapPin placeName={pin.placeName} imgUrl={pin.image} />,
          );
        }
      }, 0);
    });
  };

  return { mapRef, markerRef, boundsState, fetchPin, updateMarkers };
};

export default useKakaoMap;
