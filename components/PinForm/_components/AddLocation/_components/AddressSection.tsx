'use client';

import styles from '../addLocation.module.scss';

interface AddressSectionProps {
  placeName: string;
  address: string;
  onAddLocationPopupClose: () => void; // AddLocation에게 버튼 클릭 알림
}

const AddressSection: React.FC<AddressSectionProps> = ({
  placeName,
  address,
  onAddLocationPopupClose,
}) => {
  return (
    <div className={styles.addressSectionContainer}>
      <div className={styles.addressDetails}>{placeName}</div>
      <div className={styles.addressSubDetails}>{address}</div>
      {/* 버튼 클릭 시 onAddLocationPopupClose 호출 → AddLocation에 알림 */}
      <button
        className={styles.registerButton}
        onClick={onAddLocationPopupClose}
      >
        이 위치로 주소 등록하기
      </button>
    </div>
  );
};

export default AddressSection;
