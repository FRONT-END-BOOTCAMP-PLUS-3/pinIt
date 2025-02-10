'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import ListComponent from './ListComponent';
import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';
import { PinListContainerProps } from './PinListContainerProps';
import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { PinJoinedChallengeDto } from '@/application/usecases/admin/pinJoinedChallenge/dto/PinJoinedChallengeDto';
import { deletePinJoinedChallenge } from '../_api/deletePinJoinedChallenge';

interface ComboBoxOption {
  id: string;
  optionName: string;
}

const ChallengePinContainer = ({
  searchKeyword,
  sortOption, // nickname을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const STORAGE_KEY = 'challengePinOptionIndex';
  const [selectedOption, setSelectedOption] = useState<string>(''); // 선택된 주제
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [comboBoxOptions, setComboBoxOptions] = useState<ComboBoxOption[]>([]);
  const [pinData, setPinData] = useState<PinJoinedChallengeDto[]>([]);
  const [filteredData, setFilteredData] = useState<PinJoinedChallengeDto[]>([]); // 검색된 데이터 저장

  // 핀 리스트 fetch 함수
  async function fetchChallengedPinList() {
    if (!selectedOption) return;

    const response = await fetch('/api/admin-show-challenged-pin-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedOption }),
    });

    if (!response.ok) {
      console.log('해당 챌린지에 참여 중인 핀이 없습니다.');
      setPinData([]);
      return;
    }

    const data = await response.json();
    setPinData(data);
  }

  // 주제 선택 콤보박스 관련 내용
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSelectedOption = sessionStorage.getItem(STORAGE_KEY);
      if (
        savedSelectedOption &&
        comboBoxOptions.some((opt) => opt.id === savedSelectedOption)
      ) {
        setSelectedOption(savedSelectedOption);
      }
      // options가 변경될 때, 확인해서 setSelectedId 실행
      else if (comboBoxOptions.length > 0) {
        setSelectedOption(comboBoxOptions[0].id);
      }
    }
  }, [comboBoxOptions]);

  useEffect(() => {
    if (trashClicked) {
      console.log('삭제할 항목:', checkedItems);
      // 여기서 삭제 api 호출하기
    }
  }, [trashClicked]);

  // 챌린지 토픽 데이터 fetch
  useEffect(() => {
    async function fetchChallengeTopicList() {
      const response = await fetch('/api/challenge-topic-list');
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      const formattedOptions = data.challengeTopics.map(
        (topic: ChallengeTopic) => ({
          id: topic.id,
          optionName: topic.topic,
        }),
      );

      setComboBoxOptions(formattedOptions);
    }

    fetchChallengeTopicList();
  }, []);

  // 챌린지 토픽에 맞는 리스트 데이터 fetch
  useEffect(() => {
    fetchChallengedPinList();
  }, [selectedOption]);

  // 챌린지 토픽 선택 핸들러
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    sessionStorage.setItem(STORAGE_KEY, optionId);
  };

  // searchKeyword로 데이터 필터링
  useEffect(() => {
    if (!searchKeyword || searchKeyword.trim() === '') {
      setFilteredData(pinData);
    } else {
      const lowerSearch = searchKeyword.toLowerCase();
      const filtered = pinData.filter(
        (pin) =>
          pin.placeName.toLowerCase().includes(lowerSearch) ||
          pin.address.toLowerCase().includes(lowerSearch) ||
          pin.description.toLowerCase().includes(lowerSearch),
      );
      setFilteredData(filtered);
    }
  }, [searchKeyword, pinData]);

  // trash 버튼 이벤트 발생 시
  useEffect(() => {
    if (trashClicked && checkedItems.length > 0) {
      deletePinJoinedChallenge(checkedItems).then(() => {
        alert('✅ 해당 챌린지에서 핀을 삭제하였습니다.');
        setCheckedItems([]);

        fetchChallengedPinList();
      });
    }
  }, [trashClicked, checkedItems]);

  return (
    <>
      <div className={`${style.navigation} ${style.sub}`}>
        <ComboBox
          options={comboBoxOptions}
          onSelect={handleOptionSelect}
          sessionStorageKey={STORAGE_KEY}
        />
      </div>
      <ListComponent
        data={filteredData}
        setCheckedItems={setCheckedItems}
        checkedItems={checkedItems}
        routePath={ROUTES.pin.detail}
        sortOption={sortOption} // 정렬 방법 전달
        sortKey='placeName' // 정렬 기준이 될 키 전달
      />
    </>
  );
};

export default ChallengePinContainer;
