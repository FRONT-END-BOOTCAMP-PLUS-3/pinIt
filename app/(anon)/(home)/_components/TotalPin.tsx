'use client';

import { useEffect, useState } from 'react';
import PinCard from '@/components/Card/PinCard/PinCard';
import { showPinList } from '../_api/showPinList'; // API 호출 함수
import styles from '../home.module.scss';
import { ShowPinList } from '@/application/usecases/pin/dto/ShowPinListDto';

const TotalPin = () => {
  const [imageData, setImageData] = useState<ShowPinList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showPinList();
        setImageData(data);
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
          {imageData.map((img, idx) => {
            return (
              <PinCard
                key={idx}
                alt={img.placeName} // alt로 placeName 사용
                url={img.image}
                location={img.placeName}
                address={img.address}
                liked={img.isLiked}
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
