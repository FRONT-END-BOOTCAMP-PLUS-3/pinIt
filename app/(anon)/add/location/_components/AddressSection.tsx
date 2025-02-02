'use client';

import styles from '../addLocation.module.scss';
import { useRouter } from 'next/navigation';

interface AddressSectionProps {
  placeName: string;
  address: string;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  placeName,
  address,
}) => {
  const router = useRouter();

  const handleRegister = () => {
    // ✅ 선택한 장소 정보를 sessionStorage에 저장
    sessionStorage.setItem(
      'selectedLocation',
      JSON.stringify({ name: placeName, address }),
    );

    // ✅ AddPage로 이동
    router.push('/add');
  };

  return (
    <div className={styles.addressSectionContainer}>
      <div className={styles.addressDetails}>{placeName}</div>
      <div className={styles.addressSubDetails}>{address}</div>
      <button className={styles.registerButton} onClick={handleRegister}>
        이 위치로 주소 등록하기
      </button>
    </div>
  );
};

export default AddressSection;
