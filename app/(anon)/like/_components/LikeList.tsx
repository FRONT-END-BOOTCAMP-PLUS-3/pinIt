'use client';

import PinCard from '@/components/Card/PinCard/PinCard';
import styles from '../like.module.scss';
import { useState } from 'react';

const LikeList = () => {
  const imageData = [
    {
      placeName: '남산타워',
      image: '/default_image.png',
      address: '서울특별시 용산구 남산공원길 105',
      isLiked: true,
    },
    {
      placeName: '경복궁',
      image: '/default_image.png',
      address: '서울특별시 종로구 사직로 161',
      isLiked: false,
    },
    {
      placeName: '해운대 해수욕장',
      image: '/default_image.png',
      address: '부산광역시 해운대구 우동',
      isLiked: true,
    },
    {
      placeName: '제주 성산일출봉',
      image: '/default_image.png',
      address: '제주특별자치도 서귀포시 성산읍 성산리',
      isLiked: false,
    },
  ];

  const handleClick = () => {
    console.log('h');
  };
  return (
    <div className={styles.likeListContainer}>
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
  );
};

export default LikeList;
