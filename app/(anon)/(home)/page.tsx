'use client';

import styles from './home.module.scss';
import ThisWeekChallenge from './_components/ThisWeekChallenge';
import TotalPin from './_components/TotalPin';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <ThisWeekChallenge />
      <TotalPin />
    </div>
  );
};

export default Home;
