import styles from '../pinDetail.module.scss';
import Icon from '@/components/Icon/Icon';

const AddressSection: React.FC = () => {
  return (
    <div className={styles.addressSection}>
      <p>서울특별시 용산구 남산공원길 105</p>
      <button className={styles.copyButton}>
        <Icon id={'save'} color={'#ccc'} width={18} height={20} />
      </button>
    </div>
  );
};

export default AddressSection;
