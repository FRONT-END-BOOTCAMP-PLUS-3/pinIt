'use client';

import React from 'react';
import styles from './pinDetail.module.scss';
import ProfileSection from './_components/ProfileSection';
import PinImageSection from './_components/PinImageSection';
import TitleSection from './_components/TitleSection';
import AddressSection from './_components/AddressSection';
import MapSection from './_components/MapSection';

const PinDetailPage: React.FC = () => {
  return (
    <div className={styles.pinDetailContainer}>
      <PinImageSection />
      <ProfileSection />
      <TitleSection />
      <AddressSection />
      <MapSection />
    </div>
  );
};

export default PinDetailPage;
