'use client';

import { useEffect, useState } from 'react';
import SearchSection from './_components/SearchSection';
import TabButtonSection from './_components/TabButtonSection';
import TabSection from './_components/TabSection';

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'location' | 'user'>('location');
  const [keyword, setKeyword] = useState<string>('');

  // ✅ sessionStorage에서 이전 검색어 및 활성 탭 복원
  useEffect(() => {
    const savedKeyword = sessionStorage.getItem('searchedKeyword');
    const savedTab = sessionStorage.getItem('activeTab');

    if (savedKeyword) setKeyword(savedKeyword);
    if (savedTab === 'user' || savedTab === 'location') setActiveTab(savedTab);
  }, []);

  // ✅ 활성 탭 변경 시 sessionStorage에 저장
  const handleTabChange = (tab: 'location' | 'user') => {
    setActiveTab(tab);
    sessionStorage.setItem('activeTab', tab);
  };

  return (
    <div>
      <SearchSection setKeyword={setKeyword} />
      <TabButtonSection activeTab={activeTab} setActiveTab={handleTabChange} />
      <TabSection activeTab={activeTab} keyword={keyword} />
    </div>
  );
};

export default SearchPage;
