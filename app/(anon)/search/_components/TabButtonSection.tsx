'use client';

import styles from '../searchPage.module.scss';

const TabButtonSection: React.FC<{
  activeTab: 'location' | 'user';
  setActiveTab: React.Dispatch<React.SetStateAction<'location' | 'user'>>;
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
          장소
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'user' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('user')}
        >
          사용자
        </button>
      </div>
    </div>
  );
};

export default TabButtonSection;
