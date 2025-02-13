'use client';

import style from '@/app/(anon)/challenge/page.module.scss';
import ComboBox, { ComboBoxOption } from './_component/ComboBox';
import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { useEffect, useState } from 'react';
import ListFilterButton from './_component/ListFilterButton';
import PinJoinedChallengeContainer from './_component/PinJoinedChallengeContainer';
import { ShowPinList } from '@/application/usecases/pin/dto/ShowPinListDto';
import ChallengeButton from './_component/ChallengeButton';

const Challenge = () => {
  const [challengeTopicList, setChallengeTopicList] = useState<
    ChallengeTopic[]
  >([]);
  const [comboBoxOptions, setComboBoxOptions] = useState<ComboBoxOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ComboBoxOption | null>(
    null,
  );
  const [isFilteringMyPins, setIsFilteringMyPins] = useState(false);
  const [selectedPins, setSelectedPins] = useState<ShowPinList[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // 챌린지 주제 리스트 가져오기
  useEffect(() => {
    async function fetchChallengeTopicList() {
      const response = await fetch('/api/challenge-topic-list');
      if (!response.ok) {
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

  // 필터링 중인지 확인하는 이벤트
  const handleFilterButtonClick = () => {
    setIsFilteringMyPins((prev) => {
      const newFilteringState = !prev;

      if (!newFilteringState) {
        setSelectedPins([]); // 필터링 해제될 때 selectedPins 초기화
      }

      return !prev;
    });
  };

  const handleRemoveButtonClick = async () => {
    if (!selectedPins.length) {
      alert('삭제할 핀을 선택하세요.');
      return;
    }

    const pinIds = selectedPins.map((pin) => pin.id);

    const response = await fetch('/api/delete-pin-joined-challenge', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pinIds),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || '삭제 요청 실패');
    }

    setSelectedPins([]);
    alert('핀을 챌린지에서 제거했습니다.');

    // // 리렌더링 유발
    setRefreshKey((prev) => prev + 1);

    setIsFilteringMyPins(false);
    setTimeout(() => setIsFilteringMyPins(true), 0);
  };

  return (
    <div className={style.Challenge}>
      <ComboBox
        options={comboBoxOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <ListFilterButton
        selectedOption={selectedOption}
        isFilteringMyPins={isFilteringMyPins}
        onClickFilter={handleFilterButtonClick}
      />
      <PinJoinedChallengeContainer
        key={refreshKey}
        selectedOption={selectedOption}
        isFiltering={isFilteringMyPins}
        setSelectedPins={setSelectedPins}
      />
      <ChallengeButton
        isFilteringMyPins={isFilteringMyPins}
        onChallengeButtonClick={handleRemoveButtonClick}
      />
    </div>
  );
};

export default Challenge;
