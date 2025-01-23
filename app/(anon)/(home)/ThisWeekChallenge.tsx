'use client';

import RoundIconButton from '@/components/Buttons/RoundIconButton';
import styles from './ThisWeekChallenge.module.scss';
import ImageCard from '@/components/Card/ImageCard/ImageCard';

const ThisWeekChallenge = () => {
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
      <div className={styles.thisWeekChallengeContainer}>
        <h2 className={styles.title}>이번주 포토챌린지</h2>
        <div className={styles.imageCardContainer}>
          {imageData.map((img) => {
            return (
              <ImageCard key={img.id} alt={img.title} url={img.imageUrl} />
            );
          })}
          <RoundIconButton iconId={'right'} onClickIconButton={handleClick} />
        </div>
        <button className={styles.challengeAddBtn}>+ 챌린지 참여하기</button>
      </div>
    </>
  );
};

export default ThisWeekChallenge;
