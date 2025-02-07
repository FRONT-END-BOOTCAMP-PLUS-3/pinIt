'use client';

import styles from '../pinDetail.module.scss';
import Icon from '@/components/Icon/Icon';

interface AddressProps {
  address: string;
}

const AddressSection: React.FC<AddressProps> = ({ address }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert('📋 주소가 복사되었습니다!'); // ✅ 복사 완료 시 알림 표시
    } catch (err) {
      console.error('주소 복사 실패:', err);
      alert('⚠️ 주소 복사에 실패했습니다.');
    }
  };

  return (
    <div className={styles.addressSection}>
      <p>{address}</p>
      <button className={styles.copyButton} onClick={handleCopy}>
        <Icon id={'save'} color='#ccc' width={18} height={20} />
      </button>
    </div>
  );
};

export default AddressSection;
