'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from '../add.module.scss';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import Icon from '@/components/Icon/Icon';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

interface LocationSearchProps {
  onClose: () => void;
  onSelectLocation: (location: { name: string; address: string }) => void;
}

interface Location {
  id: string;
  name: string;
  address: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onClose,
  onSelectLocation,
}) => {
  const searchBoxRef = useRef<HTMLDivElement>(null); // searchBox 참조 생성
  const [isHovered, setIsHovered] = useState(false);
  const [keyword, setKeyword] = useState(''); // 입력된 검색 키워드
  const [locations, setLocations] = useState<Location[]>([]); // 검색 결과 리스트

  // 외부 클릭 감지 이벤트 등록
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        onClose(); // 외부 클릭 시 팝업 닫기
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // 장소 선택 시 부모 컴포넌트에 전달
  const handleSelectLocation = (location: Location) => {
    onSelectLocation({ name: location.name, address: location.address });
    onClose(); // 팝업 닫기
  };

  // 장소 검색 함수 (Kakao Map API 사용)
  const fetchLocations = async (keyword: string) => {
    if (!keyword) return;

    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
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
          }) => ({
            id: place.id,
            name: place.place_name,
            address: place.road_address_name || '주소 정보 없음',
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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className={styles.locationSearchContainer}>
      <div ref={searchBoxRef} className={styles.searchBox}>
        {/* SearchInput 컴포넌트에 검색 키워드 전달 */}
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // 키워드 업데이트
        />
        <div className={styles.currentLocation}>
          <Link
            href={ROUTES.add.location}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.link}
          >
            <span className={styles.gpsIcon}>
              <Icon
                id={'gps'}
                color={isHovered ? '#292526' : '#fff'}
                width={22}
                height={22}
              />
            </span>
            현재 위치로 찾기
          </Link>
        </div>
        {/* 검색 결과 리스트 */}
        <ul className={styles.locationList}>
          {locations.map((location) => (
            <li
              key={location.id}
              className={styles.locationItem}
              onClick={() => handleSelectLocation(location)}
            >
              <strong className={styles.locationName}>{location.name}</strong>
              <p className={styles.locationAddress}>{location.address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationSearch;
