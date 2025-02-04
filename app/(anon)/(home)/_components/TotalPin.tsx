'use client';

import { useEffect, useState } from 'react';
import PinCard from '@/components/Card/PinCard/PinCard';
import { showPinList } from '../_api/showPinList'; // API 호출 함수
import styles from '../home.module.scss';
import { ShowPinList } from '@/application/usecases/pin/dto/ShowPinListDto';

const TotalPin = () => {
  const [pinData, setPinData] = useState<ShowPinList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showPinList();
        setPinData(data);
      } catch (error) {
        console.error('🚨 핀 데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    console.log('h');
  };

  return (
    <>
      <div className={styles.totalPinContainer}>
        <h2 className={styles.title}>전체 핀</h2>
        <div className={styles.card_container}>
          {pinData.map((pin, idx) => {
            return (
              <PinCard
                key={idx}
                id={pin.id}
                alt={pin.placeName} // alt로 placeName 사용
                url={pin.image}
                location={pin.placeName}
                address={pin.address}
                liked={pin.isLiked}
                onClickLikeButton={handleClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TotalPin;
