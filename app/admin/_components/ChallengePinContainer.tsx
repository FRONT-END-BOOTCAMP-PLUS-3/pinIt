'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import ListComponent from './ListComponent';
import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';
import { PinListContainerProps } from './PinListContainerProps';

const options = [
  {
    id: 'winter',
    optionName: '눈 내리는 겨울',
    optionPeriodStart: '2025-01-01',
    optionPeriodEnd: '2025-01-15',
    optionData: [
      {
        id: '1',
        contents: '제주 도두봉 올라가는 길!',
        placeName: '도두봉',
        address: '제주 도두봉',
      },
      {
        id: '2',
        contents: '남산 타워에서 찍었어요',
        placeName: '남산타워',
        address: '서울시 용산구',
      },
    ],
  },
  {
    id: 'spring',
    optionName: '봄의 시작',
    optionPeriodStart: '2025-03-01',
    optionPeriodEnd: '2025-03-15',
    optionData: [
      {
        id: '3',
        contents: '한강 공원에서 산책',
        placeName: '한강 공원',
        address: '서울시 강남구',
      },
      {
        id: '4',
        contents: '서울 성곽길 트레킹',
        placeName: '서울 성곽길',
        address: '서울 종로구',
      },
    ],
  },
];

const ChallengePinContainer = ({
  searchKeyword,
  sortOption, // nickname을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const STORAGE_KEY = 'challengePinOptionIndex';
  const [selectedOption, setSelectedOption] = useState<string>(options[0].id); // 선택된 주제
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  ///////////주제 선택 콤보박스 관련 내용//////////////
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSelectedOption = sessionStorage.getItem(STORAGE_KEY);
      if (
        savedSelectedOption &&
        options.some((opt) => opt.id === savedSelectedOption)
      ) {
        setSelectedOption(savedSelectedOption);
      }
    }
  }, []);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    sessionStorage.setItem(STORAGE_KEY, optionId);
  };
  //////////////////////////////////////////

  useEffect(() => {
    if (trashClicked) {
      console.log('삭제할 항목:', checkedItems);
      // 여기서 삭제 api 호출하기
    }
  }, [trashClicked]);

  return (
    <>
      <div className={`${style.navigation} ${style.sub}`}>
        <ComboBox
          options={options}
          onSelect={handleOptionSelect}
          sessionStorageKey={STORAGE_KEY}
        />
      </div>
      <ListComponent
        data={
          options.find((opt) => opt.id === selectedOption)?.optionData || []
        }
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
