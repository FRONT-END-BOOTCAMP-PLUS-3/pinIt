'use client';

import styles from '../addLocation.module.scss';

const AddressSection: React.FC = () => {
  return (
    <div className={styles.addressSectionContainer}>
      <div className={styles.addressDetails}>도두봉</div>
      <div className={styles.addressSubDetails}>
        제주특별자치도 제주시 도두항길 4-17
      </div>
      <button className={styles.registerButton}>이 위치로 주소 등록하기</button>
    </div>
  );
};

export default AddressSection;
