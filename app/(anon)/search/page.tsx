'use client';

import { useState } from 'react';
import SearchSection from './_components/SearchSection';
import TabButtonSection from './_components/TabButtonSection';
import TabSection from './_components/TabSection';

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'location' | 'user'>('location'); // 기본 탭 설정
  return (
    <div>
      <SearchSection />
      <TabButtonSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabSection activeTab={activeTab} />
    </div>
  );
};

export default SearchPage;
