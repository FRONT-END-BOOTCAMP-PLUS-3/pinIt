'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from '../add.module.scss';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import Icon from '@/components/Icon/Icon';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

interface LocationSearchProps {
  onClose: () => void;
}

const locations = [
  { name: '도두봉', address: '제주특별자치도 제주시 도두일동 산 2' },
  { name: '베드라디오 도두봉', address: '제주특별자치도 제주시 서해안로 204' },
  { name: '도두봉 키세스존', address: '제주특별자치도 제주시 도두일동 산 3-2' },
  { name: '도두봉공원', address: '제주특별자치도 제주시 도두일동 산 2' },
];

const LocationSearch: React.FC<LocationSearchProps> = ({ onClose }) => {
  const searchBoxRef = useRef<HTMLDivElement>(null); // searchBox 참조 생성
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className={styles.locationSearchContainer}>
      <div ref={searchBoxRef} className={styles.searchBox}>
        <SearchInput />
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
        <ul className={styles.locationList}>
          {locations.map((location, index) => (
            <li key={index} className={styles.locationItem}>
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
