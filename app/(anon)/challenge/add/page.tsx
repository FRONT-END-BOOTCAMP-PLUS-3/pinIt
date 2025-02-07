'use client';

import style from '@/app/(anon)/challenge/add/page.module.scss';
import Button from '@/components/Buttons/Button';
import MyPinsContainer from '../_component/MyPinsContainer';
import ChallengeAddPageTitle from '../_component/ChallengeAddPageTitle';
import { useState } from 'react';
import { MyPinDto } from '@/application/usecases/challenge/dto/MyPinDto';
import { ChallengeTopicDto } from '@/application/usecases/challenge/dto/ChallengeTopicDto';
import { useRouter } from 'next/navigation';

const ChallengeAdd = () => {
  const router = useRouter();

  const [challengeTopic, setchallengeTopic] =
    useState<ChallengeTopicDto | null>(null);
  const [myPins, setMyPins] = useState<MyPinDto[]>([]);
  const [selectedPins, setSelectedPins] = useState<MyPinDto[]>([]);

  const handleAddPinToChallengeButton = async () => {
    if (!challengeTopic || selectedPins.length === 0) {
      alert('최소 하나의 핀을 선택해주세요.');
      return;
    }

    const requestData = selectedPins.map((pin) => ({
      challengeTopicId: challengeTopic.id,
      pinId: pin.id,
    }));

    try {
      const response = await fetch('/api/create-pin-joined-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('챌린지 등록 성공!');
        router.push('/challenge');
      } else {
        alert('이미 챌린지에 등록한 핀이 포함되어 있어요!');
      }
    } catch (error) {
      console.error('챌린지 등록 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className={style.challengeAdd}>
      <ChallengeAddPageTitle
        challengeTopic={challengeTopic}
        setchallengeTopic={setchallengeTopic}
      />
      <h2 className={style.title}>챌린지에 등록할 핀을 선택해주세요</h2>
      <MyPinsContainer
        myPins={myPins}
        setMyPins={setMyPins}
        selectedPins={selectedPins}
        setSelectedPins={setSelectedPins}
      />
      <Button label='등록하기' onClickButton={handleAddPinToChallengeButton} />
    </div>
  );
};

export default ChallengeAdd;
