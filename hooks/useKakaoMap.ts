import { useEffect, useRef } from 'react';

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
        markerRef.current = marker;
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI); // 스크립트가 완전히 로드된 후 onLoadKakaoAPI 실행
  }, [lat, lng, jsApiKey]);

  return { mapRef, markerRef };
};

export default useKakaoMap;
