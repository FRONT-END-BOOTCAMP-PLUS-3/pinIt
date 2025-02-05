'use client';
import LocationTab from './LocationTab';
import UserTab from './UserTab';
import styles from '../searchPage.module.scss';

const TabSection: React.FC<{ activeTab: 'location' | 'user' }> = ({
  activeTab,
}) => {
  return (
    <div className={styles.tabSection}>
      {activeTab === 'location' && <LocationTab />}
      {activeTab === 'user' && <UserTab />}
    </div>
  );
};

export default TabSection;
