'use client';

import { useRouter } from 'next/navigation';
import RoundIconButton from '@/components/Buttons/RoundIconButton';
import styles from '../home.module.scss';
import ImageCard from '@/components/Card/ImageCard/ImageCard';
import ROUTES from '@/constants/routes';
import { useEffect, useState } from 'react';
import { ThisWeekChallengedPinListDto } from '@/application/usecases/challenge/dto/ThisWeekChallengedPinListDto';

const ThisWeekChallenge = () => {
  const router = useRouter();
  const [thisWeekChallengedPinList, setThisWeekChallengedPinList] =
    useState<ThisWeekChallengedPinListDto | null>(null);

  useEffect(() => {
    async function fetchThisWeekChallengedPinList() {
      try {
        const response = await fetch(
          '/api/fetch-this-week-challenged-pin-list',
        );
        if (!response.ok) throw new Error('이번 주 챌린지 주제가 없습니다.');

        const data = await response.json();
        setThisWeekChallengedPinList(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchThisWeekChallengedPinList();
  }, []);

  const handleClicked = () => {
    router.push(ROUTES.challenge.list); // 페이지 이동
  };

  return (
    <div className={styles.thisWeekChallengeContainer}>
      <div className={styles.challengeTitle}>
        <h2 className={styles.title}>이번주 포토챌린지</h2>
        <button onClick={handleClicked} className={styles.link}>
          더보기
        </button>
      </div>

      <div className={styles.challengeContainer}>
        <div className={styles.imageCardContainer}>
          {thisWeekChallengedPinList?.pins?.length ? (
            <>
              {thisWeekChallengedPinList.pins.map((pin) => (
                <ImageCard
                  key={pin.id}
                  alt={pin.placeName}
                  url={pin.image}
                  pinId={pin.id!}
                />
              ))}
              <button onClick={handleClicked} className={styles.link}>
                <RoundIconButton
                  iconId='right'
                  onClickIconButton={handleClicked}
                />
              </button>
            </>
          ) : (
            <p>진행 중인 챌린지가 없어요.</p>
          )}
        </div>

        <button
          onClick={() => router.push(ROUTES.challenge.add)}
          className={styles.challengeAddBtn}
        >
          + 챌린지 참여하기
        </button>
      </div>
    </div>
  );
};

export default ThisWeekChallenge;
