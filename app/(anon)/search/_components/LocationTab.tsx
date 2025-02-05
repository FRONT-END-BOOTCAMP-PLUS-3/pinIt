'use client';

import { useEffect, useState } from 'react';
import styles from '../searchPage.module.scss';
import PinCard from '@/components/Card/PinCard/PinCard';
import { searchPinByLocation } from '../_api/searchPinByLocation'; // API 함수 가져오기

const LocationTab: React.FC<{ keyword: string }> = ({ keyword }) => {
  const [pins, setPins] = useState<
    {
      id: string;
      url: string;
      location: string;
      address: string;
      clicked: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ sessionStorage에서 기존 검색 결과 로드
    const savedPins = sessionStorage.getItem('searchedPins');
    if (savedPins) {
      setPins(JSON.parse(savedPins));
      setLoading(false);
    }

    const fetchPins = async () => {
      setLoading(true);
      const fetchedPins = await searchPinByLocation(keyword);
      setPins(fetchedPins);

      // ✅ 검색 결과를 sessionStorage에 저장
      sessionStorage.setItem('searchedPins', JSON.stringify(fetchedPins));
      sessionStorage.setItem('searchedKeyword', keyword);
      setLoading(false);
    };

    if (keyword.trim()) {
      fetchPins();
    }
  }, [keyword]); // 키워드 변경 시 API 호출

  return (
    <div className={styles.locationTabContainer}>
      {loading ? (
        <p>검색어를 입력하세요.</p>
      ) : (
        <div className={styles.pinCard_container}>
          {pins.length > 0 ? (
            pins.map((item) => (
              <PinCard
                key={item.id}
                id={item.id}
                url={item.url}
                alt={item.location}
                location={item.location}
                address={item.address}
                liked={item.clicked}
                onClickLikeButton={() => console.log('클릭')}
              />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationTab;
