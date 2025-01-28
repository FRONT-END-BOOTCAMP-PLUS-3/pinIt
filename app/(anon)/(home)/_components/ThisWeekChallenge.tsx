'use client';

import RoundIconButton from '@/components/Buttons/RoundIconButton';
import styles from '../home.module.scss';
import ImageCard from '@/components/Card/ImageCard/ImageCard';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

const ThisWeekChallenge = () => {
  const pinIdData = 'pin-id';
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
        <div className={styles.challengeTitle}>
          <h2 className={styles.title}>이번주 포토챌린지</h2>
          <Link href={ROUTES.challenge.list} className={styles.link}>
            더보기
          </Link>
        </div>
        <div className={styles.challengeContainer}>
          <div className={styles.imageCardContainer}>
            {imageData.map((img) => {
              return (
                <ImageCard
                  key={img.id}
                  alt={img.title}
                  url={img.imageUrl}
                  pinId={pinIdData}
                />
              );
            })}
            <RoundIconButton iconId={'right'} onClickIconButton={handleClick} />
          </div>
          <Link href={ROUTES.challenge.add} className={styles.challengeAddBtn}>
            + 챌린지 참여하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default ThisWeekChallenge;
