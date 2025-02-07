'use client';

import { useEffect, useState } from 'react';
import ListComponent from './ListComponent';
import ROUTES from '@/constants/routes';
import { PinListContainerProps } from './PinListContainerProps';
import Link from 'next/link';
import style from '@/app/admin/page.module.scss';
import Icon from '@/components/Icon/Icon';
import Button from '@/components/Buttons/Button';

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
    <div className={style.topicContainer}>
      <ListComponent
        data={mockData}
        setCheckedItems={setCheckedItems}
        checkedItems={checkedItems}
        routePath={ROUTES.admin.topic.detail}
        sortOption={sortOption}
        sortKey='topic'
      />
      <Link href={ROUTES.admin.topic.create} passHref>
        <Button icon='create' label='새 주제 추가' />
      </Link>
    </div>
  );
};

export default ChallengeTopicContainer;
