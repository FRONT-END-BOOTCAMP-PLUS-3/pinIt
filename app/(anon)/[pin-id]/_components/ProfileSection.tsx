import styles from '../pinDetail.module.scss';
import HeartIconButton from '@/components/Buttons/HeartIconButton';

const ProfileSection: React.FC = () => {
  const handleLikeButtonClick = () => {
    console.log('Like button clicked');
    // 여기서 좋아요 상태를 관리하는 로직 추가
  };

  return (
    <div className={styles.profileSection}>
      <div className={styles.profile}>
        <span className={styles.profileImage}></span>
        <span className={styles.profileName}>안녕하세요</span>
      </div>
      <div className={styles.likeInfo}>
        <span className={styles.likeButton}>
          <HeartIconButton
            heartColor={'#292526'}
            liked={false}
            w={20}
            h={20}
            onClickLikeButton={handleLikeButtonClick}
          />
        </span>
        <span>128</span>
      </div>
    </div>
  );
};

export default ProfileSection;
