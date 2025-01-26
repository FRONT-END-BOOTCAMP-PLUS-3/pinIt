'use client';
import LocationTab from './LocationTab';
import UserTab from './UserTab';
import TopicTab from './TopicTab';
import styles from '../searchPage.module.scss';

const TabSection: React.FC<{ activeTab: 'location' | 'user' | 'topic' }> = ({
  activeTab,
}) => {
  return (
    <div className={styles.tabSection}>
      {activeTab === 'location' && <LocationTab />}
      {activeTab === 'user' && <UserTab />}
      {activeTab === 'topic' && <TopicTab />}
    </div>
  );
};

export default TabSection;
