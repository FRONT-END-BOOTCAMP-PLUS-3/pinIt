'use client';

import ViewMap from './ViewMap';
import styles from '../ViewMap.module.scss';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import { useEffect, useRef, useState } from 'react';

const MapSection = () => {
  const [keyword, setKeyword] = useState(''); // 입력된 검색 키워드
  const [locations, setLocations] = useState<Location[]>([]); // 검색 결과 리스트

  // 장소 검색 함수 (Kakao Map API 사용)
  const fetchLocations = async (keyword: string) => {
    if (!keyword) return;

    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;
    let allLocations: Location[] = [];
    let page = 1;
    let isEnd = false;

    try {
      while (!isEnd) {
        const response = await fetch(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&page=${page}`,
          {
            method: 'GET',
            headers: {
              Authorization: `KakaoAK ${REST_API_KEY}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // 현재 페이지의 데이터 추가
        const newLocations = data.documents.map(
          (place: {
            id: string;
            place_name: string;
            road_address_name?: string;
            x: string; // 경도 (longitude)
            y: string; // 위도 (latitude)
          }) => ({
            id: place.id,
            name: place.place_name,
            address: place.road_address_name || '주소 정보 없음',
            latitude: parseFloat(place.y),
            longitude: parseFloat(place.x),
          }),
        );

        allLocations = [...allLocations, ...newLocations]; // 기존 데이터에 추가
        isEnd = data.meta.is_end; // 마지막 페이지인지 확인
        page++; // 다음 페이지 요청
      }

      setLocations(allLocations);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  // 키워드 변경 시 fetchLocations 호출
  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchLocations(keyword);
    }, 300); // 입력 후 300ms 지연

    return () => clearTimeout(debounce); // 이전 타이머 정리
  }, [keyword]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.searchInput}>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div>검색결과</div>
      </div>
      <ViewMap searchList={setLocations} />
    </div>
  );
};

export default MapSection;
