'use client';

import PinCard from '@/components/Card/PinCard/PinCard';
import styles from '../like.module.scss';
import { useEffect, useState } from 'react';
import { showLikePinList } from '../_api/showLikePinList';
import { LikeListDto } from '@/application/usecases/like/dto/LikeListDto';
import { createLike } from '../_api/createLike';
import { deleteLike } from '../_api/deleteLike';

const LikeList = () => {
  const [pinData, setPinData] = useState<LikeListDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showLikePinList();

        setPinData(data);
      } catch (error) {
        console.error('🚨 핀 데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  // 핀의 좋아요 상태 변경하는 함수
  const handleLikeToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    isLiked: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Supabase에 좋아요 상태 업데이트
    try {
      if (isLiked) {
        await deleteLike(id);

        setPinData((prevPins) => prevPins.filter((pin) => pin.id !== id));
      } else {
        await createLike({ id: id });
      }
      setPinData((prevPins) =>
        prevPins.map((pin) =>
          pin.id === id ? { ...pin, isLiked: !pin.isLiked } : pin,
        ),
      );
    } catch (error) {
      console.error('🚨 좋아요 상태 변경 실패:', error);
    }
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
              onClickLikeButton={(e) =>
                handleLikeToggle(e, pin.id, pin.isLiked)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default LikeList;
