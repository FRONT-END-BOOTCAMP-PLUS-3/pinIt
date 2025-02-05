'use client';
import LocationTab from './LocationTab';
import UserTab from './UserTab';

const TabSection: React.FC<{
  activeTab: 'location' | 'user';
  keyword: string;
}> = ({ activeTab, keyword }) => {
  return (
    <div>
      {activeTab === 'location' && <LocationTab keyword={keyword} />}
      {activeTab === 'user' && <UserTab keyword={keyword} />}
    </div>
  );
};

export default TabSection;
