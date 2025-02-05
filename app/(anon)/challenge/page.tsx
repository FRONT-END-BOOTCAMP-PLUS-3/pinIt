'use client';

import style from '@/app/(anon)/challenge/page.module.scss';
import PinCard from '@/components/Card/PinCard/PinCard';
import ComboBox, { ComboBoxOption } from './_component/ComboBox';
import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { useEffect, useState } from 'react';

interface PinCardData {
  id: string;
  url: string;
  location: string;
  address: string;
  clicked: boolean;
}

const Challenge = () => {
  const data: PinCardData[] = [
    {
      id: 'dfeqf',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: false,
    },
    {
      id: 'afad0f1',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: true,
    },
  ];

  const [challengeTopicList, setChallengeTopicList] = useState<
    ChallengeTopic[]
  >([]);
  const [comboBoxOptions, setComboBoxOptions] = useState<ComboBoxOption[]>();
  const [selectedOption, setSelectedOption] = useState<ComboBoxOption>();

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

  useEffect(() => {
    const formattedData = challengeTopicList.map((challengeTopic) => ({
      topic: challengeTopic.topic,
      startDate: challengeTopic.startDate,
      endDate: challengeTopic.endDate,
    }));

    setComboBoxOptions(formattedData);
  }, [challengeTopicList]);

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
        {data?.map((item) => (
          <PinCard
            id={item.id}
            key={item.id}
            id={item.id}
            url={item.url}
            alt={item.location}
            location={item.location}
            address={item.address}
            liked={item.clicked}
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
