'use client';

import RoundIconButton from '@/components/Buttons/RoundIconButton';
import styles from '../home.module.scss';
import ImageCard from '@/components/Card/ImageCard/ImageCard';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import { useEffect, useState } from 'react';
import { ThisWeekChallengedPinListDto } from '@/application/usecases/challenge/dto/ThisWeekChallengedPinListDto';

const ThisWeekChallenge = () => {
  const [thisWeekChallengedPinList, setThisWeekChallengedPinList] =
    useState<ThisWeekChallengedPinListDto | null>(null);

  useEffect(() => {
    async function fetchThisWeekChallengedPinList() {
      const response = await fetch('/api/fetch-this-week-challenged-pin-list');
      if (!response.ok) {
        console.log('이번 주 챌린지 주제가 없습니다.');
        return null;
      }
      const data = await response.json();
      setThisWeekChallengedPinList(data);
    }

    fetchThisWeekChallengedPinList();
  }, []);

  const handleClick = () => {
    console.log('이번주 주제에 참여한 핀 리스트로 가기');
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
            {thisWeekChallengedPinList?.pins.map((pin) => {
              return (
                <ImageCard
                  key={pin.id}
                  alt={pin.placeName}
                  url={pin.image}
                  pinId={pin.id!}
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
