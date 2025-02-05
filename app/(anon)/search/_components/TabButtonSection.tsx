'use client';

import styles from '../searchPage.module.scss';

const TabButtonSection: React.FC<{
  activeTab: 'location' | 'user';
  setActiveTab: (tab: 'location' | 'user') => void;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabButtonSectionContainer}>
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${activeTab === 'location' ? styles.active : ''}`}
          onClick={() => setActiveTab('location')} // ✅ 변경 시 sessionStorage 반영됨
        >
          장소
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'user' ? styles.active : ''}`}
          onClick={() => setActiveTab('user')} // ✅ 변경 시 sessionStorage 반영됨
        >
          사용자
        </button>
      </div>
    </div>
  );
};

export default TabButtonSection;
