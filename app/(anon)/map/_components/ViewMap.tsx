'use client';

import { useEffect, useRef } from 'react';
import styles from '../ViewMap.module.scss';
import RoundIconButton from '@/components/Buttons/RoundIconButton';

declare global {
  interface Window {
    kakao: any;
  }
}

const ViewMap = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=cb67c048e7001bd33041a7658fec7670&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  const setCenter = (e) => {
    console.log('click');
    if (mapRef.current) {
      const moveLatLon = new window.kakao.maps.LatLng(33.452613, 126.570888);
      mapRef.current.setCenter(moveLatLon);
    }
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
