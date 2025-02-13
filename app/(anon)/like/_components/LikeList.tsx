'use client';

import PinCard from '@/components/Card/PinCard/PinCard';
import styles from '../like.module.scss';
import { createLike } from '../_api/createLike';
import { deleteLike } from '../_api/deleteLike';
import { LikeListDto } from '@/application/usecases/like/dto/LikeListDto';

interface LikeListProps {
  pinData: LikeListDto[];
  setPinData: React.Dispatch<React.SetStateAction<LikeListDto[]>>;
}

const LikeList: React.FC<LikeListProps> = ({ pinData, setPinData }) => {
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
              id={pin.id ?? ''}
              alt={pin.placeName ?? ''} // alt로 placeName 사용
              url={pin.image}
              location={pin.placeName ?? ''}
              address={pin.address ?? ''}
              liked={pin.isLiked ?? false}
              onClickLikeButton={(e) =>
                handleLikeToggle(e, pin.id ?? '', pin.isLiked ?? false)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default LikeList;
