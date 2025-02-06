'use client';

import { useState } from 'react';
import ROUTES from '@/constants/routes';
import ListComponent from './ListComponent';

const PinListContainer = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const mockData = [
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
    {
      id: '3',
      contents: '서울 올림픽공원 방문',
      location: '올림픽공원',
      address: '서울 송파구',
    },
  ];

  return (
    <ListComponent
      data={mockData}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.pin.detail}
    />
  );
};

export default PinListContainer;
