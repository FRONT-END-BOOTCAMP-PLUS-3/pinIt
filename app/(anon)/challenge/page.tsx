'use client';

import style from '@/app/(anon)/challenge/page.module.scss';
import PinCard from '@/components/Card/PinCard/PinCard';
import ComboBox, { ComboBoxOption } from './_component/ComboBox';
import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { useEffect, useState } from 'react';
import { ShowPinList } from '@/application/usecases/pin/dto/ShowPinListDto';

const Challenge = () => {
  const [challengeTopicList, setChallengeTopicList] = useState<
    ChallengeTopic[]
  >([]);
  const [comboBoxOptions, setComboBoxOptions] = useState<ComboBoxOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ComboBoxOption | null>(
    null,
  );
  const [challengedPinData, setChallengedPinData] = useState<ShowPinList[]>([]);

  // 챌린지 주제 리스트 가져오기
  useEffect(() => {
    async function fetchChallengeTopicList() {
      const response = await fetch('/api/challenge-topic-list');
      if (!response.ok) {
        console.log('이번 주 챌린지 주제가 없습니다.');
        setChallengeTopicList([]);
        return;
      }
      const data = await response.json();
      setChallengeTopicList(data.challengeTopics || []);
    }

    fetchChallengeTopicList();
  }, []);

  // 챌린지 주제 콤보박스의 옵션 변경
  useEffect(() => {
    const formattedData = challengeTopicList.map((challengeTopic) => ({
      id: challengeTopic.id,
      topic: challengeTopic.topic,
      startDate: challengeTopic.startDate,
      endDate: challengeTopic.endDate,
    }));

    setComboBoxOptions(formattedData);
  }, [challengeTopicList]);

  // 선택된 챌린지 주제의 핀 리스트 가져오기
  useEffect(() => {
    async function fetchChallengedPinList() {
      const response = await fetch('/api/show-challenged-pin-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ id: selectedOption?.id }),
      });

      if (!response.ok) {
        console.log('해당 챌린지에 참여 중인 핀이 없습니다.');
        setChallengedPinData([]);
        return;
      }

      const data = await response.json();
      setChallengedPinData(data);
    }

    fetchChallengedPinList();
  }, [selectedOption]);

  return (
    <div className={style.Challenge}>
      <div className={style.title}>
        <ComboBox
          options={comboBoxOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className={style.pinCard_container}>
        {challengedPinData?.map((challengedPin) => (
          <PinCard
            id={challengedPin.id}
            key={challengedPin.id}
            url={challengedPin.image}
            alt={challengedPin.placeName}
            location={challengedPin.placeName}
            address={challengedPin.address}
            liked={challengedPin.isLiked}
            onClickLikeButton={() => {
              console.log('클릭');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Challenge;
