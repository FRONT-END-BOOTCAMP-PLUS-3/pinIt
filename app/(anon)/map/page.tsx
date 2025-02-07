'use client';

import styles from './ViewMap.module.scss';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import MapSearchList from './_components/MapSearchList';
import ViewMap from './_components/ViewMap';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface SelectedLocation {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const Map = () => {
  const [isLocationSearchVisible, setIsLocationSearchVisible] = useState(false);
  const [keyword, setKeyword] = useState(''); // 입력된 검색 키워드
  const [locations, setLocations] = useState<Location[]>([]); // 검색 결과 리스트
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null); // 선택한 장소 정보
  const searchBoxRef = useRef<HTMLDivElement>(null); // searchBox 참조 생성

  // useCallback을 사용하여 함수가 매 렌더링마다 재생성되지 않도록 설정
  const handleCloseLocationSearch = useCallback(() => {
    setIsLocationSearchVisible(false);
  }, []);

  const handleSelectLocation = (location: SelectedLocation) => {
    // 선택된 장소 정보 가져오기
    setSelectedLocation(location);

    // 검색한 장소들 중 하나 선택하면 드롭 박스 닫힘
    setIsLocationSearchVisible(false);
  };

  // 외부 클릭 감지 이벤트 등록
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        handleCloseLocationSearch(); // 외부 클릭 시 팝업 닫기
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleCloseLocationSearch]);

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

        // 키워드에 맞는 장소 리스트 받아오기
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

  useEffect(() => {
    if (keyword.trim() !== '') {
      setIsLocationSearchVisible(true); // 검색어가 입력되면 리스트 보이도록 설정
      const debounce = setTimeout(() => {
        fetchLocations(keyword);
      }, 300); // 300ms 지연

      return () => clearTimeout(debounce); // 이전 타이머 정리
    } else {
      setIsLocationSearchVisible(false); // 검색어가 없으면 리스트 숨김
    }
  }, [keyword]);
  return (
    <>
      <div className={styles.mapContainer}>
        <div className={styles.searchInput} ref={searchBoxRef}>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {isLocationSearchVisible && (
            <MapSearchList
              searchList={locations}
              onClose={handleCloseLocationSearch}
              onSelectLocation={handleSelectLocation}
            />
          )}
        </div>
        <ViewMap selectedLocation={selectedLocation} />
      </div>
    </>
  );
};

export default Map;
