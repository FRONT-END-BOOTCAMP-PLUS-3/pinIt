'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';
import ListComponent from './ListComponent';
import { PinListContainerProps } from './PinListContainerProps';

const PinListContainer = ({
  searchKeyword,
  sortOption, // placeName을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    if (trashClicked) {
      console.log('삭제할 항목:', checkedItems);
      // 여기서 삭제 api 호출하기
    }
  }, [trashClicked]);

  const mockData = [
    {
      id: '1',
      placeName: '도두봉',
      contents: '제주 도두봉 올라가는 길!',
      address: '제주 도두봉',
    },
    {
      id: '2',
      placeName: '남산타워',
      contents: '남산 타워에서 찍었어요',
      address: '서울시 용산구',
    },
    {
      id: '3',
      placeName: '올림픽공원',
      contents: '서울 올림픽공원 방문',
      address: '서울 송파구',
    },
  ];

  return (
    <ListComponent
      data={mockData}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.pin.detail}
      sortOption={sortOption} // 정렬 방법 전달
      sortKey='placeName' // 정렬 기준이 될 키 전달
    />
  );
};

export default PinListContainer;
