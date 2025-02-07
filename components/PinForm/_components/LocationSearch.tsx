'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from '../pinForm.module.scss';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import Icon from '@/components/Icon/Icon';
import AddLocation from './AddLocation/AddLocation';

interface LocationSearchProps {
  onClose: () => void;
  onSelectLocation: (location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
}

interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onClose,
  onSelectLocation,
}) => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [showAddLocationPopUp, setShowAddLocationPopUp] = useState(false);

  // 외부 클릭 감지 이벤트 등록
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // 장소 선택 시 부모 컴포넌트로 전달
  const handleSelectLocation = (location: Location) => {
    onSelectLocation({
      name: location.name,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    onClose();
  };

  // AddLocation 팝업에서 선택된 위치를 부모로 전달
  const handleSelectLocationFromPopup = (location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }) => {
    onSelectLocation(location);
    setShowAddLocationPopUp(false); // 팝업 닫기
    onClose(); // 전체 LocationSearch 닫기
  };

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

        const newLocations = data.documents.map(
          (place: {
            id: string;
            place_name: string;
            road_address_name?: string;
            x: string;
            y: string;
          }) => ({
            id: place.id,
            name: place.place_name,
            address: place.road_address_name || '주소 정보 없음',
            latitude: parseFloat(place.y),
            longitude: parseFloat(place.x),
          }),
        );

        allLocations = [...allLocations, ...newLocations];
        isEnd = data.meta.is_end;
        page++;
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
    }, 300);

    return () => clearTimeout(debounce);
  }, [keyword]);

  return (
    <div className={styles.locationSearchContainer}>
      <div ref={searchBoxRef} className={styles.searchBox}>
        {/* 검색 입력창 */}
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* 현재 위치 버튼 */}
        <div className={styles.currentLocation}>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={styles.link}
            onClick={() => setShowAddLocationPopUp(true)} // 팝업 열기
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
          </button>
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
        {/* AddLocation 팝업 */}
        {showAddLocationPopUp && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <AddLocation
                onLocationSearchPopupClose={() =>
                  setShowAddLocationPopUp(false)
                }
                onLocationSelect={handleSelectLocationFromPopup} // 팝업 닫을 때 부모로 전달
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
