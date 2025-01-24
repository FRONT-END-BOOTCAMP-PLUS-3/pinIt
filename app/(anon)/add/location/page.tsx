'use client';

import AddressSection from './_components/AddressSection';
import MapSection from './_components/MapSection';
import styles from './addLocation.module.scss';

const AddLocationPage: React.FC = () => {
  return (
    <div className={styles.addLocationContainer}>
      <MapSection />
      <AddressSection />
    </div>
  );
};

export default AddLocationPage;
