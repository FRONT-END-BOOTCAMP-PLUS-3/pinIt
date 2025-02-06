'use client';

import { useState } from 'react';
import AddressSection from './_components/AddressSection';
import MapSection from './_components/MapSection';
import styles from './addLocation.module.scss';

// Location 타입 정의
interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface AddLocationPageProps {
  onLocationSelect: (location: Location) => void;
}

const AddLocationPage: React.FC<AddLocationPageProps> = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const handleSelectLocation = (location: Location) => {
    const locationData: Location = location;
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
