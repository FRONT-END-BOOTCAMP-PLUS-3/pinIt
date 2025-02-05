'use client';
import LocationTab from './LocationTab';
import UserTab from './UserTab';

const TabSection: React.FC<{ activeTab: 'location' | 'user' }> = ({
  activeTab,
}) => {
  return (
    <div>
      {activeTab === 'location' && <LocationTab />}
      {activeTab === 'user' && <UserTab />}
    </div>
  );
};

export default TabSection;
