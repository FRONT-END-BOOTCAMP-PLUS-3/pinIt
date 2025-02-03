'use client';

import styles from './home.module.scss';
import ThisWeekChallenge from './_components/ThisWeekChallenge';
import TotalPin from './_components/TotalPin';
import { useEffect, useState } from 'react';
import { thisWeekChallengedPinListUsecase } from '@/application/usecases/challenge/ThisWeekChallengedPinListUsecase';
import { browserClient } from '@/utils/supabase/client';
import { createClient } from '@supabase/supabase-js';

const Home = () => {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    async function fetchThisWeekChallengeTopic() {
      const response = await fetch('/api/challengeTopics/thisWeek');
      if (!response.ok) {
        console.log('이번 주 챌린지 주제가 없습니다.');
        return null;
      }
      const data = await response.json();
      setTopics(data);
      console.log('이번 주 챌린지 주제:', data);
      return data;
    }

    fetchThisWeekChallengeTopic();
  }, []);

  console.log(topics);

  return (
    <div className={styles.homeContainer}>
      <ThisWeekChallenge />
      <TotalPin />
    </div>
  );
};

export default Home;
