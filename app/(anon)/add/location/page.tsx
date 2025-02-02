'use client';

import { useState } from 'react';
import AddressSection from './_components/AddressSection';
import MapSection from './_components/MapSection';
import styles from './addLocation.module.scss';

const AddLocationPage: React.FC = () => {
  const [placeName, setPlaceName] = useState('로딩중..');
  const [address, setAddress] = useState('주소 불러오는 중');

  const handleAddressChange = (newPlaceName: string, newAddress: string) => {
    setPlaceName(newPlaceName);
    setAddress(newAddress);
  };

  return (
    <div className={styles.addLocationContainer}>
      <MapSection onAddressChange={handleAddressChange} />
      <AddressSection placeName={placeName} address={address} />
    </div>
  );
};

export default AddLocationPage;
