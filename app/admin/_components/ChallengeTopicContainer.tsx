'use client';

import { useEffect, useState } from 'react';
import ListComponent from './ListComponent';
import ROUTES from '@/constants/routes';
import { PinListContainerProps } from './PinListContainerProps';

// 이건 데이터 내용대로 바꾸세요
interface ChallengeTopicData {
  id: string;
  topic: string;
}

const ChallengeTopicContainer = ({
  searchKeyword,
  sortOption, // nickname을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    if (trashClicked) {
      console.log('삭제할 항목:', checkedItems);
      // 여기서 삭제 api 호출하기
    }
  }, [trashClicked]);

  const mockData: ChallengeTopicData[] = [
    { id: '1', topic: '눈 내리는 겨울' },
    { id: '2', topic: '울긋불긋 가을 단풍' },
    { id: '3', topic: '아름다운 야경' },
  ];

  return (
    <ListComponent
      data={mockData}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.admin.topic.detail}
      sortOption={sortOption} // 정렬 방법 전달
      sortKey='topic' // 정렬 기준이 될 키 전달
    />
  );
};

export default ChallengeTopicContainer;
