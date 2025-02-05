'use client';

import { useState } from 'react';
import SearchSection from './_components/SearchSection';
import TabButtonSection from './_components/TabButtonSection';
import TabSection from './_components/TabSection';

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'location' | 'user'>('location'); // 기본 탭 설정
  const [keyword, setKeyword] = useState<string>('');

  return (
    <div>
      <SearchSection setKeyword={setKeyword} />
      <TabButtonSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabSection activeTab={activeTab} keyword={keyword} />
    </div>
  );
};

export default SearchPage;
