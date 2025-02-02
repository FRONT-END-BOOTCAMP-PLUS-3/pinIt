'use client';

import styles from '../addLocation.module.scss';

interface AddressSectionProps {
  placeName: string;
  address: string;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  placeName,
  address,
}) => {
  return (
    <div className={styles.addressSectionContainer}>
      <div className={styles.addressDetails}>{placeName}</div>
      <div className={styles.addressSubDetails}>{address}</div>
      <button className={styles.registerButton}>이 위치로 주소 등록하기</button>
    </div>
  );
};

export default AddressSection;
