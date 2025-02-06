'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import ListComponent from './ListComponent';
import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';

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
        location: '도두봉',
        address: '제주 도두봉',
      },
      {
        id: '2',
        contents: '남산 타워에서 찍었어요',
        location: '남산타워',
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
        location: '한강 공원',
        address: '서울시 강남구',
      },
      {
        id: '4',
        contents: '서울 성곽길 트레킹',
        location: '서울 성곽길',
        address: '서울 종로구',
      },
    ],
  },
];

const ChallengePinContainer = () => {
  const STORAGE_KEY = 'challengePinOptionIndex';
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(options[0].id);

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
      />
    </>
  );
};

export default ChallengePinContainer;
