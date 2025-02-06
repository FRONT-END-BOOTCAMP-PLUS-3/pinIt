'use client';

import { useState } from 'react';
import ListComponent from './ListComponent';
import ROUTES from '@/constants/routes';

interface ChallengeTopicData {
  id: string;
  subject: string;
}

const ChallengeTopicContainer = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const mockData: ChallengeTopicData[] = [
    { id: '1', subject: '눈 내리는 겨울' },
    { id: '2', subject: '울긋불긋 가을 단풍' },
    { id: '3', subject: '아름다운 야경' },
  ];

  return (
    <ListComponent
      data={mockData}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.admin.topic.detail}
    />
  );
};

export default ChallengeTopicContainer;
