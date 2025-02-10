'use client';

import PinCard from '@/components/Card/PinCard/PinCard';
import styles from '../like.module.scss';
import { useEffect, useState } from 'react';
import { ShowPinList } from '@/application/usecases/pin/dto/ShowPinListDto';
import { showPinList } from '../../(home)/_api/showPinList';

const LikeList = () => {
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

  // ✅ 핀의 좋아요 상태 변경하는 함수
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    setPinData((prevPins) =>
      prevPins.map((pin) =>
        pin.id === id ? { ...pin, isLiked: !pin.isLiked } : pin,
      ),
    );

    // ✅ Supabase에 좋아요 상태 업데이트 (선택 사항)
    // updateLikeStatus(id);
  };

  return (
    <div className={styles.likeListContainer}>
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
              onClickLikeButton={(e) => handleClick(e, pin.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LikeList;
