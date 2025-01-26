'use client';

import styles from '../searchPage.module.scss';

const TabButtonSection: React.FC<{
  activeTab: 'location' | 'user' | 'topic';
  setActiveTab: React.Dispatch<
    React.SetStateAction<'location' | 'user' | 'topic'>
  >;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabButtonSectionContainer}>
      {/* Tab Buttons */}
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'location' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('location')}
        >
          장소명
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'user' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('user')}
        >
          사용자
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'topic' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('topic')}
        >
          주제
        </button>
      </div>
    </div>
  );
};

export default TabButtonSection;
