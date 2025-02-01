'use client';

import PinCard from '@/components/Card/PinCard/PinCard';
import styles from '../home.module.scss';

const TotalPin = () => {
  const imageData = [
    {
      id: 1,
      title: 'Image 1',
      imageUrl: '/headerLogo.png',
    },
    { id: 2, title: 'Image 2', imageUrl: '/headerLogo.png' },
    { id: 3, title: 'Image 3', imageUrl: '/headerLogo.png' },
    { id: 4, title: 'Image 4', imageUrl: '/headerLogo.png' },
    { id: 5, title: 'Image 5', imageUrl: '/headerLogo.png' },
  ];

  const handleClick = () => {
    console.log('h');
  };

  return (
    <>
      <div className={styles.totalPinContainer}>
        <h2 className={styles.title}>전체 핀</h2>
        <div className={styles.card_container}>
          {imageData.map((img) => {
            return (
              <PinCard
                key={img.id}
                alt={img.title}
                url={img.imageUrl}
                location={'남산타워'}
                address={'서울 용산구'}
                liked={false}
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
