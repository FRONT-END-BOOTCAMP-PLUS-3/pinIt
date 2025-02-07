'use client';

import styles from './home.module.scss';
import ThisWeekChallenge from './_components/ThisWeekChallenge';
import TotalPin from './_components/TotalPin';
import { useEffect } from 'react';

const Home = () => {
  // 검색페이지에서 sessionStorage에 저장했었던 내용들을 전부 삭제
  useEffect(() => {
    sessionStorage.removeItem('searchedKeyword');
    sessionStorage.removeItem('searchedUsers');
    sessionStorage.removeItem('searchedPins');
    sessionStorage.removeItem('activeTab');
  }, []);
  return (
    <div className={styles.homeContainer}>
      <ThisWeekChallenge />
      <TotalPin />
    </div>
  );
};

export default Home;
