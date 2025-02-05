'use client';

import { useState } from 'react';
import AddressSection from './_components/AddressSection';
import MapSection from './_components/MapSection';
import styles from './addLocation.module.scss';

interface AddLocationPageProps {
  onLocationSelect: (location: { name: string; address: string }) => void;
}

const AddLocationPage: React.FC<AddLocationPageProps> = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    address: string;
  } | null>(null);

  const handleSelectLocation = (placeName: string, address: string) => {
    const locationData = { name: placeName, address };
    setSelectedLocation(locationData);
  };

  return (
    <div className={styles.addLocationContainer}>
      <MapSection onAddressChange={handleSelectLocation} />
      <AddressSection
        placeName={selectedLocation?.name || '로딩중'}
        address={selectedLocation?.address || '주소 검색 중...'}
      />
    </div>
  );
};

export default AddLocationPage;
