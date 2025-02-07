'use client';

import { useEffect, useState } from 'react';
import styles from '../searchPage.module.scss';
import PinCard from '@/components/Card/PinCard/PinCard';
import { searchPinByLocation } from '../_api/searchPinByLocation';
import Icon from '@/components/Icon/Icon';

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
    const savedPins = sessionStorage.getItem('searchedPins');
    if (savedPins) {
      setPins(JSON.parse(savedPins));
      setLoading(false);
    }

    const fetchPins = async () => {
      setLoading(true);
      const fetchedPins = await searchPinByLocation(keyword);
      setPins(fetchedPins);
      sessionStorage.setItem('searchedPins', JSON.stringify(fetchedPins));
      sessionStorage.setItem('searchedKeyword', keyword);
      setLoading(false);
    };

    if (keyword.trim()) {
      fetchPins();
    }
  }, [keyword]);

  return (
    <div className={styles.locationTabContainer}>
      {loading ? (
        <p className={styles.searchMessage}>검색어를 입력하세요.</p>
      ) : pins.length > 0 ? (
        <div className={styles.pinCard_container}>
          {pins.map((item) => (
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
          ))}
        </div>
      ) : (
        <p className={styles.searchMessage}>
          <Icon id='banned' width={20} height={20} color='#777' /> 검색된 장소가
          없습니다.
        </p>
      )}
    </div>
  );
};

export default LocationTab;
